# Task modal

Variations of the task details modal, judged against `docs/game-feel-for-digital-products.md`: the house rules, section 5 (a component is recognizable as its type before any interaction), section 7 (rank UI and data together, emphasis follows consequence), section 9 (whole-target controls, finger sized), section 12 (state vocabulary, the changed object is the evidence), section 20 (settled completion), section 23 (summary and detail share one coherent object) and the review kit in section 30.

## Review contract

- **Purpose:** this helps the person see where one task stands and take its next step.
- **Primary read:** the task title, its completion state, and the next open step.
- **Necessary support:** due date, list, priority, the steps with their own checks, add a step, close.
- **Optional depth:** the description, notes, goal, added date, and the More menu (edit, move, delete).
- **State changes:** editing shows Save and Cancel in a footer and nothing else moves; Mark done fills the check and names the change with Undo beside it; a failed save keeps the edited text and says it was not saved; reopening shows the persisted state without replaying the confirmation.

## What the current modal gets wrong

- Five property pickers in filled boxes carry the same weight as the title. An empty Goal and a rarely changed Notes link look as important as the due date.
- The list appears twice: breadcrumb and List picker.
- Priority shows the whole four-flag picker at rest. The current value is what the person needs; the picker is a choice they make rarely.
- Mark done is a terracotta button in the far corner, away from the object it changes, while the steps use the check control the rest of the app uses. Two vocabularies for one operation.
- The title and description are editable but nothing says so, and the header actions are 32px.
- Labels restate: "Goals it helps", "Reference notes", "Steps · 1 of 3 complete".

## Variants

- **A. Quiet properties.** The shipped two columns, but the sidebar is a plain label and value list where each row is one 48px target, no filled boxes. The breadcrumb is the List picker. Priority shows its value. The empty Goal reads "Add a goal" in muted text. Mark done stays in the footer. Lowest risk; the hierarchy improves without changing where anything lives.
- **A2. Refined** (`task-modal-a2-refined`). A with its leftover problems fixed. Mark done moves from the footer to the priority-ringed check beside the title, the same control the list row and the steps use, so the footer goes away at rest. The properties sit in one soft panel that runs the full height, so the short column looks intentional and Added is pinned to the bottom. Each picker row keeps a muted caret, the same signal the list breadcrumb uses. Goal used the same flag glyph as Priority, so it now uses a target and becomes a one-line "Add a goal" row under a hairline. Due shows "in 2h" because it is the most urgent fact. The progress bar becomes one segment per step beside the count.
- **A3. Plain side** (`task-modal-a3-plain-side`). A2 with no tinted panel and no progress bar, shown with six steps. The details are a plain column behind a hairline that runs the full height. The tint made the details the heaviest block, even though they are the least used part. "2 of 6 done" still works at 30 steps, where one segment per step does not. Preferred over A2.
- **B. Task card silhouette.** One column, 600px. The modal is the list row grown up: the check beside the title is Mark done, and date, list and priority are chips in the same order the card meta row uses. Steps follow. Notes and Goal are chips at the bottom behind a hairline, the labeled route to optional depth. No footer at rest.
- **C. Next step leads.** Two columns. Steps sit directly under the title with the next open step filled and tagged "Next"; the description drops below as context. Properties as in A, with List in the column. Strongest answer to "what do I do now", but it adds a Next state the list does not have and pushes the description under the fold on long step lists.
- **D. Side sheet.** B's content as a 540px panel on the right edge. The list stays readable, the open row is marked, and Close returns the person to the same place. Best continuity (section 24), but it covers the right half of the list and would cover the Today board on Chat.

**Pick: B.** It passes the recognizability rule best: the thing that opens looks like the thing that was clicked, so the check, the date and the list mean the same in both places (section 23). Mark done becomes a 44px target beside its object instead of a button in the corner, and the footer is freed for the only time it is needed, unsaved edits. A is the fallback if the app cannot move Mark done out of the footer. D is worth a test on the Tasks page only.

Two more screens show B in its states: `task-modal-b-done-state` (after Mark done: filled check, "Marked done" with Undo beside it, nothing else moves; the screen does not claim the open steps completed, the app decides that) and `task-modal-b-mobile` (a full-screen sheet at 390px, Close on the left edge and More on the right, both 44px).

## Copy changes carried by every variant

| Was | Now | Why |
| --- | --- | --- |
| Goals it helps | Goal | one noun, section 6 |
| Reference notes | Notes | same |
| Steps · 1 of 3 complete | Steps 1 of 3 done | "done" is the app's verb for completion |
| Add subtask | Add step | the section is called Steps |
| No goals | Add a goal (A, C) or + Goal (B, D) | an empty field names the action, not the absence |

## Open questions for the app

- Inline editing of the title and description stays (Things 3 precedent, section 23), but nothing signals it before a click. Give the More menu an Edit item as the conventional path, and show the focus outline the moment a field is entered.
- Marking the parent done with open steps is consequential. Either the check completes the steps too and the status says "Marked done with 2 steps", or the check stays available and the status names only the task. Do not let the screen imply the first while the data does the second.
- The four-flag priority picker opens from the priority value (chip or row). The date picker and list picker open the same way.

The canvas is static HTML/CSS. Hover, press and focus states follow the rules already in `yarvy-app.css`.
