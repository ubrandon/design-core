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

## Round two: simpler goals, on C

Brandon kept C. These three cut the goal column further, using section 7's test that simplicity is less interpretation and that hiding controls does not count. What each removes:

- **C2. One list.** The three group headers and their counts go; every goal is two lines and one control, in the app's existing attention order (needs you today first). Targets keep a thin bar plus one value line ("4 of 12 books · 8 to go by Dec 31"), habits keep the count and the 44px check and lose the day dots, growth goals keep the latest moment in quotes and lose the "1 moment this month" count. The kind of goal is carried by the silhouette: bar, check, or quote.
- **C3. Count only.** C2 without the bars. One statement of progress per card. The remaining distance in words ("8 to go") is the section 18 evidence, so nothing honest is lost; what is lost is at-a-glance comparison across targets.
- **C4. Rows.** C3 without the card boxes: hairline rows with a smaller face, the same vocabulary as the task list. All seven goals sit in 480px. Risk: the chevron is now the only clickability cue, and section 29 warns flat lists lose the cue.

The side column drops the seven-day row in all three; with completions on one day it was one bar. The three counts stay.

**Pick: C2.** C3 removes the one signal that lets a person compare targets without reading, and C4 makes the goal rows look like tasks when they are not tasks. C2 keeps one bar, one line, one control, and the whole card as the target. If the group headers turn out to matter for people with many goals, they return as quiet labels only past eight goals, which is the app's existing expansion point.

## Round three: the habit check

Feedback on C2: keep the day dots on habits (they are the insight), keep the other cards small, and the big filled circle on the right is confusing and too big. Two answers, both on C2:

- **C5. Labeled pill.** The dots return under the habit. The circle becomes a pill the same size as Moment: "Check in" at rest, "Done today" in the success wash once checked. The label says what the control does (house rule 1), and the two habit states are now distinguishable by words, not by fill alone.
- **C6. Today is the control.** No separate check. In the dot row, today's dot is the only button: larger, labeled Today, ringed in accent at rest and filled green when done. The card end shows the same chevron as every other goal. One row carries the week and the action, so nothing is said twice. Risk: a 32px dot is under the 44px target size, so the hit area is padded to 44px around it.

**Pick: C6** if the target size holds up on a phone; it removes a control instead of relabeling one, and the thing you press is the day you are recording. C5 is the safer fallback when the dot cannot be made a comfortable target.

**Phone check** (`you-c5-mobile`, `you-c6-mobile`, 390px with the four-tab bar). C5's pill costs the habit title its line: "Less takeout, more cooking" and "Meditate every morning" both wrap beside "Check in" and "Done today". C6 keeps every title on one line because the card end is only a chevron, and the seven dots spread across the card with today's dot at 32px plus padding, a comfortable target. The phone confirms C6: the control that needed the most room is the one it removed.

**Phone controls, second pass.** The phone frames now show the whole page so nothing below the fold is missed. Quick buttons on the phone are an icon in a 36px circle with the label kept for screen readers and the hit area padded to 44px: a check for the habit check-in (C5), a note-and-pencil for Moment (all variants, desktop included, where it keeps its word). Today's dot in C6 drops to 28px visually with the same 44px hit area. The check-in is real app functionality: each habit has a daily check on the You page today, and growth goals have Log a moment, both of which write to the goal.

**Header.** The "You" title, the separate identity line and the top bar actions merge into one block: a 52px avatar, the person's name as the page title, "With Yarvy since Aug 2026" under it, and Edit profile and Settings on the right. The You tab already says where you are, so the name is the title. Design Studio was the throwaway capture account; the screens now read Brandon Unglaub, and the rail shows Brandon.

## Header: what goes under the name

"With Yarvy since Aug 2026" answers none of section 6's four questions (what is this, what happened, what can I do, what needs my attention). Five header-only screens sit to the right of the You row, each a different line under the name:

1. **Name only.** Nothing restates the page. The quietest, and the honest default when there is nothing to say.
2. **Today.** "1 habit to check today · 1 milestone open", the count a link to the first one. Section 5's "what can I do here", and section 7's rule that emphasis follows what the person can act on now. Empty when everything is done, which is a settled state (section 20), so the line becomes "All caught up today".
3. **This week.** "5 tasks done · 3 check-ins · 1 moment this week". The overview from the section 7 progress page, moved into the header so the side card goes. A number with its period, as section 7 asks.
4. **Habits today.** "1 of 2 habits done today" with two dots as the evidence. One state, one unit, section 18's honest progress. Narrower than 2: it says nothing about milestones or moments.
5. **Goals.** "7 active goals · 2 paused", with paused as the labeled route. Answers "what is here", not "what is the state"; it repeats what the list below shows by its length.

**Pick: 2**, with 3 as the alternative if the side "This week" card is kept out of the column. 2 is the only line that changes what the person does next, and it goes quiet by itself once the day is done. 1 is the fallback for any day the app cannot compute it honestly.

