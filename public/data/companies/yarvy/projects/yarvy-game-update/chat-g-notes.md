# Chat G: less repetition, ordered board

Follows chat-e-reload, chat-d-board-presence, and the two phone versions. Four screens: `chat-g-desk-fresh`, `chat-g-desk-reply`, `chat-g-mobile-fresh`, `chat-g-mobile-reply`.

## What changed and why

- **No page header.** The rail already says Chat. The date now appears once, in the Today board header. E showed it three times.
- **Greeting and composer form one centered group.** On E the greeting sat at the top and the composer sat 400px lower. Now the chips sit directly under the input they feed.
- **Chips are actions, not questions the board already answers.** "What's next?" was removed because Up next answers it.
- **Every task is the app's real task card.** The board uses `#today-board`, `.board-group`, and `.project-tasks.board-cards` with the same `.task-card` markup as the Tasks page, and so do the receipt and the phone screens. Groups: Overdue, then Today in time order. Done tasks stay in place, struck through, and the next task carries a `Next` board tag (same tag style as Moved and New).
- **Board rows show only the More menu.** The hidden Schedule and Edit hover buttons reserved 94px and truncated dates. More holds both. Titles use the board's intended 15px, which a later `.task-card` rule otherwise overrides.
- **Replies sit on the composer.** The thread is anchored at the bottom, so the latest answer is next to where you type. Follow-up chips sit above the input.
- **One receipt per reply.** A header says "2 changes saved" with a single scoped "Undo both", above the changed task cards. The moved card's description line says where it was ("Moved from tomorrow at 7:00 AM"). D did not show that.
- **Board change markers use the app's own state:** `board-changed` peach wash plus `board-tag`.
- **Phone:** the top is centered (presence, date, greeting, summary), and the content is top-aligned under it. On a fresh load that means Up next and Overdue as board groups. The dock holds only the composer on a fresh load, plus one follow-up chip after a reply. No Today progress row: the Tasks tab covers that.
- **Overdue date reads "Fri, 2 days ago".** The red color and the Overdue label already say it is late, and the longer copy truncated on phone.

## Consistency fixes

- The time of day now matches the greeting. E said "Good afternoon" with a 12:30 run still ahead, so the fresh screen now says "Good morning" at 11:50 AM.
- The reply happens at 9:48 AM, so only standup is done (1 of 8). Ship v2 at 11:00 is Up next.
