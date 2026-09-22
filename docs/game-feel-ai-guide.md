# Game Feel AI Guide

Design requirements and style preferences for calm, subtly game-like digital products. **Read this file in full before designing or revising screens, prototypes, or company UI.** Deep research and numbered sources live in [`game-feel-research.md`](./game-feel-research.md).

Product-agnostic. Default intended feeling: **calm confidence**. No points, badges, or streaks as engagement devices.

## Requirements versus preferences

**Firm requirements:** clear purpose and hierarchy, recognizable controls, readable and accessible content, honest state and progress, understandable consequences, and recovery where possible. Do not sacrifice these for visual polish. The experience statement, core rule, house rules, and accessibility checks define the baseline.

**Strong style preferences:** quiet backgrounds, content-led personality, soft shapes, generous targets and spacing, restrained accents, and subtle feedback. The Taste and styling section describes Brandon's preferred visual direction. Its shapes, colors, layouts, and example patterns are defaults, not mandatory geometry for every screen.

**Contextual patterns:** use the interaction and pattern-library guidance when its stated situation applies. A static canvas screen shows relevant states without adding JavaScript. An interactive prototype implements the states and recovery its actions need. Show Stop, Undo, and other controls only when the operation supports them; do not imply capabilities that do not exist.

**How to resolve conflicts:** start with Brandon's current brief and the actual user task. Use the company's existing tokens and components and respect platform conventions. Apply these taste preferences within that foundation; they do not authorize a brand redesign. Preserve accessibility and honest behavior when adapting the visual treatment. If a preference would hurt the task, adapt it and briefly explain the reason without requesting routine approval.

For example, a content discovery screen may use a large illustrated card and pill action. An account table may use compact rows and the company's existing buttons. Both should have clear hierarchy, generous usable targets, and predictable feedback.

---

## Experience statement

People should feel oriented, capable, and unhurried. They should predict the effect of an action, see the result, and continue (or stop) without wondering whether the system understood. A successful exchange leaves: "I know what happened, I can change it, and I know where I stand." Reject any treatment that makes the product more demanding, less predictable, or less honest, however attractive it looks.

## Core rule

Every page, section, component, card, and control has **one clear user purpose** readable at first glance. Actions, information, and emphasis support that purpose in order. Each child serves its parent. Simplicity means little interpretation or unnecessary effort, not hiding controls.

## House rules

1. **Copy is short and clear.** Lead with the outcome, name the object, cut restatements of the screen.
2. **Recognizable at a glance.** Type, function, and available actions are obvious before interaction.
3. **Click areas as large as possible.** Real buttons. If a card opens something, the whole card is the target.
4. **Clean hierarchy at every scale.** Page, section, component. Simplification that only hides controls does not count.

---

## Readable situation

Before styling, the person should answer:

1. Where am I, and what am I looking at?
2. What is the current state?
3. What can I do here?
4. What would that action affect?
5. What would count as a useful result?

A component is recognizable as its type, function, and actions at a glance. Stable meanings for accent, selection, success, and failure. Do not make people learn that a plain word is a button.

## Purpose and hierarchy

Complete: "This helps the person ___." Use a concrete outcome. Rank UI and data together:

| Priority | Role | Treatment |
| --- | --- | --- |
| Primary | Subject, decision, or result that fulfills the purpose | First in reading order; strongest relevant emphasis |
| Supporting | Info and frequent actions needed to act correctly | Adjacent, readable, available |
| Contextual | Explanation, history, less common alternatives | Lower emphasis or labeled expansion |
| Peripheral | Admin and unrelated destinations | Stable nav or a separate surface |

## Copy

- Lead with the outcome.
- Name the object and the scope.
- One idea per line.
- Say what the system knows ("Saving" is not "Saved").
- Cut connective tissue and restatements.
- One verb per operation across the product.
- Errors name the object and the remaining action.

## Space and Gestalt

Group with proximity, similarity, continuation, and common region before adding boxes or dividers. Three scales: within a component, between components, between groups. Whitespace that separates things that must be compared is harmful. Temporal space matters: results should settle before the next prompt.

