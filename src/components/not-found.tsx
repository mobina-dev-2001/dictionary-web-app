export const NotFound = () => {
  return (
    <div
      role="alert"
      aria-labelledby="not-found-heading"
      className="grid items-center gap-12 py-20 text-center"
    >
      <span aria-hidden="true" className="text-[4rem] leading-16">
        😕
      </span>

      <div className="grid gap-5">
        <h2 id="not-found-heading" className="text-xl leading-[1.2] font-bold">
          No Definitions Found
        </h2>

        <p className="text-muted-foreground text-lg leading-[1.33]">
          Sorry pal, we couldn&apos;t find definitions for the word you were looking for. You could
          try the search again at a later time or head to the web instead.
        </p>
      </div>
    </div>
  );
};
