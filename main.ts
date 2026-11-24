// Funniest Time Machine Warning Label — entry builder.
// Holds candidate warning labels, scores each 0-2 on the five judge
// criteria (weights 5/4/3/2/1, in the judge's published order), picks
// the winner at runtime, writes it to /output/entry.txt and validates
// the gate (UTF-8, 1-120 chars, non-blank, exactly one line).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Criteria, most important first (judge's brief):
//  1. genuinely a time-machine warning label            (weight 5)
//  2. turns a real hazard (paradox / duplicate self /
//     stranded ancestor) into the joke                   (weight 4)
//  3. surprise saved for the last few words              (weight 3)
//  4. straight face, phrased like a genuine safety notice (weight 2)
//  5. no wasted words                                    (weight 1)
const WEIGHTS = [5, 4, 3, 2, 1];

interface Candidate {
  text: string;
  scores: [number, number, number, number, number]; // one 0-2 per criterion
}

// Pass 1: seven candidates.
const candidates: Candidate[] = [
  {
    text: "WARNING: Do not meet your younger self. He has questions you are not ready to answer honestly.",
    scores: [2, 2, 2, 1, 2], // duplicate self; sting is the honesty, but the second sentence chats
  },
  {
    text: "CAUTION: This vehicle has no brakes in 1348. Plan your plague-year stops accordingly.",
    scores: [2, 1, 1, 2, 2], // straight-faced, but the plague year is flavour, not a turned hazard
  },
  {
    text: "WARNING: Killing your grandfather voids the warranty. Yours, his, and this machine's.",
    scores: [2, 2, 2, 2, 2], // grandfather paradox as a warranty clause; the list escalates at the end
  },
  {
    text: "NOTICE: The manufacturer accepts no liability for ancestors conceived during test flights.",
    scores: [2, 2, 1, 2, 2], // liability boilerplate; the joke is mid-line, not saved for the end
  },
  {
    text: "WARNING: If you see someone waving at you from this machine, do not wave back. It is you, and it is not friendly.",
    scores: [2, 2, 2, 1, 0], // strong turn, but wordy and drifts from notice-speak
  },
  {
    text: "CAUTION: Never bet on historical sporting events. The bookies are also time travellers.",
    scores: [1, 1, 2, 1, 2], // advice more than a label; hazard named, not turned
  },
  {
    text: "WARNING: Return with the same number of passengers you left with. We count. So does history.",
    scores: [2, 2, 2, 2, 2], // extra passenger = duplicate self; ties the leader, loses on length
  },
];

function weightedTotal(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function gateCheck(text: string): void {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("gate: entry is blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be exactly one line");
  }
  const chars = [...text].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`gate: entry is ${chars} chars, outside 1-120`);
  }
}

function main(): void {
  for (const c of candidates) gateCheck(c.text);

  // Winner: highest weighted total; ties broken by the smaller text
  // (the competition's own tie-break), then by earliest listing.
  const ranked = [...candidates].sort((a, b) => {
    const d = weightedTotal(b) - weightedTotal(a);
    if (d !== 0) return d;
    const l = [...a.text].length - [...b.text].length;
    if (l !== 0) return l;
    return candidates.indexOf(a) - candidates.indexOf(b);
  });

  for (const c of ranked) {
    console.log(`${weightedTotal(c)}/30  ${[...c.text].length} chars  ${c.text}`);
  }

  const winner = ranked[0];
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");

  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== winner.text) throw new Error("gate: written file differs from winner");
  gateCheck(back);
  console.log(`gate OK: one line, ${[...back].length} chars -> /output/entry.txt`);
}

main();