## Targets and timing

- Whole card is the target when the card opens something; nested actions get their own large targets.
- Meet platform minimum target sizes; never shrink for a prettier resting screenshot.
- Offer a small set of relevant choices; do not dump every possible action.
- ~0.1s feels instant, ~1s keeps thought unbroken, ~10s needs progress and a way out.
- Prefer recognition over recall; progressive disclosure for optional depth, not for hiding frequent actions.

## Actions, loops, and state

An action has target, scope, commitment, and consequence, legible before activation. Spec: "When the person does X, the system changes Y, within scope Z, and confirms through W."

**Async operation states**

| State | Meaning to communicate | Appropriate evidence |
| --- | --- | --- |
| Ready | An action is available | Clear control and relevant context |
| Accepted | The input was received | Immediate local acknowledgment |
| Working | The operation remains active | Honest status and appropriate control |
| Completed | The requested outcome is confirmed | Changed artifact or explicit result |
| Partially completed | Some intended changes happened | Exact scope of success and remaining work |
| Failed | The intended outcome was not achieved | Understandable cause and recovery path |
| Unknown | Completion cannot yet be established | Verification or reconciliation, without false certainty |

**Interaction state vocabulary** (stable across the product)

| State or event | Primary meaning | Suitable treatment | Common misuse |
| --- | --- | --- | --- |
| Focus | Keyboard input is directed here | Clear outline or equivalent focus indicator | Styling it identically to persistent selection |
| Selection | This object is the current target | Stable fill, marker, or border | Repeated pulsing after selection settles |
| Press | Input is being acknowledged | Brief local response | Implying the operation has finished |
| Working | Completion remains pending | Honest status near the affected area | Fake percentages or decorative certainty |
| Confirmation | A real outcome is established | Updated object and concise acknowledgment | Celebration without showing the result |
| Failure | The intended result is incomplete | Specific explanation and recovery | Only changing color or shaking the screen |

Where possible, the changed object is the primary evidence. Toast is secondary. Pressed is not Completed. Proposed is not Persisted.

**Controls are small state machines.** Before polish, name Idle, Armed, Working, Succeeded, Failed, and Disabled for consequential controls. Map visual states (hover, focus, pressed, disabled) onto those meanings. Sticky modes need an obvious exit.

**Slips vs mistakes.** Prevent slips with constraints, defaults, and forgiveness. Prevent mistakes with clear commitments and proposal vs persisted separation. Confirm only irreversible or external effects.

**Fluidity.** Acknowledge start, track continuation, allow redirection. Failures: scroll hijack, non-interruptible transitions, finishing a motion for the person.

**AI / uncertain systems.** Separate interpretation vs commitment, proposal vs completion, confidence vs decoration. Keep relevant controls visible: Stop while work can be stopped, Undo when reversal is supported, Edit interpretation when it can be corrected, and Dismiss for dismissible output. Fluent text is not evidence.

## Motivation (short)

Support competence, autonomy, and honest progress toward the person's goal. Informational feedback helps; controlling rewards risk undermining intrinsic motivation. **If the reward disappeared, would the action still matter?** If no, do not ship it as engagement. No points, badges, or streak pressure as the loudest thing on the page.

## Rhythm

Orientation, action, feedback, rest. Rest is a settled state where the person can leave. Do not auto-convert every success into another assignment. On return, restore context; do not replay old confirmations as new events.

---

## Craft essentials

**Typography.** Styles by job: primary content, object title, supporting description, metadata, control label. Hierarchy must survive long labels and larger text. Quiet metadata must not outrank primary content. Tabular figures for comparable numbers.

**Color and depth.** Assign semantic meanings once (accent, success, warning, destructive, selection). Depth answers temporary vs durable. Icons accelerate recognition; they are optional weight when a label is required.

**Empty and loading.** Empty explains absence and offers the first useful act. Skeletons match eventual hierarchy; wrong for process work and sub-second loads; never denser than the real result.

