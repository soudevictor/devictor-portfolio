import { z } from "zod";

/** Schema do formulário de contato — validado no cliente e no submit. */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Digite seu nome (mínimo 2 caracteres).")
    .max(80, "O nome pode ter no máximo 80 caracteres."),
  email: z
    .string()
    .min(1, "Digite seu e-mail.")
    .email("Digite um e-mail válido, como nome@exemplo.com."),
  message: z
    .string()
    .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
    .max(2000, "A mensagem pode ter no máximo 2000 caracteres."),
});

export type ContactInput = z.infer<typeof contactSchema>;
