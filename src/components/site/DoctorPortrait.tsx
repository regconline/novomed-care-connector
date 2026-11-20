import { CircleUserRound, ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type DoctorPortraitProps = {
  doctor: { slug: string; name: string };
  className?: string;
};

export function DoctorPortrait({ doctor, className = "" }: DoctorPortraitProps) {
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
    return () => { active = false; };
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
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-clinical">
        {imageUrl ? (
          <img src={imageUrl} alt={`${doctor.name} — Doctor's Photograph`} className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-mint/40">
            <CircleUserRound aria-hidden="true" className="size-24 text-primary/60" strokeWidth={1.2} />
          </div>
        )}
        <span className="absolute bottom-3 left-3 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-soft">
          Doctor's Photograph
        </span>
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
          <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileInput.current?.click()}>
            <ImageUp />{uploading ? "Uploading…" : "Upload photograph"}
          </Button>
          {message && <p className="mt-2 text-sm text-muted-foreground" role="status">{message}</p>}
        </div>
      )}
    </div>
  );
}