**Navigation.** Places, object inspections, and temporary tasks should feel different. Labels are information scent; review them without icons. Weak or false scent causes mistakes.

**Taste and styling north star**

This section turns a concrete reference set into strong visual preferences for AI and humans designing screens. It does not replace the firm requirements or the company's design system. Research context lives in [game-feel-research.md](./game-feel-research.md); these visual preferences express Brandon's taste, not universal findings. Aim for calm confidence with subtle game feel: simple, instantly recognizable, generous space, large targets, and clicks whose effect is obvious before you press.

**Reference set (Sep 2026).** Screens that define this taste: Loona home (dark, illustrated sleep content), a map discovery sheet with photo pins and a photo detail card, Discord "Create Your Server" (light, large choice rows with playful icons), and Apple Games Library / Events / Friends (black canvas, cinematic cards, floating pill nav). The rules below are what these share. Brand colors and art style may change; the structural habits should not.

**What they share (the distill)**

| Habit | What you see | Why it feels good |
| --- | --- | --- |
| Quiet chrome, loud content | Backgrounds are near-black, soft gray, or calm dark purple; maps are desaturated; UI bars are translucent or flat. Photos, 3D art, app icons, or character icons carry color and emotion. | Interest without busyness. The screen feels alive because of the *content*, not because every control is decorated. |
| One shape language | Large corner radii everywhere: cards, pills, chips, nav islands, icon wells. Circles for icon-only actions. Few sharp rectangles. | Soft, tactile, "pressable" without heavy skeuomorphism. Recognition of control type at a glance (house rule 2). |
| Whole-object targets | Feature cards, list rows, filter chips, and Play/Start pills are large. The whole card is the hit area; secondary actions (bookmark, filter) get their own clear wells. | Matches house rule 3 and Fitts (targets). Game menus teach this: you aim at a slab, not a text link. |
| Predictable clicks | Cards with chevrons open. Pills filter or act. Play starts. Bottom destinations switch place. Active nav is a quiet pill/glow, not a new metaphor each screen. | Subtle game feel: you know what clicking will do before you click (readable situations and commitments). |
| Hierarchy by weight and silence | One bold title; one quieter subtitle; metadata smaller and muted. Accents (one purple, one yellow status dot, one blue CTA) are rare and reserved. | Simple to scan. Not boring because art and one accent carry life; not busy because chrome stays quiet. |
| Space as grouping | Generous padding inside cards and between sections. Equal gaps never between unequal groups (space / Gestalt). Lists breathe. | Good use of space without emptiness as a style pose. |
| Depth as layering, not clutter | Floating search, glass nav, soft shadows, translucent badges on art. Elevation marks temporary vs durable (color and depth rules below). | Physicality without juice overload (juice adequacy). |

**Style preferences (adapt to the task)**

1. **Start from a calm field.** Prefer a near-black, soft light-gray, or gently tinted dark canvas. Let content provide saturation. Desaturate busy backgrounds (maps, photos behind chrome) so pins and cards win.
2. **Prefer a consistent, soft shape language.** Use the company's radius tokens and components. Rounded cards, pills, circles, or squircles suit this taste when appropriate. Tables, toolbars, and dense work surfaces may need straighter shapes; do not restyle every control solely to make it round.
3. **Give the primary subject appropriate prominence.** Discovery screens may feature a tall card or full-width artwork. Tables, settings, and comparison tasks may prioritize rows, forms, or a primary column. Make the main task easy to find without forcing a hero card or sacrificing useful density.
4. **Give the primary verb a clear button.** Prefer generous pill buttons when they fit the brand and task. Existing company buttons are equally valid. Secondary icon actions may use circular wells when their meaning is clear; use labels when needed. Keep the main action recognizable and easy to target.
5. **Overlay text on art with a legibility plan.** Title and short description live on a gradient or frosted bar at the bottom of the image. Small translucent badges (duration, "Major Update", "Challenge") sit in a corner. Do not sprinkle labels across the art.
6. **Prefer a restrained accent palette.** Use the brand accent to establish priority while keeping surrounding chrome quiet. Preserve distinct semantic colors for errors, warnings, success, and data when needed. Judge competing emphasis, not a fixed count of colored elements.
7. **Pair icon + label for destinations.** Bottom nav and choice rows show a simple glyph and a word. Playful or 3D icons are fine for *categories and features*; keep system nav glyphs simple and thick.
8. **Show selection by scale and border, not by noise.** Selected map pin grows and gains a clear border. Selected nav item gets a quiet pill behind it. Do not pulse, shake, or confetti routine selection.
9. **Keep frequent search easy to reach.** A visible search field or dedicated control can fit the task. A circular search control beside floating navigation is one reference pattern, not a required layout.
10. **Let empty and waiting stay honest.** Prefer a clear next action on empty (Discord Join / Create) over decorative voids. Loading must not impersonate richer content than will arrive (empty / loading).

