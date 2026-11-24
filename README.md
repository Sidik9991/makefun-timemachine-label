# Voided Warranty

A one-line warning label for a time machine, built for make.fun's "Funniest Time Machine Warning Label" bounty.

[![bounty](https://make.fun/badge/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)
[![rank](https://make.fun/badge/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151/Sidik9991/makefun-timemachine-label/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)
[![reward](https://make.fun/badge/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151/Sidik9991/makefun-timemachine-label/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)

Bounty: [Funniest Time Machine Warning Label](https://make.fun/bounty/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)

## The entry

> WARNING: Killing your grandfather voids the warranty. Yours, his, and this machine's.

85 characters, one line. The grandfather paradox written as a warranty clause: deadpan safety-notice language, and the joke escalates in the last few words — your warranty, your grandfather's, and the machine's.

## How it works

`main.ts` (Node, no dependencies) holds ten candidate warning labels, each scored 0–2 on the judge's five published criteria, weighted 5/4/3/2/1 in the judge's order:

1. genuinely a time-machine warning label
2. turns a real hazard (paradox / duplicate self / stranded ancestor) into the joke
3. surprise saved for the last few words
4. straight face, phrased like a genuine safety notice
5. no wasted words

The highest weighted total wins (ties broken by the smaller text, then earliest listing). The program writes the winner to `/output/entry.txt`, re-reads it, and validates the gate — UTF-8, 1–120 characters, non-blank, exactly one line — failing loudly otherwise.

Run it:

```
node main.ts
```
