import consult640Avif from "@/assets/img/consult-640.avif";
import consult640 from "@/assets/img/consult-640.webp";
import consult960Avif from "@/assets/img/consult-960.avif";
import consult960 from "@/assets/img/consult-960.webp";
import consult1280Avif from "@/assets/img/consult-1280.avif";
import consult1280 from "@/assets/img/consult-1280.webp";
import consult1536Avif from "@/assets/img/consult-1536.avif";
import consult1536 from "@/assets/img/consult-1536.webp";
import tall480Avif from "@/assets/img/consult-tall-480.avif";
import tall480 from "@/assets/img/consult-tall-480.webp";
import tall820Avif from "@/assets/img/consult-tall-820.avif";
import tall820 from "@/assets/img/consult-tall-820.webp";
import roomDetail from "@/assets/img/room-detail.webp";

const ALT =
  "A calm, modern consultation room with a general practitioner in conversation with a patient";

/** Tall 4:5 crop for the hero. Eager + high priority: it is above the fold. */
export function HeroImage({ className = "" }: { className?: string }) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${tall480Avif} 480w, ${tall820Avif} 820w`}
        sizes="(min-width: 1024px) 34vw, 90vw"
      />
      <source
        type="image/webp"
        srcSet={`${tall480} 480w, ${tall820} 820w`}
        sizes="(min-width: 1024px) 34vw, 90vw"
      />
      <img
        src={tall820}
        alt={ALT}
        width={820}
        height={1024}
        fetchPriority="high"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/** Wide 3:2 consultation-room image for below-the-fold sections. Lazy loaded. */
export function WideImage({
  className = "",
  alt = ALT,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  className?: string;
  alt?: string;
  sizes?: string;
}) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${consult640Avif} 640w, ${consult960Avif} 960w, ${consult1280Avif} 1280w, ${consult1536Avif} 1536w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${consult640} 640w, ${consult960} 960w, ${consult1280} 1280w, ${consult1536} 1536w`}
        sizes={sizes}
      />
      <img
        src={consult960}
        alt={alt}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

export function DetailImage({ className = "" }: { className?: string }) {
  return (
    <img
      src={roomDetail}
      alt=""
      aria-hidden="true"
      width={406}
      height={420}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