**Treatments to avoid**

1. Do not decorate every row with unique illustration, gradient, and badge. Interest belongs on featured content; lists stay quieter.
2. Do not use tiny text links or icon-only glyphs as the only way to do the main job.
3. Do not mix sharp toolbars with soft cards on the same surface without a reason. One family of shapes.
4. Do not put equal visual weight on nav, filters, featured art, and five CTAs. Rank them (purpose / hierarchy).
5. Do not invent a new active-state language per screen.
6. Do not fill negative space with dividers, strokes, and nested cards. If Gestalt proximity already groups it, skip the box (space / Gestalt).
7. Do not confuse "game-like" with HUD clutter, XP bars, or badge walls. Game-like here means readable targets, clear feedback, and confident art, not gamification (no gamification).
8. Do not make calm by lowering contrast below readable levels. Black canvas still needs white primary text and visible focus (resilience / review).

**AI screen brief (fill before drawing)**

When generating or revising a screen for this taste, answer in one short pass:

1. **Purpose** of the screen (purpose / hierarchy).
2. **Primary subject:** what deserves emphasis, whether content, a form, a table, or another task surface.
3. **Chrome level:** how quiet is the background, nav, and chrome relative to content.
4. **Existing components and tokens:** which company patterns fit, including shape and target sizes.
5. **Primary verb** and its control placement.
6. **Secondary actions** and how their controls stay recognizable.
7. **Color roles:** where accent establishes priority and where semantic colors are needed.
8. **Tap test:** with a thumb-sized target overlay, does every important control clear house rule 3?
9. **Prediction test:** before interaction, can someone say what each major region does (readable situations)?
10. **Restraint and adaptation:** what decoration is unnecessary and which taste preferences need adapting to this task. Mark items that do not apply rather than inventing UI to satisfy the brief.

**How this guides AI.** Use this section plus the house rules to make generic "make it modern" requests concrete. Start with existing company components, then apply quiet chrome, generous targets, and content-led interest where the task supports them. Complete the brief in a short working note; it is not UI copy or an approval gate. Brandon's explicit feedback can update a preference without requiring new reference screens. When adding references, record what he likes and any limits on what to copy.

---

## Pattern library

Each pattern solves an observed problem and has a failure condition. Describe behavior before visuals.

