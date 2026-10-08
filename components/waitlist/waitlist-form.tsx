"use client";

import { useActionState, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/waitlist/actions";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const [email, setEmail] = useState("");
  const confirmed = state.status === "joined" || state.status === "exists";
  const alert = pending
    ? null
    : state.status === "invalid" || state.status === "error"
      ? state.message
      : null;

  return (
    <section
      aria-labelledby="waitlist-heading"
      className="relative mx-auto w-full max-w-md bg-ivory px-5 py-6 text-auditorium shadow-[0_18px_40px_rgb(0_0_0/0.28)] sm:px-6 sm:py-7 lg:max-w-none"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full bg-bottle"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full bg-bottle"
      />

      <p className="text-sm font-medium tracking-[0.28em] text-emerald uppercase">
        Admit one
      </p>
      <h2
        id="waitlist-heading"
        className="mt-3 font-display text-[2.35rem] leading-[1.05] text-balance text-auditorium"
      >
        {state.status === "joined"
          ? "You are on the list"
          : state.status === "exists"
            ? "Already on the list"
            : "Join the waitlist"}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-satin" role={confirmed ? "status" : undefined}>
        {state.status === "joined" ? (
          <>
            We will write to <span className="font-medium text-auditorium">{state.email}</span>{" "}
            when Loge is ready on iOS.
          </>
        ) : state.status === "exists" ? (
          <>
            <span className="font-medium text-auditorium">{state.email}</span> is already signed
            up. We will write when the iOS app is ready.
          </>
        ) : (
          "Leave your email. We will write when the iOS app is ready."
        )}
      </p>

      {confirmed ? (
        <p className="mt-6 border-t border-dashed border-emerald pt-4 text-sm tracking-[0.18em] text-satin uppercase">
          No. 1847
        </p>
      ) : (
        <form action={formAction} noValidate className="mt-6">
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <label
            htmlFor="email"
            className="block text-sm font-medium tracking-[0.16em] text-emerald uppercase"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            maxLength={254}
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={alert ? true : undefined}
            aria-describedby={alert ? "email-error" : undefined}
            disabled={pending}
            className="scheme-light mt-2 min-h-12 w-full border border-satin bg-ivory px-3 text-base text-auditorium outline-none placeholder:text-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bottle disabled:opacity-60"
          />
          {alert ? (
            <p id="email-error" role="alert" className="mt-2 text-sm text-bottle">
              {alert}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="mt-4 min-h-12 w-full bg-emerald px-4 text-base font-medium text-ivory transition-colors duration-200 hover:bg-satin focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bottle disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? "Joining the list" : "Join the waitlist"}
          </button>
          <p className="mt-4 text-sm tracking-[0.18em] text-satin uppercase">No. 1847</p>
        </form>
      )}
    </section>
  );
}
