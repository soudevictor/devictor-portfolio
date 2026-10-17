import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Contact } from "@/components/sections/Contact";
import { contactSchema } from "@/lib/schemas";

const VALID = {
  name: "Maria Silva",
  email: "maria@exemplo.com",
  message: "Gostaria de conversar sobre um projeto de plataforma B2B.",
};

/** Preenche os três campos com um payload e devolve os nós do DOM separados. */
async function fill(
  user: ReturnType<typeof userEvent.setup>,
  values = VALID,
) {
  const name = screen.getByLabelText("Seu nome");
  const email = screen.getByLabelText("Seu e-mail");
  const message = screen.getByLabelText("Sua mensagem");

  await user.clear(name);
  await user.type(name, values.name);
  await user.clear(email);
  await user.type(email, values.email);
  await user.clear(message);
  await user.type(message, values.message);

  return { name, email, message };
}

describe("contactSchema", () => {
  it("aceita um payload válido", () => {
    expect(contactSchema.safeParse(VALID).success).toBe(true);
  });

  it("rejeita e-mail malformado e mensagem curta", () => {
    const short = contactSchema.safeParse({
      ...VALID,
      email: "nao-e-email",
      message: "curta",
    });
    expect(short.success).toBe(false);
  });
});

describe("Contact", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ success: true }),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renderiza os três campos com rótulos associados", () => {
    render(<Contact />);

    expect(screen.getByLabelText("Seu nome")).toHaveAttribute("id", "name");
    expect(screen.getByLabelText("Seu e-mail")).toHaveAttribute("id", "email");
    expect(screen.getByLabelText("Sua mensagem")).toHaveAttribute(
      "id",
      "message",
    );
    expect(
      screen.getByRole("button", { name: "Enviar mensagem" }),
    ).toBeInTheDocument();
  });

  it("marca os campos inválidos e explica o problema", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const { name } = await fill(user, {
      name: "M",
      email: "errado",
      message: "curta",
    });

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/mínimo 2 caracteres/i);
    expect(
      screen.getByLabelText("Seu e-mail"),
    ).toHaveAccessibleDescription(/e-mail válido/i);
    expect(
      screen.getByLabelText("Sua mensagem"),
    ).toHaveAccessibleDescription(/pelo menos 10 caracteres/i);

    // Não deve ter chamado a rede com payload inválido.
    expect(fetch).not.toHaveBeenCalled();
  });

  it("envia payload válido e mostra o estado de sucesso", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await fill(user);

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/Mensagem enviada/i),
    );

    const [, init] = vi.mocked(fetch).mock.calls[0]!;
    const body = JSON.parse(init!.body as string) as Record<string, string>;
    expect(body).toMatchObject(VALID);
    expect(body.subject).toContain(VALID.name);
    // A chave vem da env var e nunca aparece no payload de teste.
    expect(fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("mostra o estado de envio e desabilita o botão", async () => {
    const user = userEvent.setup();
    let resolveFetch: (v: Response | PromiseLike<Response>) => void = () => {};
    vi.mocked(fetch).mockImplementation(
      () =>
        new Promise((res) => {
          resolveFetch = res;
        }) as Promise<Response>,
    );

    render(<Contact />);
    await fill(user);

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const sending = await screen.findByRole("button", { name: /Enviando/i });
    expect(sending).toBeDisabled();

    resolveFetch({
      ok: true,
      json: async () => ({ success: true }),
    } as unknown as Response);
    await waitFor(() =>
      expect(screen.getByRole("status")).toBeInTheDocument(),
    );
  });

  it("reporta erro de rede com role=alert", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockRejectedValue(new Error("Falha na rede"));

    render(<Contact />);
    await fill(user);

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Falha na rede");
    // O formulário continua editável para tentar de novo.
    expect(screen.getByLabelText("Seu nome")).toBeEnabled();
  });
});
