const acts = [
  {
    numeral: "I",
    title: "Diary",
    body: "A dated record of movies and episodes.",
  },
  {
    numeral: "II",
    title: "Lists",
    body: "A watchlist, plus lists you would send to a friend.",
  },
  {
    numeral: "III",
    title: "Cast",
    body: "Credits, roles, and the other movies and shows they are in.",
  },
] as const;

const sampleEntries = [
  {
    date: "Oct 4",
    title: "The Third Man",
    kind: "Film",
    detail: "1949",
  },
  {
    date: "Oct 2",
    title: "The Bear",
    kind: "Show",
    detail: "S3 E2",
  },
  {
    date: "Sep 28",
    title: "Ingrid Bergman",
    kind: "Cast",
    detail: "4 logged titles",
  },
] as const;

export function Program() {
  return (
    <section aria-labelledby="program-heading" className="mt-14 sm:mt-16">
      <h2
        id="program-heading"
        className="text-center text-sm font-medium tracking-[0.28em] text-gold uppercase"
      >
        In the app
      </h2>
      <ul className="mt-8 grid gap-8 md:grid-cols-3">
        {acts.map((act) => (
          <li key={act.title} className="border-t border-gold/40 pt-4">
            <p className="font-display text-lg text-gold">{act.numeral}</p>
            <h3 className="mt-2 font-display text-3xl leading-none text-ivory">{act.title}</h3>
            <p className="mt-3 max-w-xs text-base leading-relaxed text-stone">{act.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SampleLog() {
  return (
    <section aria-labelledby="sample-log-heading" className="mt-14 sm:mt-16">
      <h2
        id="sample-log-heading"
        className="text-sm font-medium tracking-[0.28em] text-gold uppercase"
      >
        Sample log
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone">
        Sample entries, not a live feed. Films, shows, and people sit in the same record.
      </p>
      <ul className="mt-6 border-y border-gold/40">
        {sampleEntries.map((entry) => (
          <li
            key={entry.title}
            className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-t border-gold/40 py-3 first:border-t-0"
          >
            <span className="pt-0.5 text-sm text-stone tabular-nums">{entry.date}</span>
            <span className="font-display text-2xl leading-none text-ivory">{entry.title}</span>
            <span className="col-start-2 text-sm">
              <span className="text-gold">{entry.kind}</span><span className="text-stone">, {entry.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
