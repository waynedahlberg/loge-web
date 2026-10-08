"use server";

import path from "node:path";
import { addWaitlistEmail, normalizeEmail } from "@/lib/waitlist";

const waitlistFile = path.join(process.cwd(), "data", "waitlist.ndjson");

export type WaitlistState = {
  status: "idle" | "invalid" | "error" | "joined" | "exists";
  email?: string;
  message?: string;
};

export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const company = String(formData.get("company") ?? "");
  if (company.trim() !== "") {
    return { status: "joined" };
  }

  const rawEmail = String(formData.get("email") ?? "");

  try {
    const result = await addWaitlistEmail(rawEmail, waitlistFile);

    if (result === "invalid") {
      return {
        status: "invalid",
        message: "Enter a valid email address.",
      };
    }

    return {
      status: result,
      email: normalizeEmail(rawEmail),
    };
  } catch {
    return {
      status: "error",
      message: "We could not save that email. Try again in a moment.",
    };
  }
}