| Pattern | Purpose | Apply when | Failure condition |
| --- | --- | --- | --- |
| Visible result | Makes the consequence inspectable | The operation changes an object or creates an artifact | The representation implies more certainty than exists |
| Local acknowledgment | Confirms receipt of input | Completion takes longer than immediate feedback | It is mistaken for completed work |
| Contextual choice | Reduces unnecessary searching | The current state suggests a few relevant alternatives | Alternatives are vague or artificially constrained |
| Stable anchor | Preserves orientation | Content grows, changes, or is refreshed | Stability prevents necessary information from appearing |
| Reversible exploration | Supports experimentation | The operation can truly be reversed | Undo has unclear scope or hidden limitations |
| Progressive detail | Keeps common paths readable | Specialized information is optional | Important consequences or frequent actions are buried |
| Settled completion | Creates a clear stopping point | The current intention is fulfilled | The product hides unresolved work |
| Proportionate emphasis | Helps notice significant events | A state change would otherwise be missed | Routine events continually demand attention |
| Preserved context | Reduces repeated effort | The person returns or recovers from interruption | Old state is restored despite changed circumstances |
| Whole-target control | Makes acquisition easy | A card, row, or chip has one primary action | Nested targets fight, or the whole surface looks passive |
| Endowed start | Shows progress already made | A multi-step goal has a real first step done | Artificial progress that the person can see through |
| Honest progress | Shows distance to a real endpoint | A bounded goal with a known total | A bar that fills without the goal advancing |
| Honest empty | Explains absence and the next useful step | A list, inbox, or panel has no items yet | Blank space that could mean loading or error |
| Structured wait | Shows hierarchy while work continues | Content-shaped load longer than about a second | Skeleton denser than the result, or fake progress |

## Tradeoffs

- **Minimalism versus discoverability.** Removing controls reduces clutter and increases uncertainty. Test whether people can find the action.
- **Guidance versus autonomy.** Recommendations help when they reduce real decision burden; they constrain when alternatives or basis are hidden.
- **Consistency versus context.** Same meaning beats identical geometry across unrelated tasks.
- **Immediate response versus honest status.** Optimistic UI must not fake durable completion.
- **Whitespace versus comparison.** Test density with realistic content.
- **Delight versus repetition.** Flourishes tire when frequent.
- **Challenge versus effort.** Keep the person's real challenge; cut interface-made difficulty.
- **Completion versus continued engagement.** Support exit as well as continuation.
- **Progress cues versus manipulation.** Show only real progress toward the person's goal. No points, badges, or streak pressure as engagement devices.

## Review kit

**Review contract** (before implementation):

- **Purpose:** the single user outcome this surface serves.
- **Primary read:** what the person should notice first.
- **Necessary support:** the actions and information required to use it correctly.
- **Optional depth:** what can wait and the labeled route to it.
- **State changes:** what takes priority during loading, action, success, and recovery.

**House-rules check** (realistic content, phone and desktop):

1. **Copy.** Is every label, heading, and message as short as it can be while naming the object and the outcome? Does anything restate what the screen shows?
2. **Recognizability.** Before clicking or hovering, can someone say what type of thing each component is, what it is for, and what they can do to it?
3. **Targets.** Is every clickable surface as large as the layout allows? If a card opens something, is the whole card the target? Do nested actions have their own large targets? Does anything rely on hover to be found?
4. **Hierarchy.** Can someone identify what the page, each section, and each component is for at first glance? Does the first thing they notice serve that purpose? Does every secondary element have a clear relationship to its parent? Are peers consistent without all competing for page-level attention?
5. **Simplification.** Does simplifying this surface reduce interpretation and effort, or merely hide controls?
6. **Conditions.** Do reading order, hierarchy, targets, and recovery survive phone widths, larger text, keyboard use, dark mode, and reduced motion?

**Accessibility as feel:**

- **Focus order** matches the reading and action order someone would expect.
- **Target size** meets the house rule and platform minima.
- **Contrast** keeps text and controls readable without relying on color alone.
- **Reduced motion** preserves state meaning through static cues.
- **Name and role** expose what each control is to assistive technology, matching the visible label.

**Quick craft scan:** first glance, hierarchy, typography, space, input tracking, continuity, timing, honest feedback, adaptation across conditions, restraint after the event.

---

## How to use this file

1. Read Experience statement, House rules, and Taste / styling before drawing.
2. Fill the **AI screen brief** inside Taste for every new screen.
3. Run the **Review kit** before calling a screen done.
4. Open [`game-feel-research.md`](./game-feel-research.md) only for evidence, history, or expanding a principle.

When Brandon adds reference screens, update the Taste reference set with what he likes and what should not transfer. Refine preferences from his explicit feedback as well as shared visual habits.
