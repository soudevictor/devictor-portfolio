import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stage } from "@/components/sections/Stage";
import { Stack } from "@/components/sections/Stack";

/**
 * Página inicial — composição split-stage.
 *
 * Desktop: a metade esquerda é uma coluna fixa (sticky). O segredo é o item de
 * grid esticar até a altura da coluna de leitura (`self-start` + altura explícita
 * no inner), senão o `sticky` só viaja uma tela e o resto fica vazio. A coluna
 * direita rola com Hero → Sobre → Stack → Contato.
 *
 * Mobile: composição própria — o palco vira uma faixa de 42svh no topo e o
 * conteúdo flui abaixo com fundo sólido, garantindo que a ação caiba na
 * primeira tela sem sobrepor texto à foto.
 */
export default function Home() {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2">
        <div className="lg:sticky lg:top-0 lg:h-[100svh] lg:self-start">
          {/* `relative` é essencial: sem ele, o `absolute inset-0` do Stage
              escapa da caixa e cobre a viewport inteira no mobile, sobrepondo
              o texto à foto. */}
          <div className="relative h-[42svh] lg:h-full">
            <Stage />
          </div>
        </div>

        <div className="bg-[var(--surface)]">
          <div className="mx-auto w-full max-w-[46ch] px-6 lg:max-w-none lg:px-12">
            <Hero />
            <About />
            <Stack />
            <Contact />
          </div>
        </div>
      </div>

      <Projects />
    </>
  );
}
