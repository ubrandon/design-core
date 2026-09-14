# Main chat redesign

Based on `docs/game-feel-for-digital-products.md`, especially sections 7, 9, 12, 26, 27H, and 30, and the original chat screen at the top of this canvas.

- Purpose: turn a request into an understandable, usable plan.
- Primary read: Yarvy's current answer and the tasks that make up the day.
- Necessary support: original request, task titles and dates, separate completion and open controls, saved changes with scoped Undo, optional suggestions with Add, and a stable composer.
- Optional depth: earlier messages, task details, the related goal, the memory used to plan, and Copy.
- State changes: acknowledge Send without claiming success; show Stop during generation; show saved objects only after confirmation; leave failed or uncertain saves visibly unresolved; preserve the draft and scroll position on return.

## Feature decisions

The existing Chat, Upcoming, Tasks, You, Lists, and account destinations remain. Current reply, inline history access, task completion and inspection, goal progress, memory access, suggestions, follow-up prompts, Copy, and the composer all have a place. The composer handles task capture, so a second floating Add button is unnecessary on this page.

The launch announcement appears once as a saved task. It no longer appears simultaneously as an unsaved suggestion. The long run names both its previous and new date. Undo applies to both changes in this reply, explicitly labeled. A saved task has a completion control; a suggested task has Add. Opening a task and completing it are sibling controls, never nested buttons.

The example prompt explicitly requests the two saved changes. The writing preference was remembered in an earlier exchange, so it is shown as existing context, not as a new memory save. Goal progress stays at the original 0 of 12 long runs; rescheduling a task does not advance it.

## Interaction handoff

This is a static HTML/CSS canvas design. Buttons show placement and intended actions; they do not mutate data.

| State | Intended behavior |
| --- | --- |
| Idle | A short welcome and relevant starting prompts occupy the reply area; the composer stays in the same place. |
| Composing | Preserve typed text, show a clear focus outline, enable Send only for a nonempty draft. |
| Sent | Retain the request and acknowledge receipt locally. Do not display a saved receipt yet. |
| Receiving | Keep existing text stable, replace Send with a labeled Stop control, and allow reading earlier content without forcing scroll. |
| Complete | Use this screen: the answer leads, saved objects supply the evidence, and suggestions remain optional. |
| Partial or unknown | Mark the affected operation as not confirmed. Offer verification for unknown outcomes before a duplicate retry. Keep confirmed results separate. |
| Undo | Restore both task changes only; the task cards show the restored values after confirmation. Existing memory and goal progress are unaffected. |
| Return | Restore the latest exchange and draft. Refresh task state and do not replay prior confirmations. |

Motion is unnecessary in this static exploration. A future prototype should use local state feedback without moving reading text or replaying effects on restoration.
