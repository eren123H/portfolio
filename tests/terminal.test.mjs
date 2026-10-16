import test from "node:test";
import assert from "node:assert/strict";
import {
  runTerminalCommand,
  terminalCommands,
} from "../.test-build/apps/terminal/commands.js";
import { projects, skillGroups } from "../.test-build/data/portfolio.js";
import { existsSync } from "node:fs";

test("help documents every supported command", () => {
  const result = runTerminalCommand("help");
  assert.equal(result.type, "output");
  for (const command of terminalCommands) {
    assert.ok(
      result.lines.some(
        (line) =>
          line.startsWith(command.name) && line.includes(command.description),
      ),
    );
  }
});

test("commands ignore surrounding whitespace and case", () => {
  assert.deepEqual(runTerminalCommand("  HeLP  "), runTerminalCommand("help"));
});

test("empty submissions have no output", () => {
  assert.deepEqual(runTerminalCommand("   "), { type: "empty" });
});

test("clear requests a screen reset", () => {
  assert.deepEqual(runTerminalCommand("clear"), { type: "clear" });
});

test("about uses the confirmed introductory copy", () => {
  const result = runTerminalCommand("about");
  assert.equal(result.type, "output");
  assert.ok(result.lines.includes("IT • Yazılım Geliştirme • Veri Analizi"));
});

test("projects includes the four verified projects and source repository links", () => {
  const result = runTerminalCommand("projects");
  assert.equal(result.type, "output");
  assert.equal(projects.length, 4);
  for (const project of projects) {
    assert.ok(result.lines.includes(project.title));
    assert.ok(result.lines.includes(project.repository));
    assert.ok(
      existsSync(new URL(`../public/${project.image}`, import.meta.url)),
    );
  }
  assert.doesNotMatch(result.lines.join("\n"), /yer tutucu|henüz eklenmedi/i);
});

test("skills lists CV categories and evidence without proficiency percentages", () => {
  const result = runTerminalCommand("skills");
  assert.equal(result.type, "output");
  assert.ok(result.lines.some((line) => line.includes("Python")));
  assert.ok(result.lines.some((line) => line.includes("Gantt")));
  for (const group of skillGroups)
    assert.ok(result.lines.includes(group.title));
  assert.doesNotMatch(
    result.lines.join("\n"),
    /\d+%|yer tutucu|henüz eklenmedi/i,
  );
});

test("unknown commands, arguments and executable input are treated as plain text", () => {
  for (const input of [
    "unknown",
    "help --all",
    "help; clear",
    "$(whoami)",
    "<script>alert(1)</script>",
    "__proto__",
  ]) {
    const result = runTerminalCommand(input);
    assert.equal(result.type, "output");
    assert.equal(result.error, true);
    assert.equal(result.lines[0], `Komut bulunamadı: ${input}`);
  }
});
