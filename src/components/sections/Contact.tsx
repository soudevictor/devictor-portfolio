"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { copy } from "@/data/social";

type Status = "idle" | "sending" | "success" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

/**
 * Contato — formulário validado por zod, enviado via Web3Forms.
 * Estados reais de loading, sucesso e erro. O campo é a única superfície
 * brilhante da seção (geometria da direction "one field"), mas com os três
 * campos que o conteúdo exige.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Nova mensagem de ${data.name} | soudevictor`,
          ...data,
        }),
      });

      const json = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Não foi possível enviar.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Algo deu errado ao enviar. Tente de novo.",
      );
    }
  }

  const inputClasses =
    "w-full rounded-md border-0 bg-[var(--surface)] px-4 py-3 text-[var(--ink)] ring-1 ring-inset ring-[var(--border)] placeholder:text-[var(--ink-soft)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]";

  return (
    <section id="contato" className="py-16 md:py-24">
      <Container>
        <div className="max-w-[46ch]">
          <Reveal>
            <h2
              id="contato-title"
              className="text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl"
            >
              {copy.contact.title}
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              {copy.contact.subtitle}
            </p>
          </Reveal>

          <Reveal delay={90}>
            {status === "success" ? (
              <div
                role="status"
                className="mt-10 rounded-md bg-[var(--surface)] p-6"
              >
                <p className="font-medium text-[var(--ink)]">
                  Mensagem enviada.
                </p>
                <p className="mt-2 text-[var(--ink-soft)]">
                  Obrigado pelo contato. Respondo o mais breve possível.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-[var(--ink)]"
                  >
                    Seu nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClasses}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1.5 text-sm text-[var(--accent)]"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-[var(--ink)]"
                  >
                    Seu e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClasses}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-sm text-[var(--accent)]"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-[var(--ink)]"
                  >
                    Sua mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={inputClasses}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 text-sm text-[var(--accent)]"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              {status === "error" && serverError && (
                <p role="alert" className="mt-5 text-sm text-[var(--accent)]">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="mt-8 w-full sm:w-auto"
              >
                {status === "sending" && (
                  <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
                )}
                {status === "sending" ? "Enviando…" : "Enviar mensagem"}
              </Button>
            </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
