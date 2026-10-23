import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBase {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

interface ButtonLinkProps
  extends
    ButtonBase,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> {
  href: string;
}

interface ButtonElementProps
  extends
    ButtonBase,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = ButtonLinkProps | ButtonElementProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background-color,color,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-fill)] text-[var(--accent-contrast)] hover:bg-[var(--accent-fill-hover)]",
  secondary: "bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[var(--border)]",
  ghost: "text-[var(--ink)] hover:bg-[var(--surface-2)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/**
 * Botão ou link-botão com aparência idêntica. Renderiza `<a>` quando recebe
 * `href`, `<button>` caso contrário. Uma cor de preenchimento, raio único.
 */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonElementProps)}>
      {children}
    </button>
  );
}
