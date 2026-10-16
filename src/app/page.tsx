import { site } from "@/data/social";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink)]">
        {site.name}
      </h1>
      <p className="mt-2 text-lg text-[var(--ink-soft)]">{site.role}</p>
    </div>
  );
}
