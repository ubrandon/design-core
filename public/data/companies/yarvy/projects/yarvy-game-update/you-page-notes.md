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

## Round four: sorting for feel

26's list is honest but flat: five rows in a fixed order, so "where do I need to look" still takes reading every row. The ask is to feel it, not read it: know at a glance what needs work, what improved, what has room, what's leveled, without turning any of that into a score (section 19's guardrail still applies). Three section screens, all built on 26's same five areas and evidence lines.

27. **Where to look first.** One list, re-sorted instead of re-labeled: the quiet area floats to the top, a fresh level-up sits under it as the rewarding evidence, then areas still moving, then the steady ones sink to the bottom because there is nothing new to see. A plain word at the row's end (needs a look, leveled Mon, moving, steady) confirms what the order already implies. No lanes, no headers, order carries all of it.
28. **This month, two lists.** Only the two states worth a special call-out get one: Leveled up (with the evidence that caused it) and Quiet (the one nudge, one line, no guilt words). Steady areas are deliberately left off this view; "room for improvement" is not a fourth bucket here because the full areas list (26) already shows that for everything mid-goal, and a bucket invented just to be complete would be the thing section 26 warns against, a polished taxonomy standing in for a real signal.
29. **Your pulse.** Each area as an eight-week trail of its own real weekly count (check-ins, tasks, moments), today's week outlined. A thinning trail says "quiet" before any word does, a climbing one says "improving"; a caption gives the honest number so a real zero week never reads as missing data. No percentage, no total, just eight true bars per area.

**Pick: 27** as the default list, because it is the smallest change to 26 that answers the ask, order instead of a new visual language, so it drops into the same row of cards. **29** is the strongest at pure feel, worth using as the header's own small visual (a tap on the "This week" count could open it) rather than replacing the list. **28** is the best short digest for a weekly check-in moment (a notification, a Monday summary) but is too thin to be the page's main view, half the areas are not in it on a quiet month.

## Round five: statuses front and center

Feedback on round four: 28 and 29 were hard to understand; the plain-word statuses on 27 were the part that worked. So the statuses stop being a confirmation at the row's end and become the thing itself, in Brandon's own four words: needs work, leveled up, room to grow, steady. Section 18 still applies: a status is a summary of real evidence, so every chip keeps its "why" line, and no status is a grade, only a description of the last few weeks.

30. **Status chips.** One flat list, every area gets one colored chip: Needs work (warm), Leveled up (green, with the up arrow), Room to grow (accent), Steady (grey). The evidence line under the name says why the chip is what it is. The list stays sorted needs-work first, so color and order agree.
31. **Status groups.** The four statuses become the section headers themselves, colored, with the areas underneath. The buckets are the first read, before any area name. An empty bucket disappears instead of sitting there empty, so on a good month "Needs work" is simply gone, which is the settled state from section 20.

**Pick: 30.** It reads in one pass, keeps all five areas in one list, and the chip vocabulary is small enough to learn in one visit. 31 is the loudest version of the same idea and works better the more areas a person has; below about six areas the headers outnumber the rows. Watch item for both: "Needs work" is the one label that can shame, so it stays tied to a factual line ("nothing in 2 weeks") and never appears on an area the person marked as intentionally paused.

## Round six: the tap-through

Feedback on 30 and 31: cool, but the chip needs its receipts. Tapping an area should show why the status is what it is, how the level is computed, what Yarvy would suggest doing about it, and what the higher end looks like. Two detail screens, one per end of the status range, both the same page shape so one build serves every status:

32. **Area detail, needs work (Relationships).** Four blocks in the order the questions come: "Why it says needs work" (three dated facts, each with its comparison: last finished thing, count against the busiest area, no goal here); "How this area levels" (the ladder with the real rule spelled out, 5 real things per level, the 3 things done so far named, 2 to go); "Yarvy suggests, from your own stuff" (a habit, a goal and a task, each traced to its source: the starred task, the chat note from Aug 28, the open Inbox item, each with one Add button); and the flag slot, empty here, as the invitation to set the higher end. Suggestions cite their source line so the AI stays checkable (section 26), and adding is one tap but always the person's tap (section 17, autonomy).
33. **Area detail, leveled up (Health).** Same shape, opposite mood: the level-up banner with its cause and its count (the 20th real thing since Aug 3); "What filled it" as the three evidence rows; the ladder with the person's own flag drawn at level 6 and "on pace" said honestly; then "Two routes to level 5, from your data", the milestone route and the weeks-on-target route, each with the person's current position under it, joined by an explicit "or" so the choice reads as theirs. The flag card shows when it was set and that Yarvy plans backward from it.

The higher end is never a norm or another person's number: it is the flag the person set (25), and where no flag exists the slot asks rather than assumes. Every count keeps its "see the items" route.

**Both ship as one template.** The four blocks are the same page: status receipt, ladder, suggestions or routes, flag. What varies by status is only the mood of the first block and whether the third block suggests starting things (needs work) or finishing the ones in motion (leveled, room to grow). Steady areas get the same page with a calm first line ("nothing new, nothing slipping") so no status is a dead end.

## Round seven: is a level even the right unit

Brandon's doubt: "5 real things per level" is arbitrary, and a bad-good health bar is judgmental when these things can always grow. Three replacement units, each a different answer to what the number should mean. All keep the chips from 30 as the status layer; what changes is what sits where "Lv 4" sat.

34. **Named states.** No numbers at all. The AI says the state you have reached in words it can prove ("Runs twice a week, six weeks straight", "Shows up for the big days") and the next state it can see in your data ("a 10 km finisher, it is your next milestone"). Achieved is whatever the evidence says it is, which is exactly "AI sets whatever achieved is". Tap a state to see the items that earned it; "Say it your way" keeps the words the person's. Risk: flattery drift, a state that sounds like a compliment instead of a fact, so the rule is every noun and number in the sentence must trace to items.
35. **Your 100%.** Bounded, but the bound is yours: 100% is a state you described in a sentence ("Run a half marathon, keep both habits weekly"), the percent is distance to that sentence, and reaching it invites you to describe a new 100%, which is how "always can grow" fits a bounded scale. Where you described nothing there is no number at all: Yarvy may offer a guessed ideal to keep or rewrite, and an area with too little data gets no guess. Section 18's remaining distance, with the person owning the definition of done.
36. **Condition.** No accumulation, no top end: a pace dial from "resting" to "in full swing", last 4 weeks only, both ends legitimate. The scale is the person's own range (in full swing = their own busiest month, nobody else's), a hollow dot shows last month so direction is visible, and the caption explains the position rather than judging it: Home winding down after a finished reno is "the plan working", Relationships resting gets a question ("was it a rest you meant to take?"), not a verdict.

