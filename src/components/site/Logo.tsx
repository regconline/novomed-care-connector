import logoUrl from "@/assets/novomed-logo.png";

/**
 * The NOVOMED logo is bundled from src/assets so it is fingerprinted and served with the
 * build on any host (Vercel, Lovable or elsewhere). Never point it at a Lovable-only asset URL.
 */
export function Logo({
  className = "h-12 w-auto",
  alt = "NOVOMED General Practitioners",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={logoUrl}
      alt={alt}
      className={className}
      width={160}
      height={120}
      decoding="async"
      style={{ objectFit: "contain" }}
    />
  );
}
