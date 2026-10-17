import Image from "next/image";

/**
 * Palco do split-stage — a metade fixa (sticky) no desktop.
 *
 * É uma imagem parada de propósito. Antes o palco trocava de mídia conforme a
 * seção entrava em vista (retrato → clipe atmosférico → screenshots dos
 * projetos), o que virava um carrossel involuntário durante o scroll e
 * disputava atenção com o texto. Agora ele fica quieto: um retrato, sempre.
 *
 * Para trocar a mídia do palco, mude só `STAGE_IMAGE` — nada mais depende disto.
 *
 * TODO — mídia melhor para o palco (hoje: retrato):
 *   - Clipe curto, mudo e em loop de um produto real em uso (ex.: a command
 *     palette do Axiom ERP), 720p / CRF ~30, ~1 MB no máximo, com poster. O
 *     antigo `public/videos/background.mp4` (960x540) é o candidato óbvio, mas
 *     é genérico demais para representar o trabalho — vale gravar um clipe seu.
 *   - Recorte de alta resolução de uma interface sua, tratado em preto-e-branco
 *     com o acento da marca, para não competir com a coluna de leitura.
 *   - Um retrato novo, de fundo neutro e luz lateral, ~1600px de largura.
 *   Enquanto não existir essa mídia, o retrato atual cumpre o papel.
 */
const STAGE_IMAGE = "/images/img01.webp";

export function Stage() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--ground)]"
    >
      <Image
        src={STAGE_IMAGE}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
