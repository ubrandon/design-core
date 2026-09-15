# Sidebar and bottom nav

Variations of the desktop rail and the phone tab bar, judged against `docs/game-feel-for-digital-products.md`: sections 5 (readable situation), 7 (ordered importance, peripheral destinations get stable navigation), 14 (edges are infinite targets, buttons sized for a finger), 24 (navigation preserves a mental map, review labels without the visual treatment) and the craft review table in section 30.

Navigation is peripheral on every page. Its job is to answer "where am I" and "where else can I go" at a glance, then get out of the way. Once the person is in the workspace it should not be the most prominent object on the screen.

## Desktop rail

- **A. Quiet rail.** No selected card. The current place is the filled glyph, a darker label, and a 3px marker on the screen edge. Narrower (216px). Lowest visual weight; the chat and the Today board are the loudest things on the page.
- **B. Icon rail.** 92px, glyph over a small label, the same silhouette as the phone tab bar stood upright. Gives about 110px back to the two-column workspace. Labels stay so the destinations still read without the icons.
- **C. State and lists.** The shipped rail plus one number per place (Upcoming: 2 today, Tasks: 1 overdue in the overdue color) and a Lists section with counts. Lists currently have no home on desktop. Risk: the counts compete with the Today board, which already answers the same questions.
- **D. Full map.** Account switcher on top, search with a shortcut, primary places, a second group for Lists and Goals, Settings and Help at the bottom. Everything the app has, in one column. Heaviest, and most of it is peripheral on a chat page.

**Pick: A**, with Lists from C folded in as a collapsed section only on the Tasks page, not on Chat. The rail is a place list, not a dashboard; the Today board is where state lives. A keeps the selected state unmistakable (fill plus edge marker) without a card fighting the composer for attention, and it survives the review "does the first thing they notice serve the page's purpose".

## Phone tab bar

All four drop the fifth Lists tab. Lists and Tasks overlap in meaning; Lists become a segment inside Tasks.

- **A. Four tabs, capsule.** The shipped bar minus Lists. Widest targets of the four.
- **B. Flat bar.** Filled glyph and accent label only, no capsule, no shadow, one hairline. Quietest, and the selected state relies on color alone.
- **C. Floating pill.** The bar floats inset over the page like the composer already does. Looks lighter but costs 14px of reach at the bottom edge and puts two floating surfaces on top of each other on Chat.
- **D. Docked composer.** Composer and tabs share one bottom surface. Saves about 24px of vertical space on Chat and the two controls stop competing. On other tabs the bar is on its own and reads the same as A.

**Pick: D on Chat, A elsewhere** (they share the same bar, D only changes how the composer attaches to it). If one bar has to be the same everywhere, A.

## Decision: rename first, no new functionality

Reviewed against the app in `../yarvy`: the Tasks page already has Today and Upcoming as views in its left nav, and the phone Lists tab is that same nav rendered full page. So the tab set becomes **Chat, Today, You, Lists** (Lists on the right edge because it is used more than You) with two renames and no new pages:

- **Upcoming tab becomes Today.** Same Upcoming page, same agenda component. It already opens on Overdue and Today, with Tomorrow, This week, Next week below. Only the title changes.
- **Tasks tab becomes Lists.** Same Tasks page. On the phone it opens the existing Lists page (projects view) instead of a fifth tab doing that.
- **One row change:** Today and Upcoming leave the Tasks page left nav, because they now have their own tab. Reverse this if it counts as functionality.

All eight nav variants above carry the new labels. The Today icon stays the calendar, Lists takes the list glyph the phone Lists tab already used.

**Page screens** (row "Today and Lists pages, renamed only"): `today-tab-mobile`, `lists-tab-mobile`, `today-page-desktop`, `lists-page-desktop`. Built from the real app markup: the agenda groups and task cards from the Upcoming view, and the captured Tasks nav from `current-tasks.html`.

The canvas is static HTML/CSS. Hover, press, and focus states follow the rules already in `yarvy-app.css`.
