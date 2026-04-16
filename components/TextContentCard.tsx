interface TextContentCardProps {
  title: string;
  paragraphs: readonly string[];
}

export function TextContentCard({ title, paragraphs }: TextContentCardProps) {
  return (
    <article className="surface-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
