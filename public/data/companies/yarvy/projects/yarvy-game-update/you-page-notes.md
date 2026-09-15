# You page

Variations of the You hub, judged against `docs/game-feel-for-digital-products.md`: section 7 (the worked progress page: identity orients, a weekly summary gives an overview, active goals are the main working area, recent wins are evidence, recognition is optional and last; the summary's size is a decision to test), section 9 (whole-target cards, finger sized controls), section 12 (the changed object is the evidence), section 18 (honest progress: show the remaining distance on a bounded goal, keep streaks quiet), section 19 (badges are optional acknowledgment, subordinate to the person's own goals) and the review kit in section 30.

Built on `current-you.html`, the captured page with the seeded Design Studio account.

## Review contract

- **Purpose:** this helps the person find the goal they want to continue and record today's practice.
- **Primary read:** the goals, each with its meaningful current state and its one local action.
- **Necessary support:** today's habit checks, the next milestone, a short week overview, Add goal.
- **Optional depth:** the full wins history, paused and past goals, badges, profile and settings.
- **State changes:** a habit check fills in place and the week dots and count update with it; a failed check stays unfilled and says it was not saved; returning shows the persisted state without replaying a check as new.

## What the current page gets wrong

- The weekly summary is the loudest object on the page: a peach card with a headline ("Look at what added up.") that restates the numbers under it, a bar chart with one bar, and a 30px count. It pushes the first goal below the first screen at 900px.
- Identity takes 150px (title, 72px avatar, name, since line) before anything the person came for.
- Goal cards end in a percentage and a chevron. Percent is a second statistic for the same fact as "4 books of 12 books", and the chevron implies the card is a link while the title is the real button.
- "Log a moment" and "Paused & past" are text links, not buttons.
- Group labels are internal words: Achieve, Habits, Grow.
- Badges repeat "Earned" under each earned badge.

## Variants

- **A. Goals first.** Identity is one line under the title. The week is one line: three counts and a small seven day row, no headline, no fill. Goals follow on the first screen. Groups become Targets, Habits, Growing. Each card is one target with its value as the primary line ("4 of 12 books", "8 to go by Dec 31") and no percent; habits keep the 44px check; growth goals get a real Moment button. Wins show three with a labeled route to all 14. Badges last, no Earned labels.
- **B. Today first.** A Today section leads with the state-changing controls: the two habit checks and the next milestone with a Done button. The week line sits under it, then All goals as compact rows (no bars or dots, those live in the goal itself), then wins and badges. Strongest answer to "what do I do now", at the cost of showing the two habits twice.
- **C. Two columns.** A's goals as the working column; the week, wins and badges in a 300px column beside them. Uses desktop width for related evidence, not extra statistics. Needs a 1040px wrap, wider than every other page in the app.
- **D. Quiet story.** The shipped order and labels kept. The summary loses its fill, headline and big count but keeps a full seven day chart; cards lose the percent and chevron; Moment becomes a button; badges lose the Earned label. The conservative version.

**Pick: A.** It follows the section 7 example directly: identity orients in one line, the overview is one line, the goals are the working area and are on the first screen, wins are evidence, badges are last. The doubled habits in B are a real cost, and C's width breaks the one-column rule the rest of the app keeps. D is the fallback if the group labels and order have to stay. If B's Today idea is wanted, the Today tab already answers it; the You page should not compete with it.

## Copy changes carried by A and C

| Was | Now | Why |
| --- | --- | --- |
| Your week so far / Look at what added up. | This week | the counts are the content, section 6 |
| 33% + 4 books of 12 books | 4 of 12 books · 8 to go by Dec 31 | one statistic, with the remaining distance, section 18 |
| Achieve, Grow | Targets, Growing | plain words for what the goals are |
| Log a moment (link) | Moment (button) | a real target, house rule 3 |
| Paused & past | Paused and past | no ampersand in copy |
| See 11 more wins | All 14 wins | names the whole, not the remainder |
| Earned (under each badge) | removed | the check on the coin already says it |

## Open questions for the app

- The week row shows tasks done per day. With completions all on one day it reads as one bar; check it with a real week before deciding whether the seven day row earns its place, or whether the three counts alone are enough.
- Habit streaks stay in the value line ("done today") rather than as a separate count, per section 18. If the app keeps "3-day streak", it belongs after the weekly count, never before it.
- The whole card opens the goal. The check and Moment button sit above that target and stop propagation.

The canvas is static HTML/CSS. Hover, press and focus states follow the rules already in `yarvy-app.css`.