**Chosen: header 3.** Every You screen, desktop and phone, now carries "5 tasks done · 3 check-ins · 1 moment this week" under the name, and the This week card is gone from the side column and the week strip from A, B and D. The side column is wins and badges only.

**Week dots, quieter.** A checked day was a solid green disc with a white check, the same weight as the check-in control itself. It now uses the success wash with a green check (the same pair as the Done today pill), so the row reads as a record and the control stays the loudest green on the card (section 18: keep the week quiet, the count is the fact). Today's ring is unchanged. In C6, where today's dot is the control, its pressed state keeps the solid fill.

## The side slot: what earns the space next to the goals

Recent wins in c5 mostly restates the goals column: the meditation check is already the filled dot and the Done today pill, the standup moment is already the value line on Be more patient (house rule 1, section 12: the changed object is the evidence). A list headed Today replays completed outcomes as news (section 20), and "wins" is reward vocabulary for what are records (section 18). Five section-only screens to the right of you-c5-mobile, at the column's 300px, each a different answer to section 5's questions for that slot:

1. **Done by day.** Seven cells, one per day: tasks done as a number, check-ins and moments as small marks, today ringed, future days empty. Three honest units side by side, no total repeated. Answers "what happened this week", which the header counts only summarize.
2. **Open today.** The open items across goals, ranked by what can be acted on now: a habit not yet checked with its Check, the next dated milestone, a paused goal with Resume. Section 5 question 3, and the section 7 rule that emphasis follows what the person can act on. Empties itself when the day is done.
3. **Habits, last 4 weeks.** Each habit against its own weekly target over four weeks, this week marked as partial. Section 18's honest consistency at a longer horizon than the card's dots, with no streak and nothing lost on a missed day.
4. **Since Sunday.** What changed since the last visit: a milestone reached, tasks done, a target updated. Section 20's return context, new information separated from what was already seen. Today's checks stay on the goals.
5. **Coming up.** Bounded goals with their date and the distance left. Section 18's goal gradient used honestly: the remaining distance on a known total, never reset.

**Pick: 2** for the default, because it is the only one that changes what the person does next and it goes quiet by itself. **1** is the one to keep if the slot should be evidence rather than action; it is the by-day view of the header counts and stays truthful on a light week. 3 belongs inside a habit's detail, 4 depends on tracking last visit reliably, and 5 repeats the cards' own next lines.

**Second row: productivity, fun to look at.** Five more section screens under the first row, each a picture of the person's own tasks and goals rather than a list. The doc's line is that fun comes from curiosity about real detail (section 18) and from competence made visible (section 17), not from points; every one of these is a whole number of real things, compared only with the person's own past.

6. **Your rhythm.** Twelve weeks of days, each shaded by how much got done, today ringed, with two facts under it: active days out of the total and the busiest weekday. The record that invites inspection; every cell is a real day.
7. **When you get things done.** Tasks closed by hour of day, the peak hour called out in one sentence. Self-knowledge, not a target.
8. **Distance left.** The three bounded goals as rings with the current value inside and the gap labeled. Goal gradient used honestly: the unfilled arc is the real remaining distance and never resets.
9. **Since Aug 3.** Lifetime totals in four tiles: tasks, check-ins, moments, milestones, each with this week's addition. Endowed progress on an account that has genuinely begun.
10. **This week's pace.** Tasks done by weekday as a line against the person's usual week, dashed. A comparison with yourself only, and the sentence says the honest delta.

**Pick: 6** as the fun one; it holds the most real information per pixel and stays truthful on a bad week. 8 is the strongest for goals specifically. 9 is the most tempting and the most like a score, so if it ships it keeps the units and drops the tiles' weight. 7 needs timestamps the app may not keep; 10 needs enough weeks of history to define usual.

**Chosen: This week's pace.** Two follow-ups sit at the end of the second row. `you-side-10b-pace-bars` draws the same data as daily bars with the usual day as a dashed ghost behind each; it reads the day-by-day shape better but loses the running total, which is the thing the sentence is about. The cumulative line stays the pick. Pace now replaces Recent wins on both c5 screens: in the side slot above Badges on desktop, and on the phone between the header and Your goals, where a side column does not exist and the week's shape is worth seeing before the list. Open questions for the app: "usual" needs at least four weeks of history to mean anything, so the panel should say "not enough weeks yet" until then rather than compare against a guess; and the sentence must be honest in both directions ("two behind your usual Thursday" is as valid as "a task ahead").

**Rewarding busyness.** Pace counts tasks, and a count of tasks is volume. Section 17 says motivation should connect to the underlying purpose, and section 18 says progress needs an appropriate unit; a task closed is only progress if it was one the person meant to do. Four section screens to the right of the pace bars measure finishing instead of doing:

