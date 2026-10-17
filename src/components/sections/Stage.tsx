"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface StageMedia {
  kind: "image" | "video";
  src: string;
  /** Poster do vídeo (também usado como fallback estático). */
  poster?: string;
}

/**
 * Mídia do palco fixo por seção. O retrato lidera (Experience); o clipe
 * atmosférico do hero legado vira fundo da seção técnica. Todos os ativos são
 * reais e do próprio projeto.
 */
const STAGE_MEDIA: Record<string, StageMedia> = {
  inicio: { kind: "image", src: "/images/img01.jpeg" },
  sobre: { kind: "image", src: "/images/img01.jpeg" },
  stack: {
    kind: "video",
    src: "/videos/background.mp4",
    poster: "/images/background.webp",
  },
  projetos: { kind: "image", src: "/images/work/talentmetrics.webp" },
  contato: { kind: "image", src: "/images/work/axiomerp.webp" },
};

const ORDERED = ["inicio", "sobre", "stack", "projetos", "contato"];

/**
 * A metade fixa do split-stage: uma fotografia/interface preenchendo a altura
 * da viewport, que faz crossfade lento para a mídia da seção em vista. Com
 * reduced-motion, mantém só a primeira (e o vídeo parado no poster). `aria-hidden`
 * — é atmosfera; o conteúdo vive na coluna de leitura.
 */
export function Stage() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState("inicio");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;

    const sections = ORDERED.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Escolhe a seção mais visível no momento.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -20% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [reduced]);

  // `usePrefersReducedMotion` começa em `true`, então o primeiro render monta o
  // vídeo com autoPlay=false. Quando o efeito corrige para `false`, trocar a
  // propriedade React não reinicia um vídeo já carregado — é preciso chamar
  // `.play()` explicitamente. Com reduced-motion, pausa no poster.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }
    void video.play().catch(() => {
      /* autoplay bloqueado: o poster segura a imagem */
    });
  }, [reduced]);

  const currentKey = reduced ? "inicio" : active;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--ground)]"
    >
      {ORDERED.map((id) => {
        const media = STAGE_MEDIA[id];
        const isActive = id === currentKey;
        return (
          <div
            key={id}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {media.kind === "video" ? (
              /* Vídeo atmosférico: muted/loop/inline. Com reduced-motion ou fora
                 de vista, o poster segura a imagem (sem viajar). O clipe é
                 entregue em 960x540/CRF29 (~89 KB, era 807 KB em 1080p): ele
                 disputa banda com o retrato no primeiro paint e uma decoração
                 não pode ser o que atrasa o LCP. */
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster={media.poster}
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
              >
                <source src={media.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={media.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={id === "inicio"}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
