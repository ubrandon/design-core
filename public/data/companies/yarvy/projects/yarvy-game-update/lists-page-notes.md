# Lists page, phone

Variations of the phone Lists tab, judged against `docs/game-feel-for-digital-products.md`: the house rules, section 5 (a component is recognizable as its type before any interaction, stable meaning), section 6 (no restating what the screen shows), section 7 (rank UI and data together, local importance must fit the whole page), section 9 (whole-target rows, finger sized controls), section 24 (navigation categories must not overlap) and the review kit in section 30.

Built on `lists-tab-mobile-copy.html`, a straight copy of the shipped page as of 2026-09-15, rendered from the app with seeded lists. The sidebar decision (`sidebar-notes.md`) already moved Today and Upcoming into their own tab; these variants assume that.

## Review contract

- **Purpose:** this helps the person open the list or view they want to work in.
- **Primary read:** the lists, by name and icon, in the person's own order.
- **Necessary support:** the three views (All tasks, All notes, Inbox), open counts, Add list, the task FAB.
- **Optional depth:** list actions (rename, icon, favorite, sublist, archive, delete), the drag handle for reordering.
- **State changes:** tapping a row opens that list; the row is pressed, not selected, since the page is left. A new list appears in place at the end of Your lists. Counts update on return without replaying.

## What the current page gets wrong

- The five view tiles take 420px of an 844px screen before the first list. Today and Upcoming duplicate the Today tab, and two of the five tiles read "0 tasks".
- Views and lists are the same kind of object (a place you open) in two silhouettes: a two-line tile and a one-line row. Section 5 asks for one silhouette per type.
- Every count restates its unit: "19 tasks", "3 notes", "4 tasks". The page is about tasks; the unit is known.
- A favorite list appears twice, in Favorites and again in Your lists, so the same object has two rows on one screen.
- Add list is a labeled pill the width of a row header, competing with the FAB for "the add control on this page".
- Every leaf row reserves a caret column, so Home is indented as if it were a child of nothing.
- Eight kebabs at rest: one tertiary control repeated on every row for actions that are rare (rename, delete).

## Variants

- **A. One silhouette.** The three views become rows in the same silhouette as the lists, Today and Upcoming leave, counts are bare numbers right aligned, Add list is a 44px icon button on the section header. Nothing moves otherwise: Favorites, the kebabs, the reserved caret column and the FAB all stay. The lowest risk version.
- **B. Lists first.** The person's lists lead the page. A favorite is one row with a small star, sorted to the top, instead of a second section repeating it. The three views sit below as a group called Views. Tests whether people come here for a list or for All tasks; if the latter, A's order is right.
- **C. Quiet tree.** A's rows and A's Favorites section (Brandon preferred the section to B's inline star, so a favorite list appears in Favorites and again in its place in Your lists, as the app does). Every list row keeps its More menu at the right edge, always visible, and a parent shows its caret just before the menu, so the caret never indents the label. No reserved column on the left. Add list is a 44px bare icon button beside the page title with Phosphor's list-plus glyph (the Lists tab icon with a plus, so it says "add list" rather than a generic plus that would compete with the FAB); this page is the only place a list is created, so it earns a real button (house rule 3). A second control sits on the Your lists line: a 32px disc in the control surface color with a dark 18px plus, on the 44px minimum target. The FAB keeps adding tasks and notes.
- **C2. Count tag.** C with each count as a small pill right after the name, the same pill the list page uses on its Tasks and Notes switch, instead of a bare number in the trailing column. The controls then own the right edge and the number reads as part of the name. Cost: the pill is a second visual treatment on every row, and a long name pushes it to a wrap.

**Pick: C** (Brandon confirmed), with A as the fallback if the app cannot move list actions into the list page. Opening a list is the frequent action and renaming one is rare, so section 7's progressive disclosure puts the menu behind a labeled route, not on every row. C also removes the reserved indent and the page-level add control, each a real simplification rather than a hidden control. Section 29's warning stands: without the kebab the rows have no clickability cue beyond the row itself, so the pressed state needs to be obvious and the list page's More menu must be found in a test. B's order is a question for real use, not a design call; keep the views on top until people show they skip past them.

## Decision: three views

Brandon confirmed dropping Today and Upcoming from this page, since the Today tab is that page. The views at the top are All tasks, All notes and Inbox in every variant. The Archived section (a foldable header with a restore row per archived list) stays at the bottom, using the app's own markup. Brandon's call: it is collapsed at rest. The variants show the closed header with a count of 1; the header is a 44px target here. Expanding it shows one muted row per list with a Restore button, as the app does today.

## Copy changes carried by every variant

| Was | Now | Why |
| --- | --- | --- |
| 19 tasks, 3 notes, 4 tasks | 19, 3, 4 | the unit is the page, section 6 |
| + Add list (labeled pill) | + (44px button beside the page title, label for screen readers) | the only way to add a list, so it is a real button, section 9 |
| Today, Upcoming tiles | removed | they are the Today tab, section 24 |
| Favorites section plus the list again below | one starred row, sorted first (B, C) | one object, one row, section 5 |

## Open questions for the app

- Counts drop the unit only on this page. The desktop side nav keeps "19 tasks" if space allows; check both read the same number.
- Reordering by drag has no visible handle in any variant, same as shipped. Keep the conventional path (Move in the list actions).

The canvas is static HTML/CSS. Hover, press and focus states follow the rules already in `yarvy-app.css`.