11. **What you set out to do.** The tasks planned for this week as a segmented bar, done against planned, with what is left named and dated. Only planned work counts, so extra tasks add nothing to the number. Completion of intention, not throughput.
12. **Goals moved this week.** Each goal with whether it got a real step (a check, a moment, a milestone) and what that step was, the untouched goals listed quietly under. Measures spread across the person's own intentions; seven small steps on one goal do not hide six goals standing still.
13. **Finished.** Things that closed for good: a milestone reached, a list with every task done, a book finished. Not counted, kept. The accomplishment itself is the unit, and it stays verifiable (section 17's table: completion is evident and remains verifiable).
14. **Today.** What the person meant to do today, checked as it closes, and a plain state line: "Two left, nothing overdue. When these are done, the day is done." Section 20's closure: a settled state the page can rest in, and a stopping point the person chose.

**Pick: 11** for the slot, with 14 as the phone version where the day matters more than the week. 11 keeps pace's shape (a number against a plan, a sentence that is honest both ways) but the plan is the person's own list, not their average. 13 is the most satisfying to read and belongs on the full history page. 12 is a good goal detail summary but repeats what the cards already show for four of seven rows. Pace stays on the canvas as the comparison.

**Third row: growth over time.** The week is the wrong horizon for growth. Seven section screens in a third row show the arc of past tasks and goals since the account began, each in the unit the doc allows: real things finished, compared with the person's own earlier self (sections 17 and 18).

15. **Since Aug 3.** A timeline of what closed: milestones, a finished book, a list completed, a habit hitting its target for the first time, down to "Started with 3 goals". Growth as a path with real events on it.
16. **How far you have come.** Each bounded goal's value week by week as a small line against its dashed goal line. The trajectory, not the percentage; the remaining distance is visible as the gap (goal gradient, used honestly).
17. **Habits getting stronger.** Weeks on target per month, so a habit's strength is visible across Jul, Aug, Sep without a streak: a missed week is a pale cell, not a reset.
18. **Then and now.** First month against this one in four honest units. The plainest form; needs at least two full months.
19. **Your goals over time.** Goals completed, active and paused as stacked columns by month. Growth of the whole portfolio.
20. **Where you have grown.** Yarvy sorts finished tasks and completed goals into life areas (Health, Learning, Home, Work, Relationships), each area with a three month arc and a one line summary. A "Check the sorting" route keeps the AI's grouping honest and editable (section 26: a polished result is not evidence it is correct). Growth by area shows what the person is becoming, not how much they did.
21. **Where the finishing went.** The same areas as one stacked bar per month, with a sentence naming the area that grew and the one that went quiet. The balance in a single picture.

**Pick: 20** for the slot; it is the only one that says something the person could not read off their own goals list, and the quiet area is as useful as the growing one. 21 is its overview form. 15 is the strongest single record and belongs on the full history page. 16 is the best per goal view and suits goal detail. Constraints for the app: areas need a first sorting pass the person confirms, and every count must link to the items behind it.

**Fourth row: areas as levels.** The areas idea (screen 20) chosen, then pushed toward a game look: parts of your life and self that level. The doc's position on points and badges (section 19) is the guardrail, not a ban: a level here is a whole number of real things finished in that area, it never goes down (no loss aversion, section 18), the person can see what filled it, and the target is theirs. Five section screens at y 8560:

22. **You, by area.** A character sheet: each area a stat card with its level in a disc, a bar to the next level and the words for what fills it ("2 more weeks on target to level 5"). A level-up tag on the area that just moved. The legend states the rule: a level is five real things finished, levels never go down.
23. **The shape of you.** A radar of the five areas, current shape filled, the ideal shape the person described as a dashed outline. "Edit ideal" lets them drag a corner or tell Yarvy in words. The one picture that shows balance and ambition at once.
24. **Your areas.** Skill tiles: a grid, each area a tile with a progress ring around its icon and the level in the corner, plus an empty "Add an area" tile. Closest to a game inventory, and each tile opens the items that filled it.
25. **Where you want to be.** Level tracks with the person's own flag: level dots along a line, the current position, and a flag at the level and date they chose. Yarvy suggests the goals and habits that move toward each flag. Self-set targets, section 17's autonomy.
26. **Your areas, auto-levelled.** Yarvy names the areas and sets the levels from the goals and tasks it sees, with the evidence under each ("Half marathon goal, 2 habits, 61 check-ins") and a level-up note that says exactly what caused it and what the next level needs. Rename or merge keeps the sorting the person's.

**Pick: 26 with 25's flags.** Auto-levelling answers "levels on its own from what your tasks and goals suggest", and the evidence line under every area keeps it honest (section 26: a polished result is not proof). Add the flag from 25 as the optional "tell Yarvy where you want to be", so a target exists only where the person set one. 23 is the best single picture and could be the tap-through from any of them. 22 and 24 are the most game-like and the most at risk of becoming a score; if either ships, the "what fills it" words stay and the summed "Level 18" goes.