**Pick: 35 as the unit, 36 as the second line.** 35 is the only one where the number means something the person chose, which kills the arbitrariness complaint at the root; and the redefine-at-100 loop is the honest version of endless growth. 36 answers a different question (is this area getting attention right now) and that question deserves to survive: it can power the chips (a "needs work" chip is just condition resting when no rest was chosen) and fit as one quiet line on the area detail. 34 reads beautifully and is the most human, but it is the hardest to keep honest at scale; keep it as the words the level-up moment uses, not as the system of record.

**Brandon: 36 is the closest.** Condition becomes the unit. 34 and 35 come off the canvas; 35's describe-your-100% survives as an optional second mark on the dial (below), and 34's named states as level-up words are shelved with the levels themselves.

## Round eight: condition all the way through

Condition replaces levels as the system of record, so the two pieces that already worked, the chips and the tap-through, get rebuilt in condition terms:

37. **Condition chips.** 36's rows with 30's legibility: the pace word becomes the chip, the dial and ghost dot stay under it, the why line keeps the honest count. The vocabulary is four words, none of them bad or good: in full swing, rolling, winding down, resting. The one distinction that matters is planned against unplanned rest: Home resting after a finished reno is a grey settled chip with a check; Relationships resting with no rest chosen is the only warm chip on the page, worded as a question ("Resting, unplanned?"), never a verdict. Sorted quietest-unplanned first, so the page still says where to look without a single judgment word.
38. **Condition detail.** The tap-through for the warm chip: the dial large with its sentence (1 thing in 4 weeks, a month ago this was rolling) and the range rule stated (your own busiest month is the top, no one else's numbers); the receipts; then the page's one real question, "Is this a rest you meant to take?", with two honest buttons: "Yes, resting for now" turns the chip grey and silences Yarvy on the area, "No, get it moving" leads into the suggestions. Suggestions are reframed around the dial: "one small thing would move the dot", with the five minute task first, then the habit that keeps it rolling by itself, then the goal. The 100% ideal from 35 survives as an optional farther mark on the dial, offered in one line at the bottom.

The planned-rest state is the design's answer to shame: the system never decides an area is neglected, it only notices rest and asks whether it was chosen. Chosen rest is settled (section 20) and Yarvy goes quiet; unchosen rest gets one question and three ways to move the dot, all drawn from the person's own items.

## Round nine: scannable, per the doc

Feedback on 37 and 38: kind of there, still too complicated, hard to scan. Reread against the doc, the failure is section 7's "do not repeat the same statistic": each 37 row said pace four ways (chip word, dot position, ghost dot, why line) plus a footnote that restated the design rationale on the screen (house rule 1 violation, copy that restates). Scanning is hard because every row is five overlapping signals. The fix is not smaller elements, it is one signal per row, with the receipts behind the tap (progressive disclosure, section 9), which 38 already is.

44. **One word per area.** Five rows: icon, name, chip, chevron. Nothing else, except under the one warm chip, one action line ("Reply to Sam would get it moving"), because emphasis follows what the person can act on (section 7). No dials, no ghosts, no footnote. The dial, receipts, question and suggestions are all in the tap-through (38), which stays as is.
45. **One rail.** The other way to be scannable: one picture instead of five rows. All five areas as faces on a single resting-to-full-swing rail, the unplanned-rest one ringed warm, and one sentence under it naming the only thing that needs attention with its one action. The whole month reads in a glance, and clustering is information: four faces bunched right and one alone on the left is the story, no words needed.

**Pick: 44 as the section on the You page, 45 as the phone glance.** 44 keeps the list form every other section uses and each row is a whole target into 38. 45 is the most scannable thing this exploration has produced and earns the small slot: header area, widget, or watch face; as a full section it underuses the space and the labels fight at five areas or more. Both pass the doc's five-questions test in one read: what is this (my areas), what is the state (the chips or positions), what can I do (the one named action), what needs attention (the single warm signal), what counts as done (everything rolling or rest that was chosen).

## Round ten: the life board (E)

Brandon's ask: make c5 look better, read easier, feel more motivating, and fold in the side ideas (areas, statuses, radar, tiles, life overview) so tasks and goals visibly add up to a life. `you-e-life-board` (desktop) and `you-e-mobile` (phone) sit to the right of 39.

What was wrong with c5:

- Nothing connects the levels. Tasks live on Today, goals here, and the page never shows that a task moved a goal or that goals add up to anything bigger.
- The header's three counts (tasks, check-ins, moments) are three units that mean nothing together.
- Pace counts volume, and on a Tuesday it is two points on an empty chart.
- Run a half marathon shows a 0% bar while two milestones are done: the wrong unit for that goal.
- Badges ("3 goals set", "First list") are the only recognition on the page and they reward setup, not results.

What E does, top to bottom:

1. **Your life this week.** Six area tiles (39's areas, 24's tile look, 30's chips). Each tile has one status and a row of pips, one pip per real item this week: filled is done, hollow is planned and still open. This is the part that makes the page feel like a game: you can see each finished task land in part of your life, and the pips count real things, not points. Home shows chosen rest as Paused and Relationships is the only warm tile.
2. **Your goals, grouped by area.** Every goal sits under its area, so the page reads area, goal, task. Each card keeps its own unit (milestone steps, day dots, a bar with the distance left, the latest moment) and adds its **chain**: the linked tasks as small chips, done with a green check and open with a hollow ring. Each chip opens that task.
3. **Side column: improving, a look, finished.** One evidence-backed identity line ("You're becoming a regular runner", 1 to 2 runs a week), the single area that needs a look with one real action and a chosen-rest way out (38's question), and Finished in place of badges: milestones, books, lists that closed for good.

Header now says "10 things done this week · 5 still planned": done against intended, the same split the pips show.

Open questions for the app: tasks need a goal or area link (Yarvy can propose it, the person confirms); the "improving" line needs at least four weeks of history and a rule that every number traces to items; pips cap at about 8 before collapsing to a count.

## Round eleven: F, E cut down

Feedback on E: too complicated and overwhelming. `you-f-simple` and `you-f-mobile` keep one signal per area, one line per goal, one card beside them.

- **Areas:** icon, name, and one mark per thing done this week. No status chips, no hollow "planned" marks, no counts. An area with nothing shows a word instead (Quiet 2 weeks in warm, Paused in grey).
- **Goals:** back to one flat list with c5's cards. No area group headers, no task chips. The half marathon keeps milestone steps instead of a 0% bar.
- **Side:** only What's improving. The Relationships prompt goes (the warm word on the tile is enough, the tap opens 38's detail). Finished becomes a link next to Paused and past.
- **Header:** "10 things done this week", one number.

## Round twelve: making Your life say what it is

Feedback on F: the full row of six tiles is confusing. It reads like navigation, "Your life" does not say what is counted, and the key sits far from the marks. Five section-only screens (`you-life-1` to `5`, 960 wide), all on the same data: 10 things done this week, Health 4, Work 4, Learning 1, Money 1, Relationships quiet, Home paused. Every option has a heading that names the unit and a subtitle that says how things get sorted, and none shows a tile for an area with nothing in it.

1. **Numbers.** Four tiles, a big count each; quiet and paused areas drop to one line under them.
2. **One bar.** "Where your 10 things went": one split bar, labeled chips with counts, the quiet line.
3. **Rows with receipts.** Each area names what went into it ("Long run, meditated twice, cooked once"), so the section explains itself without a key.
4. **Bar chart.** One row per area, bar length is the count, empty rows say why ("Quiet for 2 weeks", "Paused, reno finished").
5. **Sentence.** "Most of it went to Health and Work." as the headline, area chips with counts as the proof.

**Pick: 3.** Seeing the items is what makes "area" make sense: you read "Health, 4 done: long run, meditated twice, cooked once" and the idea explains itself. 2 is the most compact and the best glance; 4 is the clearest comparison but the heaviest.
