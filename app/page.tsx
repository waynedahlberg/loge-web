import { FrameCorners, MarqueeBulbs, ProsceniumFan } from "@/components/waitlist/ornaments";
import { Program, SampleLog } from "@/components/waitlist/program";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export default function HomePage() {
  return (
    <main className="relative isolate flex flex-1 bg-auditorium text-ivory">
      <div className="loge-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-8 sm:py-12">
        <div className="loge-rise border border-brass p-1.5 sm:p-2">
          <div className="relative border border-gold/80 bg-bottle">
            <FrameCorners />
            <div className="bg-emerald px-4 py-4 text-center">
              <MarqueeBulbs />
              <p className="text-sm font-medium tracking-[0.28em] text-ivory uppercase">
                An iOS app
              </p>
            </div>
            <div className="px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
              <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:gap-16">
                <header className="text-center">
                  <ProsceniumFan />
                  <p className="mt-2 pl-[0.2em] font-display text-6xl tracking-[0.2em] text-ivory uppercase sm:text-7xl">
                    Loge
                  </p>
                  <h1 className="mx-auto mt-6 max-w-lg font-display text-4xl leading-[1.1] text-balance text-ivory italic sm:text-5xl">
                    Discover and track movies, shows, and cast.
                  </h1>
                  <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-pretty text-stone sm:text-lg">
                    Log what you watched, keep what you want to see, and look up who was in it.
                  </p>
                </header>
                <WaitlistForm />
              </div>
              <Program />
              <SampleLog />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
