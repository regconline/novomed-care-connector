import { ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type DoctorPortraitProps = {
  doctor: { slug: string; name: string; shortName?: string };
  className?: string;
  label?: boolean;
};

const initials = (name: string) =>
  name
    .replace(/^Dr\s+/, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(-1)[0]?.[0] ?? "";

export function DoctorPortrait({ doctor, className = "", label = true }: DoctorPortraitProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [canManage, setCanManage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const loadPortrait = async () => {
      const { data } = await supabase.storage
        .from("doctor-portraits")
        .createSignedUrl(`${doctor.slug}.jpg`, 3600);
      if (active && data?.signedUrl) setImageUrl(data.signedUrl);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      const { data: role } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("user_id", userData.user.id)
        .eq("role", "doctor_photo_admin")
        .maybeSingle();
      if (active && role) setCanManage(true);
    };
    void loadPortrait();
    return () => {
      active = false;
    };
  }, [doctor.slug]);

  const uploadPortrait = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setMessage("The photograph must be 8 MB or smaller.");
      return;
    }
    setUploading(true);
    setMessage("");
    const path = `${doctor.slug}.jpg`;
    const { error } = await supabase.storage.from("doctor-portraits").upload(path, file, {
      upsert: true,
      contentType: file.type,
    });
    if (error) {
      setMessage("Photo access is not assigned to this account.");
      setUploading(false);
      return;
    }
    const { data } = await supabase.storage.from("doctor-portraits").createSignedUrl(path, 3600);
    setImageUrl(data?.signedUrl ? `${data.signedUrl}&updated=${Date.now()}` : null);
    setMessage("Photograph updated.");
    setUploading(false);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-clinical">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Portrait of ${doctor.name}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-[linear-gradient(160deg,#eaf3f8_0%,#d9f0e9_100%)]"
            role="img"
            aria-label={`Portrait placeholder for ${doctor.name}. Photograph to follow.`}
          >
            <div aria-hidden="true" className="grain absolute inset-0 opacity-50" />
            <svg
              aria-hidden="true"
              viewBox="0 0 200 250"
              className="absolute inset-x-0 bottom-0 h-[78%] w-full text-brand/[0.09]"
              fill="currentColor"
            >
              <circle cx="100" cy="92" r="44" />
              <path d="M18 250c4-58 40-96 82-96s78 38 82 96z" />
            </svg>
            <span
              aria-hidden="true"
              className="absolute left-5 top-4 font-display text-6xl font-extrabold tracking-tighter text-brand/15"
            >
              {initials(doctor.name)}
            </span>
          </div>
        )}
        {label && !imageUrl && (
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand shadow-soft">
            Photograph to follow
          </span>
        )}
      </div>
      {canManage && (
        <div className="mt-3">
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label={`Upload photograph for ${doctor.name}`}
            onChange={(event) => {
              void uploadPortrait(event.currentTarget.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => fileInput.current?.click()}
          >
            <ImageUp />
            {uploading ? "Uploading…" : "Upload photograph"}
          </Button>
          {message && (
            <p className="mt-2 text-sm text-muted-foreground" role="status">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
