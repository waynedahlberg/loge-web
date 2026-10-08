import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { addWaitlistEmail, isValidEmail, normalizeEmail } from "./waitlist.ts";

test("normalizes email casing and surrounding space", () => {
  assert.equal(normalizeEmail("  Ada@Loge.app "), "ada@loge.app");
});

test("accepts a normal address and rejects incomplete ones", () => {
  assert.equal(isValidEmail("ada@loge.app"), true);
  assert.equal(isValidEmail("  Ada@Loge.app "), true);

  for (const value of ["", "ada", "ada@", "@loge.app", "ada@loge", "ada loge@loge.app", "a@b"]) {
    assert.equal(isValidEmail(value), false, value);
  }
});

test("rejects an invalid email without writing a file", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "loge-waitlist-"));
  const filePath = path.join(directory, "nested", "waitlist.ndjson");

  try {
    assert.equal(await addWaitlistEmail("not-an-email", filePath), "invalid");
    await assert.rejects(readFile(filePath, "utf8"));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("stores a normalized email once", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "loge-waitlist-"));
  const filePath = path.join(directory, "waitlist.ndjson");

  try {
    assert.equal(await addWaitlistEmail("  Ada@Loge.app ", filePath), "joined");
    assert.equal(await addWaitlistEmail("ada@loge.app", filePath), "exists");

    const stored = await readFile(filePath, "utf8");
    const lines = stored.trim().split("\n");
    assert.equal(lines.length, 1);
    assert.equal(JSON.parse(lines[0]).email, "ada@loge.app");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
