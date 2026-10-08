import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  const email = normalizeEmail(value);
  if (email.length > 254) return false;
  return EMAIL_PATTERN.test(email);
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

async function readStoredEmails(filePath: string): Promise<Set<string>> {
  try {
    const raw = await readFile(filePath, "utf8");
    const emails = new Set<string>();

    for (const line of raw.split("\n")) {
      if (!line.trim()) continue;

      try {
        const parsed = JSON.parse(line) as { email?: unknown };
        if (typeof parsed.email === "string") emails.add(parsed.email);
      } catch {
        continue;
      }
    }

    return emails;
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") return new Set();
    throw error;
  }
}

export async function addWaitlistEmail(
  rawEmail: string,
  filePath: string,
): Promise<"joined" | "exists" | "invalid"> {
  if (!isValidEmail(rawEmail)) return "invalid";

  const email = normalizeEmail(rawEmail);
  const existing = await readStoredEmails(filePath);
  if (existing.has(email)) return "exists";

  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(
    filePath,
    `${JSON.stringify({ email, createdAt: new Date().toISOString() })}\n`,
    "utf8",
  );

  return "joined";
}
