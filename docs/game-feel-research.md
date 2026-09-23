# Game Feel Research Companion

Deep research, evidence, worked examples, and annotated sources behind the operational AI guide.

**Reference only.** This essay is not an AI rule set and is not required reading for design work.

**Humans:** this is the full essay. The slim guide is distilled from it.

---

# Game Feel for Digital Products

A useful digital product can borrow the qualities that make well-designed games feel clear, coherent, and satisfying: understandable situations, reliable controls, meaningful choices, visible consequences, and room to act. These qualities can live in a quiet, modern interface. They do not depend on a historical visual style, and they do not require points, badges, or streaks.

The central design objective is to help a person understand what matters, act with confidence, recognize the outcome, and decide what to do next. Sometimes the best next step is to leave the product because the work is complete.

This research companion connects game design, player-experience research, interaction design, behavioral science, and human-computer interaction research. Sourced observations carry numbered references. Product patterns, examples, design tests, and recommendations are a synthesis proposed here; they should be evaluated in the actual product with the actual audience. They are not a validated formula for engagement. The guide is product-agnostic. It uses one running example, a personal planning assistant with tasks, goals, and habits, because it exercises conversation, persistence, and progress at once; the examples are hypotheses to test, not prescriptions.

**Core rule: one purpose, ordered importance**

Every page, section, component, card, and control must have one clear user purpose that is understandable at first glance, before interaction or explanation. Its actions, information, and visual emphasis must support that purpose in a deliberate order. Each smaller part serves the purpose of its parent. Simplicity means the person can understand and accomplish that purpose with little interpretation or unnecessary effort. This is our design rule, informed by the research below, not a universal limit on the number of actions or data points. Section 7 applies it and gives the review checklist.

**An example experience statement**

People should feel oriented, capable, and unhurried. They should be able to predict the effect of an action, see the result, and continue (or stop) without wondering whether the system understood. A successful exchange leaves someone thinking: "I know what happened, I can change it, and I know where I stand." The intended feeling is calm confidence. A treatment that makes such a product feel more demanding, less predictable, or less honest about what it did is rejected on that basis, however attractive it is. Write your own statement before using the rest of this guide; every later test refers back to it.

**House rules**

Four rules apply to every surface. The rest of the guide is the reasoning and the evidence behind them.

1. **Copy is short and clear, always.** Lead with the outcome, name the object, cut everything that restates the screen. (Section 6.)
2. **A component is recognizable at a glance** as its type, its function, and its available actions, before any interaction or explanation. (Section 5.)
3. **Click areas are as large as possible.** Real buttons, sized for a finger. If a card opens something, the whole card is the target. (Section 9.)
4. **Clean hierarchy at every scale:** page, section, component. As simple as possible without losing function; simplification that only hides controls does not count. (Section 7.)

**Reading map**

| Part | Sections | Subject | Useful when |
| --- | --- | --- | --- |
| A. Foundations | 1–4 | Defining the feeling, what game feel is, why games are fun, what classic games teach | Establishing a design direction |
| B. Clarity | 5–10 | Readable situations, language, purpose and hierarchy, space, the laws of ease, learning that accumulates | Reviewing a screen |
| C. Action and feedback | 11–16 | Actions as commitments, the action loop and state vocabulary, fluidity, agency, resilience, motion and sound | Specifying an interaction across states |
| D. Motivation and rhythm | 17–20 | Motivation, progress psychology, the evidence on rewards, rhythm and closure | Improving the complete experience |
| E. Craft | 21–26 | What strong interfaces share, taste/styling north star, typography, color and depth, control craft, navigation, game UI case studies, AI and uncertainty | Refining the visible and interactive layer |
| F. Applying it | 27–31 | Worked examples (including an assistant's chat), the pattern library, tradeoffs, process and the review kit, evaluation | Turning principles into decisions and testing them |
| Sources | | Annotated references | Checking evidence or studying further |

If you only have five minutes, read the house rules, the experience statement, the Taste and styling north star in Part E, section 7, section 12, and the review kit in section 30.

## Part A. Foundations

**1. Define the feeling before the appearance**

"Make it feel like a game" is too broad to guide implementation. Games can feel tense, meditative, competitive, exploratory, methodical, or chaotic. A team needs to name the specific experience it wants before choosing techniques associated with games. The example statement above describes a calm assistant; another product might emphasize expressive experimentation or the satisfaction of mastering a sophisticated tool. Those intentions lead to different interfaces.

The MDA framework distinguishes mechanics (the rules and operations available), dynamics (the behavior that emerges during interaction), and aesthetics (the intended emotional responses, including experiences such as discovery and expression, well beyond the visual layer).[1] It lets a team work backward from the intended experience to the interaction that produces it.

Example: in a photo editor, reversible adjustments are a mechanic. They enable repeated comparison and experimentation, a dynamic. The resulting feeling may be creative confidence. A spring animation on the adjustment panel does little if previewing is slow or reverting is unreliable.

For a planning assistant, the existing mechanics include sending a request, accepting a suggestion, opening a task, completing an item, checking a habit, stopping a reply, and undoing a change. The design question is how these operations work together over a session. A decorative treatment on the controls cannot answer that question by itself.

Use the experience statement to reject treatments. If a proposed element makes a calm product feel more demanding, or a precise tool feel less predictable, visual polish alone is insufficient justification.

**2. Game feel has several ingredients**

Steve Swink, who gave the term its standard definition, describes game feel as real-time control of virtual objects in a simulated space, with interactions emphasized by polish. Responsiveness, a coherent simulated space, and polish effects are separate ingredients, and the first two carry most of the weight.[44] Pichlmair and Johansen's later survey of more than 200 academic and practitioner sources organizes the field into physicality (coherent, predictable behavior), amplification (emphasis that communicates events and their importance), and support (accommodation of the player's intention).[2] Both are correctives to equating game feel with effects.

In a product, physicality can be modest: a dragged item stays attached to the pointer, a panel has a predictable origin, a slider produces a continuous response. Amplification can be a restrained state change that makes a completed operation unmistakable. Support can be draft preservation, reliable recovery, or selection behavior that matches what the person meant to select. In an assistant, predictable control behavior, accurate feedback, and recovery from mistakes matter more than apparent weight or elasticity.

Treat these as lenses rather than a requirement to implement all three equally. An operational dashboard may need clear state and predictable controls with very little motion. A drawing tool may depend heavily on direct manipulation. An educational app may benefit most from readable consequences and useful error feedback.

Two timing questions stay separate throughout this guide. Did the interface acknowledge the action? Did the requested operation finish? A chat can acknowledge Send promptly even when the answer takes several seconds. A transition that suggests a task was saved before the server confirms it undermines the clarity the design is meant to create.

Three layers of quality should be reviewed separately:

| Layer | Core question | Typical failure |
| --- | --- | --- |
| Functional reliability | Did the intended operation happen correctly? | The result is wrong or lost |
| Interaction legibility | Can the person understand and control what happened? | The system works but feels uncertain |
| Expressive polish | Does the treatment reinforce the intended feeling? | Attractive effects distract or slow the action |

A failure at the first two cannot be repaired by ornament. This ordering is a prioritization recommendation, not a quantitative model.

Amplification clarifies importance; it is not decoration piled on every event. Pichlmair and Johansen treat amplification as emphasis that communicates events and their relative weight.[2] Hicks and colleagues' framework for juicy design, grounded in developer interviews, similarly asks whether feedback matches the significance of the game state change rather than maximizing audiovisual volume for its own sake.[76] Empirical work on visual embellishments finds improved visual appeal with only context-specific gains for competence, so juice is not a reliable substitute for clear control and honest state.[77]

**Synthesis for products.** Prefer one unmistakable state change on the affected object over equal juice on unequal events. A routine save, a consequential delete, and a failed write must not share the same celebration budget; identical emphasis destroys hierarchy. When amplification and the object disagree, believe the object.


**3. Why games are fun: the research, and what transfers**

Research checked September 14, 2026. Before the game-feel literature, there was a body of work asking directly what makes interactive systems enjoyable. Much of it was written about software, not only games. This section summarizes the frameworks that recur, what each claims, and what transfers to a calm, purposeful product.

| Framework | Core claim | What transfers to a calm product |
| --- | --- | --- |
| Malone's heuristics (1980, 1982) [45] | Enjoyable interfaces provide challenge (clear goals with uncertain outcomes), fantasy (a frame that makes the activity meaningful), and curiosity (sensory and cognitive novelty at the right level). His 1982 paper applied this explicitly to user interfaces. | Clear goals with visible outcomes; enough novelty to invite inspection, never so much that it obscures state. |
| Malone and Lepper's taxonomy (1987) [46] | Intrinsic motivation comes from challenge, curiosity, control, and fantasy, plus interpersonal motivations: cooperation, competition, recognition. | Control and challenge are the two a productivity tool can honestly offer: the person directs the plan and the real challenge is their own work. |
| Csikszentmihalyi's flow (1990); Chen (2007) [47] | Deep enjoyment occurs when challenge matches skill, goals are clear, and feedback is immediate. Chen applied this to games by letting players adjust difficulty inside play. | Immediate feedback and clear goals are design work. Matching challenge means not overloading a person's day and not trivializing it. |
| Koster, A Theory of Fun (2004) [48] | Fun is the brain's response to learning and mastering patterns; a game stops being fun when nothing remains to learn or when the pattern is unlearnable noise. | Transferable rules across screens (section 10). A product that gets easier with use keeps rewarding attention. |
| Lazzaro's Four Keys (2004) [49] | From an observational study of 30 players: hard fun (challenge and mastery), easy fun (curiosity and exploration), altered states (playing to change one's mood or state, later renamed serious fun), and the people factor (social play). Best sellers hit at least three. | A purposeful tool is serious fun: the person uses it to change their real state. Design for the satisfaction of work that went as intended, not for hard fun. |
| Cook's skill atoms (2007); Deterding's gameful design (2015) [50] | Learning happens in loops of action, simulation, feedback, and model update. Deterding's method finds the real skill in an activity and designs challenge and feedback around it, rather than adding elements on top. | Find the actual loops (section 12) and make their feedback complete before adding anything. |
| Meier's interesting decisions (2012) [51] | A game is a series of interesting decisions: options that differ, tradeoffs the player understands, outcomes that depend on the choice. | The test for every choice the product offers (sections 11 and 14). |
| Crawford's interactivity (2002) [52] | Interactivity is a cyclic conversation: each side listens, thinks, and speaks. Quality depends on the weakest of the three. | An assistant that listens well but shows its result poorly is not interactive; it is a form. |
| Funology (2003); Carroll and Thomas (1988) [53] | Enjoyment in non-game software is a legitimate design goal, distinct from usability, and depends on meaning and emotion, not only efficiency. | Efficiency and calm are not opposites of enjoyment; in a purposeful tool they are its form. |
| Schell's lenses (2008) [54] | A game is examined through many questions ("lenses") rather than one theory: the lens of the essential experience, of surprise, of the problem, of feedback. | The review kit in section 30 is a small set of lenses for product surfaces. |

Two cautions apply. First, these frameworks were mostly built by observation and practice; the empirical support behind each varies (flow and the motivation work are the best studied). Second, most were written about entertainment, where the activity is its own purpose. A purposeful product is used to get real work done. The parts that transfer are the ones about clear goals, immediate feedback, learnable rules, real choices, and control. The parts that do not transfer are manufactured challenge, manufactured curiosity, and fantasy framing, all of which would compete with the person's actual purpose.

The product interpretation is short. Fun, in a tool like this, is the feeling of competence: the person expressed an intention in ordinary language, the system understood, the result is visible, and the day is more in hand than it was. Every section that follows is a way to produce that feeling reliably.

**4. What classic and modern games teach, and what survives modernization**

Classic games are useful case studies because a small set of actions has recognizable consequences. Their age is not evidence of universal usability. Study their mechanics individually, with attention to the constraints they served. Each lesson below ends with its translation to the running example.

**Super Mario Bros.: learning through consequence.** In Nintendo's creator interview, Miyamoto describes teaching the difference between a Goomba and a beneficial mushroom through the placement and movement of the opening encounters, refined through repeated trial and error during development.[3] The product lesson is to make the first useful action explain something real about the system. A successful import, edit, or saved item can teach more than a tour of menus. The limit matters too: a game controls the initial encounter closely and has few verbs. Natural-language requests are much broader, so where a request has consequential ambiguity, concise clarification is part of good control. Place explanation where it helps someone decide. For an assistant, the first successful task request should make the created task recognizable and accessible, so the person connects their words to the outcome without learning internal terminology.

**Tetris: the outcome changes the problem visibly.** The official description establishes the core of arranging falling pieces and clearing completed rows.[4] The design interpretation is that a successful placement visibly reorganizes the problem; the changed board is itself the evidence. An interface can borrow this by showing a transformed artifact: a reorganized list, a corrected record, an updated document. For an assistant, that is the task with its new date, the chosen plan reflected in the relevant items, or a completion state updating in place. "Done" is useful when its object is obvious. The rising pressure and survival structure of Tetris do not transfer; a planning product should help a person understand the day they have, not make unfinished obligations feel like an accelerating threat.

**Zelda: consistent expectations create trust.** Miyamoto's discussion of Twilight Princess emphasizes meeting player expectations, avoiding experiences that feel unfair or misleading, and evaluating the game from the player's perspective.[5] For software, consistency means the same action has the same scope, important states remain distinguishable, and the path back works as expected. For an assistant, proposed and persisted items must remain distinguishable. If two items look identical but one exists in the task list and the other is a suggestion, visual simplicity has concealed an important difference. Conversational phrasing can vary while the meaning of "saved," "suggested," and "completed" stays fixed.

**Mini Metro: restraint can support engagement.** Jamie Churchman's GDC description frames the game around intrinsic reward, a robust visual language, and design through elimination, and questions the assumption that a game needs more notifications, collectibles, and attention-grabbing effects to engage.[6] The developer describes drawing and revising routes in a transit-map representation.[7] The lesson is coherence: the map is both the thing being understood and the thing being changed. For a task list, a task representation should carry the information needed to recognize and act on it; supporting text explains the decision without repeating every visible field; the space between an explanation, its resulting item, and its recovery control makes their relationship clear. This does not mean copying Mini Metro's diagrams or palette.

**Celeste: support intention at the point of action.** Maddy Thorson documents jump buffering, a brief window to jump after leaving a ledge, and corner corrections.[8] The translation is to accommodate small interaction imperfections without changing the person's intended outcome: preserve drafts, prevent accidental duplicate submission, keep scroll position useful, make Stop reliable, accept reasonable input forms, and avoid unnecessary precision demands. The boundary: movement forgiveness helps execute an already clear intention. An assistant must not use "helpfulness" to justify guessing consequential dates or changes. Support the expressed intention and make uncertain interpretation visible.

**Plants vs. Zombies: teach with play, not text.** George Fan's GDC talk lays out ten rules for tutorials: blend the tutorial into the game, have the player do rather than read, spread out the teaching, get them to do it once, use fewer words (at most eight on screen at a time), keep messaging unobtrusive and adaptive, avoid noise, teach with visuals (each plant's look conveys its function), and build on what people already know.[69] For a product, the equivalent is teaching through a real first action in real content rather than a tour, and introducing one new idea at a time as it becomes relevant.

Across these examples, the reusable principles are clear feedback, coherent rules, interpretable state, useful support, and teaching through consequence. Pixel fonts, bevels, screen shake, and collectible systems are separate stylistic or mechanical choices that require their own rationale.

## Part B. Clarity

**5. Design a readable situation**

Before deciding how to animate or decorate a screen, determine what situation it presents. A person should be able to answer five questions at the level of detail their task requires:

1. Where am I, and what am I looking at?
2. What is the current state?
3. What can I do here?
4. What would that action affect?
5. What would count as a useful result?

These questions are a review method, particularly for interfaces that look polished but feel vague. A row of attractive icons may fail question three. A generic "Apply" button may fail question four. A dashboard full of numbers may fail question five.

**A component must be recognizable as its type, its function, and its actions at a glance.** Don Norman's discussion of signifiers emphasizes that people need perceptible clues about a product's purpose, current behavior, and available actions.[9] Nielsen Norman Group's eye-tracking experiment found that weak clickability cues increased search effort in the tested tasks; the authors caution that the measured task-time increase is not the same as a whole-workflow slowdown.[25] In games this is called readability: League's clarity work keeps a recognizable primary silhouette across every skin so a player identifies the champion and its threat instantly.[40] The product rule is the same. A card looks like a card, a button looks like a button, a link looks like a link, a checkbox looks like something you check. A task card is recognizable as a task before the title is read: its shape, its check control, and its date badge are the silhouette. Do not make people learn that a plain word is a button or that a card is passive here and clickable there.

Give the present task an obvious center of attention. This is not a universal instruction to allow only one action. A comparison tool needs several alternatives visible together; a spreadsheet needs substantial working context. The design should make the current mode and relevant relationships clear even when several operations are available.

Readability also requires stable meaning. If an accent color sometimes indicates selection, sometimes success, and sometimes decoration, it becomes less useful as a cue. Define what major treatments mean and reuse them (the state vocabulary in section 12). Reserve exceptions for situations where the change in meaning is itself apparent.

**6. Language: short, clear, no bloat**

Simplicity is the amount of interpretation required, and words are the most common place interpretation piles up. Every label, heading, reply, and confirmation should answer one of four questions: What is this? What happened? What can I do? What needs my attention? Text that answers none of them needs a specific reason to remain.

Rules for copy, derived from the readability and recognition research above and from the product's voice:

- **Lead with the outcome.** Someone who asked to move a task needs the affected task and the resulting date first. Warmth follows the fact, not the other way round.
- **Name the object and the scope.** "Archived 3 messages" beats "Done". "Move to Friday" beats "Continue".
- **One idea per line.** A label is one noun phrase. A button is one verb, or verb plus object when the object is ambiguous. A confirmation is one sentence.
- **Say what the system knows, not more.** "Saving" is not "Saved". "Here is a draft" is not "Sent".
- **Cut the connective tissue.** No "please note", no "simply", no "in order to", no restating what the screen already shows. Advice attached to a reply must have a distinct purpose rather than automatically expanding every response into another decision.
- **Consistent words for consistent things.** One verb per operation across the product. "Complete" is not also "finish" and "check off" in different screens.
- **Errors name the object and the remaining action.** "Three files uploaded; two need another attempt" establishes a useful situation; "Unable to complete request" does not (section 15).

Length is a symptom, not the rule. A two-line label that prevents a wrong click is shorter, in total effort, than a one-word label that requires a guess.

**7. Purpose and hierarchy at every scale**

Research checked September 13, 2026. This section turns the core rule into a working method for whole pages and their parts. The hierarchy model, the progress-page example, and acceptance checks are our synthesis.

**What game and app designers say**

| Source | Documented guidance | What we take from it |
| --- | --- | --- |
| Apple, Principles of Great Design, WWDC26 [38] | Begin with purpose. Order, spacing, and contrast establish clarity. A minimal surface can be difficult if it buries functionality; added context can make an interface simpler. | Write the purpose before choosing the layout. Judge simplicity by the effort to understand and use it. |
| Nielsen Norman Group, Visual Hierarchy [10] | Visual hierarchy organizes elements by intended importance through scale, contrast, and grouping. | Decide importance before assigning visual weight. |
| Nielsen Norman Group, Progressive Disclosure [18] | Keep frequently needed options on the initial surface, with specialized options behind an obvious, labeled route. | Reveal optional depth while preserving what the current decision needs. |
| Linear, design refresh, March 2026 [28] | Preserve information density while reducing competition from supporting UI: quieter navigation, pruned icon treatments and separators, consistent header actions. First-party account of intent, not a usability measurement. | Assign emphasis by current usefulness. Once a person reaches the workspace, navigation need not stay the most prominent object. |
| Riot, Spirit Blossom interface design [39] | Runeterra's visual designer arranges foreground and background according to the information players need, including a reward-progress tracker. | Composition follows information needs. Theme and ornament serve that composition. |
| Riot, Clarity in League [40] | "The amount of attention an ability grabs should match its level of importance." Hierarchy applies within a champion's abilities and across the whole scene. | Review each component's emphasis in the context of its parent. Gameplay analogy, not direct evidence about menus. |
| Roblox Creator Hub, UI and UX Design [41] | Prioritize information around the player's current activity, decisions, and frequency of use. In Super Striker League, available actions change with ball possession. | Define hierarchy for each interaction state while keeping the interface predictable. |

These sources support purposeful prioritization. They do not establish that every screen must contain exactly one button, that three visual levels always suffice, or that lower density always improves usability.

**Start with a purpose that can exclude things**

Complete this sentence before designing a surface: "This helps the person ___." Use a concrete outcome: choose a task, understand this week's progress, record today's practice, change a date. "Show data," "provide a dashboard," and "manage everything" are too broad to decide what belongs.

Then identify the main question the surface answers and the useful state in which the person can leave it. A progress summary succeeds when someone understands what changed. It does not need a prominent action merely to satisfy a button convention.

An element earns its place by contributing to that purpose: identifying the subject, enabling an action, informing a decision, confirming a result, or providing relevant context and access to depth. An unrelated function belongs elsewhere. If two independent purposes both need to dominate, separate them into clear destinations or modes.

**Repeat the rule through the structure**

| Scale | Purpose in a personal progress page | What its children contribute |
| --- | --- | --- |
| Page | Understand and support progress toward what matters to me | A brief overview, active goals, and evidence of progress |
| Section: goals | Find the goal I want to continue | Goal identities, meaningful current states, and access to the next step |
| Component: habit card | Understand and record today's practice for this habit | Title, weekly context, today's state, and check/undo |
| Control: check | Record one specific day for this habit | A clear target, saving state, confirmed result, and reversal |
| Supporting data: weekly count | Explain consistency against the chosen target | A labeled count and period, without implying a different kind of achievement |

Each level has its own emphasis but stays subordinate to the larger composition. Giving every card a large headline, saturated action, decorative icon, and animated statistic produces many competing focal points. Repeated rows should read as a coherent group with a predictable local action. Selection can give one row stronger emphasis when the person starts working on it.

**Rank UI and data together**

| Priority | Role | Treatment |
| --- | --- | --- |
| Primary | The subject, decision, or result that fulfills the surface's purpose | First in the useful reading order; strongest relevant emphasis |
| Supporting | Information and frequent actions needed to understand or act correctly | Adjacent, readable, directly available |
| Contextual | Helpful explanation, history, less common alternatives | Lower emphasis or an obvious expansion |
| Peripheral | Administration and unrelated destinations | Stable navigation or a separate surface |

This is a ranking exercise, not a required four-layer layout. A small component may need only two levels. A dense comparison may need several equally prominent values because comparing them is the purpose.

Data can be primary. On a progress card, "4 of 12 books" can deserve more attention than Edit. On an error state, what failed and how to recover outranks the usual progress display. A field's availability in the database is not a reason to display it. For every displayed number, identify its question, unit, period, and interpretation, and keep the context that prevents misunderstanding beside it. Do not merge tasks, habits, and moments into a single progress score without a meaningful model. Avoid repeating the same statistic across the profile, summary, and cards unless each occurrence supports a distinct decision.

**Emphasis follows user consequence**

Riot's clarity article considers damage, loss of control, dodgeability, and impact on play when deciding how much attention an ability may claim. Arcane Comet illustrates a mismatch: its ground circle suggests more opportunity to dodge than the mechanic provides. The article also describes a shared allowance for visual and audio elaboration.[40] This gives two separate questions: is the signal noticeable enough, and does its treatment create the right expectation? An obvious control can still communicate the wrong scope.

| Documented Riot example | Design interpretation for a product |
| --- | --- |
| VALORANT 0.49 makes ping elements fade under player aim.[42] | Supporting information yields when it obstructs the current action. A floating notification must not cover the control someone is using. |
| The same update prevents a late Spike Planted announcement from hiding the round-end announcement.[42] | A settled outcome takes precedence over an obsolete intermediate event. A saved result should not be covered by a delayed loading message. |
| Find Match and Practice move from the social panel to the Play screen; the settings crosshair preview shrinks to leave room for controls.[42] | Put actions with the purpose they serve. Size previews and summaries around the work people need to perform. |
| VALORANT 11.00 adds Spike pickup feedback, makes some effects resolve sooner and occupy less space, and adjusts audio priority so a relevant cue stays audible.[43] | Improve missing feedback locally, then reduce competing feedback. More clarity can require both adding and subtracting emphasis. |
| Runeterra's reward tracker arranges information for player relevance, then adapts the visual theme to it.[39] | Start with the information relationship, then express the brand through it. Decorative assets should not determine which information leads. |

Patch notes document changes and stated intent, not measured usability gains. Gameplay examples involve competitive pressure; a product's application should preserve calmness and freedom to stop.

**The importance test.** Before giving an element prominent color, size, elevation, or motion, ask:

- **Relevance:** Does it serve the person's current purpose?
- **Consequence:** What would they misunderstand or miss if it were less noticeable?
- **Timeliness:** Do they need it now, while choosing, or only when inspecting details?
- **Usefulness:** Can they act on it, or does it clarify a result they need to understand?
- **Frequency:** Is it needed often enough to remain directly available?

Rank elements relative to their neighbors. Do not invent a numerical score. A useful comparison is: "This failed check-in deserves more emphasis than the monthly total because the person needs to know today's action was not saved." The product's desire to promote a feature does not establish user importance. The person's chosen goal outranks a badge target or an invitation to explore another feature. Completed work can be the endpoint.

**Local importance must fit the whole page.** A component can be clear in isolation and still overwhelm the page when repeated. Inspect the fully populated screen, including navigation, banners, tooltips, and overlays. A secondary action inside each of eight cards should not receive eight competing versions of the page's strongest treatment. When adding a stronger signal, identify which existing signal becomes quieter, shorter, or unnecessary. Keep conventional placements stable so improving hierarchy does not create a moving target. A useful exercise: mark every element that attracts attention and write why it deserves attention in the current state. If the justification is "brand" or "visual interest" for many unrelated elements, the hierarchy is weak. If every functional element is equally subdued, the screen is hard to operate.

**Translate importance into layout**

First choose content order and grouping. Put the relevant work early, align related elements, and keep a label, its value, and its action together. Use larger gaps between changes of purpose than between parts of the same thought. Add an enclosing surface when it clarifies a group or an interaction boundary.

Then assign text roles, surface treatments, and color. A heading identifies a group; a title identifies an object; a value conveys state; metadata supplies context. Reuse those roles across peers. Use the design system's tokens (radius, shadow, spacing, type) rather than ad hoc values, so peers stay consistent by construction. Preserve semantic color meanings and visible keyboard focus.

Finally consider motion. A change in state can briefly draw attention to the affected object. A resting secondary element should not keep competing through pulses or repeated entrances. Lower visual priority must never mean unreadable text, undersized targets, or essential information available only on hover.

**Keep purpose stable while state changes**

| Progress-page state | What should lead locally | What should remain supporting |
| --- | --- | --- |
| Browsing goals | Goal identity and meaningful progress | Administration, longer history, badge progress |
| Checking a habit | The selected check and honest saving state | The rest of the weekly summary and neighboring cards |
| Save confirmed | Updated day and count, with available undo | A brief acknowledgment that settles without blocking the page |
| Save failed | What was not saved and how to recover | Success styling and unrelated prompts stay out of the way |
| Reviewing a goal | The evidence and decision being reviewed | Background page controls and unrelated recommendations |
| Returning later | The current persisted state | Past confirmation effects do not replay as new events |

For a habit card, the purpose stays the same through ready, saving, confirmed, and failed. Update the information in place; changing emphasis does not require moving the card. On a small screen, preserve the decision and its necessary context before moving optional depth behind disclosure. On desktop, extra width can support comparison; it does not justify unrelated statistics. Text enlargement, keyboard order, and screen-reader order preserve the same relationships.

**Applying this to a progress page.** The page purpose is personal progress. Identity orients; a weekly summary gives an overview; active goals are the main working area; recent wins supply evidence; any recognition (badges, milestones) is optional and last. That makes the summary's size a decision to test: if it pushes the goal someone came to check below the first screen, reduce its height or move history into an expansion. For a target goal, lead with the goal and meaningful progress, then its next milestone or action. For a habit, keep today's check and weekly context together. For a reflective goal, let the person's recorded experience and the entry action define the card. Preserve a family resemblance while letting different purposes determine content.

The review contract for this section is in section 30.

**8. Make space communicate structure**

Space has several jobs: grouping related content, separating different decisions, protecting reading, giving important elements room to stand out, and providing physical room for accurate interaction. These overlap but should not collapse into "increase padding."

Nielsen Norman Group describes proximity and whitespace as ways to establish grouping and emphasis, with enclosure useful when grouping alone is insufficient and clutter-adding when it is not.[10] Its form-design guidance shows why a label should stay closer to its control than to unrelated controls.[11]

A useful spatial model has three scales. Within a component, space connects a label, value, and local action. Between components, it organizes a group that serves one decision. Between groups, it marks a change in subject or task. Measurements follow the product's typography, density, and input mode, through the design system's spacing scale.

Name the Gestalt cues that already do this work before adding chrome. Nielsen Norman Group's summaries of proximity, similarity, continuation, and common region are the practical vocabulary:[80][81][82] items near each other read as related; shared color, shape, or typeface implies membership; the eye follows alignment and smooth sequences; a boundary or container groups what sits inside it. Common region is strong enough to override weaker spacing, so borders and cards should be reserved for when proximity alone is insufficient.

**Synthesis.** Ask which Gestalt cue already carries the relationship. If spacing and alignment suffice, a box or divider is ornament. If the cue is wrong (equal gaps between unequal groups, similar treatment for unrelated controls), fix the cue before decorating.


Consider an export panel. File name, format, and destination belong to one preparation group. The export action clearly relates to that group. A completed file and its download control form a result group. A support link stays available at lower prominence. Identical spacing between every element obscures those relationships. In chat, spacing should distinguish the reply's central idea, any resulting objects, and the next available action; a recovery control belongs near the change it reverses; history belongs to the conversation without matching the weight of the current decision.

Whitespace becomes counterproductive when it separates evidence that must be compared, forces scrolling between a label and its control, or pushes the primary action out of reach. A dense table can be clearer than widely spaced cards when the task is comparing rows. Density and clarity are separate variables.

| Form | What it provides | What to check |
| --- | --- | --- |
| Visual space | Grouping and separation | Can relationships be read without extra boxes? |
| Interaction space | Room to point, tap, select, and scroll | Can the intended control be acquired comfortably? |
| Temporal space | Time to understand before the next demand | Does the result settle before another prompt appears? |

The third form is often overlooked. A product can have generous margins and still feel crowded if it constantly introduces new prompts. A settled state is part of a spacious experience.

Review with real content at phone width: long task names, several resulting items, and an open keyboard are better stress tests than an attractive empty screen.

**9. The laws of ease: targets, choices, and time**

Research checked September 14, 2026. A handful of quantitative results from HCI explain most of what "easy to use" means mechanically. They are the evidence behind the house rule that click areas are as large as possible.

**Fitts's law: bigger and closer is faster.** Fitts showed that the time to acquire a target grows with the distance to it and shrinks with its width, on a logarithmic scale.[55] MacKenzie's review established it as a reliable design tool for pointing devices.[55] The design consequences:

- **Make the whole card the target.** If a card opens something, the entire card is clickable, not a title link inside it. Secondary actions inside the card (check, menu) are their own large targets and stop propagation.
- **Make buttons real buttons,** sized for a finger, with the label inside the hit area. Text links are for navigation inside prose, not for primary actions.
- **Put frequent actions where the pointer already is.** A check control belongs at the row's edge where the thumb rests, not inside a hover menu.
- **Edges and corners are effectively infinite targets** on desktop; the composer and primary navigation can use them.
- **Meet the minimum.** WCAG 2.2 sets target size requirements and pointer alternatives to dragging;[23] Apple's guidance is 44 by 44 points and Google's 48 by 48 dp. Use the token-defined control height and never shrink a target to make a resting screenshot sparser.

**Hick's law: fewer distinct choices are decided faster.** Hick and Hyman found that choice reaction time grows with the log of the number of equally likely alternatives.[56] This supports offering a small number of relevant alternatives rather than a menu of every possible action, and grouping long lists into recognizable categories. It is not a rule to show one button: it applies to unfamiliar, equally likely choices, and a practiced person scanning a familiar list is not in that condition.

**Response-time limits.** Miller's 1968 analysis, Card, Moran, and Newell's model, and Nielsen's summary converge on three thresholds: about 0.1 seconds feels instantaneous, about 1 second keeps the person's flow of thought unbroken though the delay is noticed, and about 10 seconds is the limit for keeping attention on the task, after which the interface must show progress and let the person do something else.[57] For an assistant: a press reacts within the first threshold, an accepted request shows local acknowledgment within the second, and a reply that runs longer streams visible progress and keeps Stop available.

**Cognitive load.** Sweller's cognitive load theory distinguishes load intrinsic to the task from extraneous load imposed by presentation; design reduces the second.[58] Miller's "seven, plus or minus two" concerns short-term memory chunks, not how many items a screen may show; Cowan's later estimate is closer to four.[59] The usable rule: never make someone hold information in their head across screens. Keep the label next to the value, the undo next to the change, the count next to the action it scopes.

**Recognition over recall.** Nielsen Norman Group recommends visible cues and contextual support that reduce memory demands, especially in products used intermittently.[17] Progressive disclosure defers specialized options while keeping common actions available; staged disclosure splits a task into sequential steps. They solve different problems: hiding an advanced setting can simplify a common task, while splitting a simple edit across mandatory screens makes it slower.[18]

**10. Make learning accumulate**

A satisfying product becomes easier to use as someone gains familiarity. That requires transferable rules: the same selection pattern, the same way to preview, consistent keyboard behavior, and predictable meanings for completion states. Koster's account of fun as pattern mastery (section 3) is the reason this matters emotionally as well as practically: a product whose rules transfer keeps rewarding attention; one whose rules change per screen keeps demanding it.

Introduce complexity when it has a purpose. In an editor, basic formatting is directly available while advanced typography appears on request. In an analytics product, a clear initial chart exposes grouping and filtering when needed. Neither approach should conceal essential context or material limitations.

Mastery should reduce effort without invalidating the beginner's model. Keyboard shortcuts accelerate the same operations available through visible controls. Batch actions apply a familiar operation at a larger scope. A feature that behaves differently in an expert mode makes the mode change clear.

The relevant challenge is the user's real task: composing a strong document, understanding a dataset, planning a day. Difficulty operating the interface is not a substitute for that challenge.

People build mental models from repeated patterns: what a control means, where related things live, and what happens after a commitment. Consistency protects that model. Nielsen's consistency heuristic distinguishes staying consistent within the product (internal), with platform and industry conventions (external), and in visual language (aesthetic).[91] Break external consistency only when the clarity gain is large, the new pattern is taught once in context, and the old expectation would lead to a costly error. Aesthetic consistency without behavioral consistency is costume.

## Part C. Action and feedback

**11. Define actions as understandable commitments**

An action has a target, scope, commitment, and consequence. Those properties should be legible before the person activates a consequential control.

"Save" may mean saving a draft, updating a shared record, or publishing. "Remove" may mean removing from a view or deleting data. "Continue" may reveal another page or start an operation. The control's wording and context resolve such differences (section 6).

A useful action specification: "When the person does X, the system changes Y, within scope Z, and confirms the result through W." If the team cannot complete this sentence, styling should wait. Example: "When the person selects Archive, the system moves the selected messages out of the inbox, leaves them searchable, and confirms the affected count with an available recovery action."

Choices should express actual differences. Two buttons that lead to the same behavior under different labels create the appearance of choice. Different commitments hidden behind one vague control create uncertainty. Sid Meier's definition of a game as a series of interesting decisions is a useful bar: a decision is interesting when the options differ, the tradeoff is understandable, and the outcome depends on the choice.[51] A choice that fails those tests is a delay, not agency.

Use friction in proportion to consequences. A reversible local formatting change is immediate. An action that sends information externally may require review. The desired game-like quality is confidence in the rules, not indiscriminate speed.

**12. Close the action loop and keep one state vocabulary**

The product loop is: understand the situation, choose, act, perceive the response, update one's understanding. It follows Daniel Cook's model of learning through action, simulation, feedback, and model formation,[12] and Chris Crawford's definition of interactivity as a cyclic conversation in which each side listens, thinks, and speaks.[52] A loop breaks when the action is hard to find, when the system reacts without showing the consequence, when the outcome is disconnected from the action, or when the person cannot tell whether the result is final.

Nielsen Norman Group's system-status guidance supports timely feedback that makes state understandable.[13] Separate immediate acknowledgment from completion. Pressing Import can immediately confirm that the request was accepted. "Imported 42 records" waits until that outcome is known.

**States of an asynchronous operation**

| State | Meaning to communicate | Appropriate evidence |
| --- | --- | --- |
| Ready | An action is available | Clear control and relevant context |
| Accepted | The input was received | Immediate local acknowledgment |
| Working | The operation remains active | Honest status and appropriate control |
| Completed | The requested outcome is confirmed | Changed artifact or explicit result |
| Partially completed | Some intended changes happened | Exact scope of success and remaining work |
| Failed | The intended outcome was not achieved | Understandable cause and recovery path |
| Unknown | Completion cannot yet be established | Verification or reconciliation, without false certainty |

The unknown state matters in connected products. A request can reach the server even when the client loses the response. Blind retry can create duplicates. Good design makes uncertainty manageable rather than pretending it is simple failure.

**The state vocabulary.** Define these meanings once and give each a stable treatment across the product. A pressed control is not a selected control; an operation in progress is not a completed one.

| State or event | Primary meaning | Suitable treatment to explore | Common misuse |
| --- | --- | --- | --- |
| Focus | Keyboard input is directed here | Clear outline or equivalent focus indicator | Styling it identically to persistent selection |
| Selection | This object is the current target | Stable fill, marker, or border | Repeated pulsing after selection settles |
| Press | Input is being acknowledged | Brief local response | Implying the operation has finished |
| Working | Completion remains pending | Honest status near the affected area | Fake percentages or decorative certainty |
| Confirmation | A real outcome is established | Updated object and concise acknowledgment | Celebration without showing the result |
| Failure | The intended result is incomplete | Specific explanation and recovery | Only changing color or shaking the screen |

**Controls are small state machines.** Dan Saffer's microinteractions frame a control as trigger, rules, feedback, and loops or modes: what starts it, what it may do, how it shows status, and whether it repeats or changes the default behavior.[78] Material Design 3 lists interaction states such as enabled, disabled, hover, focus, pressed, and dragged as a coherent set rather than isolated styles.[79] Map those interaction states onto the operation vocabulary above (Ready, Accepted, Working, Completed, Failed, Unknown) so a pressed look never impersonates completion, and a disabled look never pretends the action is available. Modes need an obvious exit; a sticky mode without a clear way out breaks the loop.

**Synthesis.** Name Idle, Armed, Working, Succeeded, Failed, and Disabled for each consequential control before inventing polish. If the team cannot say which state the person is in, motion and color will not repair the ambiguity.

Where possible, make the changed object the primary evidence. A transient toast can supplement it but must not be the only way to discover what changed. Consider "Move my dentist task to Friday." A clear interaction acknowledges the request, keeps its context, then shows the confirmed task and resolved date with undo attached to that change. If saving fails, the interface says the update was not confirmed and preserves enough context to recover. A copy confirmation can be tiny; a rescheduled task needs enough detail to verify the date; several changes need a concise account of scope. An advisory answer needs a different ending: if the assistant only explained a possible plan, nothing may imply tasks were created.

Sound and haptics, where supported, reinforce the same vocabulary. A brief tactile response can acknowledge a discrete event; its meaning must agree with the visible state and survive being disabled. Depth communicates relationship: a temporary overlay is visually separated because it sits above the current context; a selected row uses contrast without pretending to be a physical block; repeated shadows across unrelated elements obscure which layer is active.

**13. Fluidity is continuous control**

Apple's Designing Fluid Interfaces connects responsiveness, interruptibility, and consistent spatial behavior: interfaces that respond during a gesture and let a person redirect it, rather than requiring an animation or gesture to finish first.[27] This is Swink's real-time control in product terms (section 2). The screen continually reflects the action being taken; the response is available while the person is deciding, moving, or adjusting.

| Responsiveness | Question | Example |
| --- | --- | --- |
| Start | Does the interface acknowledge the beginning of input? | A control reacts when pressed |
| Continuation | Does it reflect ongoing input accurately? | A range selection expands with the pointer |
| Redirection | Can the person revise the action naturally? | A drag can return to its origin without committing |

A resizable panel's edge follows the pointer predictably, content adapts without hiding the handle, and release leaves it where expected. Elastic effects are optional; continuous control is foundational. Test by changing direction halfway through, acting again before the transition ends, and releasing near a boundary. Interruption must not silently turn one intended action into several durable changes.
Failure modes of continuous control include scroll hijacking that steals the person's motion, non-interruptible full-screen transitions that finish before input is accepted again, and modals that trap focus until an animation ends. Continuous control fails whenever the system finishes the motion for the person instead of reflecting their current intent.


**14. Agency is the ability to direct and revise**

Agency means a person's choices meaningfully influence the outcome and the system gives them enough understanding to choose. More controls do not create more agency; they can increase operating effort without increasing influence.

A test for a choice has four parts: the alternatives differ, the differences are understandable, the person has a reason to care, and the result reflects the selection. In a scheduling product, "shorter meeting" and "later meeting" represent different tradeoffs. In an editor, "preserve layout" and "reflow text" represent different priorities. Three paraphrases of the same action consume space without creating agency. When the request is already clear, an extra choice delays completion.

Nielsen Norman Group's guidance on user control and freedom emphasizes exits and recovery such as undo and cancel.[14] People explore more when supported changes can be revised. Preserve the distinction between recovery and reversal: canceling a pending local operation, undoing a saved edit, and compensating for an external action are different capabilities. A recovery control describes what it can actually do. A delivered email is not an unsaved text edit.

A person should also be able to decline a recommendation or stop a flow. A simple interface that continuously redirects toward the product's preferred behavior feels less controllable than a denser one with clear options.

**15. Resilience is part of the feeling**

A product feels trustworthy when it handles interruptions without losing the person's place or work. Network errors, delayed responses, permission changes, and canceled operations are normal conditions. Their design determines whether the system feels dependable after the first impression.
Norman and Nielsen Norman Group distinguish slips from mistakes: a slip is the right intention executed wrongly (typo, mis-tap); a mistake is the wrong goal, usually from a mismatched mental model.[87][88] Prevent slips with constraints, good defaults, formatting help, and easy forgiveness. Prevent mistakes with legible commitments (section 11) and a clear line between proposal and persisted change (section 4). Confirmations belong on irreversible or external actions, not on every reversible edit. Celeste's forgiveness (input buffering, generous collision) is the game analogue: absorb small execution errors so the person can keep aiming at the real challenge.[8]


For every important operation, define how it behaves when repeated, interrupted, retried, or partially completed. Retry has a known scope; if some records were imported, it does not import them again. If saving is uncertain, the absence of an acknowledgment is not proof that nothing happened. Errors identify the affected object and the remaining action (section 6).

Bungie's account of Destiny's Apply control is the canonical failure: the progress indicator could fill without applying the change, because protections reacted to tiny cursor movement and unrelated page updates. The team narrowed the checks to whether the cursor still targeted the same item.[34] Visible feedback promised completion that implementation invalidated. Preserve the identity of the selected object through updates, and make cancellation match a real change in intent or scope.

Persistence is a source of confidence: a draft that survives navigation, a filter that remains on return, an edit recoverable after interruption. These are often worth more than another feature.

Accessibility belongs here. Microsoft documents how motion and blinking near text distract or create barriers and recommends controls.[22] WCAG 2.2 covers keyboard focus, pointer targets, and alternatives to dragging.[23] Do not confuse low contrast with calmness: readable text, identifiable controls, and visible focus coexist with a restrained palette. Reduced motion preserves meaning through static states rather than removing the only signal that something changed.

**16. Use motion and sound to explain changes**

Motion has a clear role when it indicates cause, direction, continuity, or a change in state. Assign each animation an informational job. The practitioner tradition of Juice It or Lose It amplifies feedback to make a game satisfying;[19] a product can borrow proportional emphasis in a quieter range. A routine save, a consequential delete, and a failed write must not share the same celebration budget; equal juice on unequal events erases hierarchy (section 2).

Nielsen Norman Group suggests roughly 100 milliseconds for simple feedback and 200–300 milliseconds for larger transitions, with repeated interactions brief and subtle.[20] Apple's motion guidance calls for purposeful, brief feedback consistent with expectations, and interruptible where possible.[26] Define acknowledgment latency separately from animation duration: a pressed state reacts promptly and an operation need not wait for its decorative transition. New content becomes usable as soon as it is safe to expose.

A motion specification includes trigger, affected element, purpose, timing, interruption behavior, and reduced-motion behavior, plus the events that must not trigger it: restoring history, rerendering unchanged data, streaming updates. Old content becoming visible again must not impersonate a newly completed action. Do not move text while a person is reading it. Preserve focus and scroll intent when content grows. Keep durations in the design system's motion tokens rather than scattering them.

Sound follows the same logic. Disasterpeace's Mini Metro account describes audio generated from game data.[21] The lesson is connection to meaning. Optional sound can acknowledge an event; the event must remain understandable without it. The current chat direction does not need audio.

## Part D. Motivation and rhythm

**17. Motivation should connect to the underlying purpose**

Self-determination theory examines motivation through competence, autonomy, and relatedness. Ryan, Rigby, and Przybylski's player-experience work found that satisfaction of those needs predicted game enjoyment and continued play, and the 2010 model extends it.[62][15] Tyack and Mekler's review of 259 works cautions about shallow uses of the theory in HCI games research.[16] Do not replace user research with "this badge satisfies competence." Observe the experience in context.

Distinguish the sources of motivation a product can support: the immediate value of completing a task, the satisfaction of improving an artifact, the confidence of developing skill, the freedom to express a preference, and the meaning of contributing to something shared. Each suggests different evidence. A data-cleaning tool shows that a dataset is ready. A creative tool preserves versions that make improvement visible. A learning product demonstrates that a learner can now solve a problem alone.

For an assistant, competence can mean successfully turning a vague intention into a usable plan. Autonomy can mean choosing among relevant alternatives and retaining the ability to revise. Being understood can come from a context-aware response. A typical conversation already contains the mechanics:

| Existing interaction | Experience to strengthen | Observable outcome |
| --- | --- | --- |
| Express an intention | Confidence that ordinary language works | The interpretation and result are recognizable |
| Choose a suggested next step | Agency | The choice changes the actual plan or request |
| Create or modify a task | Competence | The affected item shows its confirmed state |
| Complete an item | Resolution | Completion is evident and remains verifiable |
| Check a habit | Consistency made visible | Today's state and the weekly count update in place |
| Undo or revise | Freedom to act | Recovery restores an understandable state |
| Finish the exchange | Closure | The person can leave without an unresolved prompt |

Progress needs an appropriate unit. In a conversation, progress may be one clarified decision or one correctly scheduled obligation. Make that legible without inventing points, and keep the outcome connected to the person's original intention.

**18. Progress psychology: what the research says about feeling closer to done**

Research checked September 14, 2026. Several well-replicated behavioral findings explain why progress displays, endings, and near-completion states carry so much emotional weight. They are powerful, which is exactly why each comes with a rule for honest use.

**Endowed progress.** Nunes and Drèze gave car-wash customers loyalty cards that were either blank with 8 stamps required or pre-stamped twice with 10 required. The same 8 purchases were needed, yet 34% of the pre-stamped group redeemed against 19% of the blank-card group, and they finished sooner. A single field site, widely cited, with limited independent field replication.[63] People work harder toward a goal they perceive as already begun. Honest use: when someone has genuinely taken a first step (a goal created with one task already done, a habit checked twice this week), show it as progress from the start rather than starting the display at zero. Dishonest use: pre-filling progress that did not happen.

**Goal gradient.** Kivetz, Urminsky, and Zheng found that café loyalty-card customers bought more frequently as they neared the free coffee: interpurchase times fell about 20% across the card, and purchase rates reset after each reward and accelerated again toward the next.[64] Honest use: a bounded goal with a known total ("4 of 12 books") benefits from showing the remaining distance. Dishonest use: resetting or extending the goal as it approaches.

**Unfinished tasks pull at people.** Zeigarnik's 1927 finding that interrupted tasks are remembered better than completed ones has not held up: a 2025 meta-analysis found no memory advantage for unfinished tasks, but did confirm a general tendency to resume them (the Ovsiankina effect).[65] The defensible claim is the urge to finish, not better memory. Design implication: an open loop the person did not choose is a cost, not a feature. Do not leave artificial loose ends to pull people back, and do make it easy to resume a loop they did choose.

**The peak-end rule.** Fredrickson and Kahneman, and Redelmeier and Kahneman's medical studies, found that people's memory of an experience tracks its most intense moment and its ending far more than its duration; Do, Rupert, and Wolford showed the same for pleasant experiences, where adding a weaker item at the end lowered the overall rating. A 2022 meta-analysis finds the peak and end effects real but smaller and more variable than textbook accounts.[66] Design implication: the end of a session matters more than its length. A settled, legible completion state (section 20) is what people remember; a final unrelated prompt is what they remember instead.

**Curiosity as an information gap.** Loewenstein describes curiosity as arising from a gap between what one knows and wants to know.[67] Malone identified curiosity as one of the core sources of fun (section 3). Honest use: a summary that invites inspection of real detail. Dishonest use: withholding information the person needs in order to manufacture a click.

**Loss aversion and streaks.** Kahneman and Tversky's prospect theory established that losses loom larger than equivalent gains, though later work finds the effect weak or absent for small stakes.[68] Streak mechanics lean on this: the fear of losing a streak drives continued use. Duolingo's own blog reports a streak-wager test that raised day-7 retention by 14%; that is first-party writing without sample sizes or baselines.[68] The question in section 19 applies: if the streak disappeared, would the action still matter? A habit's weekly count against the person's own target shows consistency without attaching a penalty to a missed day. If a streak is ever shown, it must be the person's chosen goal, forgiving by design, and never the loudest thing on the page.

**19. Rewards: the evidence and our position**

Research checked September 14, 2026. The guide takes a position against points, badges, and reward schedules as engagement devices. This section presents the evidence for and against so that the position can be revisited with facts.

**Rewards can undermine intrinsic motivation.** Lepper, Greene, and Nisbett found that children who expected a reward for drawing later drew less voluntarily than those who received no reward or an unexpected one.[70] Deci, Koestner, and Ryan's meta-analysis of 128 experiments found that expected tangible rewards reduced free-choice intrinsic motivation (effect sizes around -0.3 to -0.4), while verbal feedback enhanced it. The finding is contested by Cameron and Pierce, who argue the harm occurs only under narrow conditions; the consensus is that expected, tangible, task-contingent rewards for an already interesting activity carry real risk, and informational feedback does not.[70] Design implication: informational feedback ("you did this, here is the result") supports motivation; controlling rewards ("do this to get that") can replace it.

**Variable rewards drive persistence.** Ferster and Skinner's schedules of reinforcement showed that variable-ratio schedules produce high, steady response rates without pauses; the wider operant literature adds that partially reinforced behavior is the most persistent when rewards stop.[71] Loot boxes and infinite feeds are built on this by analogy. It is effective and it is the opposite of a calm experience statement: it optimizes for continued action regardless of the person's purpose.

**Does gamification work?** Hamari, Koivisto, and Sarsa's 2014 review of the empirical studies then available concluded that gamification "provides positive effects, however, the effects are greatly dependent on the context" and on the users, with points, badges, and leaderboards the most studied and many studies short, small, or uncontrolled.[72] Sailer and colleagues' randomized experiment found that specific elements have specific effects: badges, leaderboards, and performance graphs raised competence and task meaningfulness, while avatars, story, and teammates raised relatedness, and autonomy was not affected as intended. Their conclusion: gamification "is not effective per se."[73] Koivisto and Hamari's 2019 review of 819 studies found results leaning positive with "remarkable" amounts of mixed findings, and a field short on coherent theory.[74] Deterding's definition of gamification as the use of game design elements in non-game contexts, and his later skill-atoms method, argue for designing around the real skill and challenge in the activity rather than layering elements on top.[50]

**Our position.** Ask of any reward: "If the reward disappeared, would this action still matter to the person?" If yes, strengthen the underlying value directly (make the outcome more visible, the progress more legible, the next step easier). If no, be explicit about the behavior being encouraged and why, and expect the effect to fade. A metric for messages sent rewards noise; a completion streak rewards trivial completions; points for reading reward opening content without understanding it. These are incentive risks to investigate, not inevitable outcomes. Recognition features such as badges belong as optional acknowledgment, subordinate to the person's own goals (section 7); that is their ceiling.

**20. Give the experience rhythm and closure**

An interaction has a beginning, a period of work, an outcome, and a potential transition. Products design the beginning carefully and treat the ending as an opportunity to show another prompt, which makes every success feel like the start of more work.

The proposed rhythm is orientation, action, feedback, and rest. Rest means the interface reaches a stable condition in which the person can understand the result and choose whether to continue. It does not require a pause animation or an artificial delay. Flow research (section 3) adds the other half: during work, keep challenge matched to skill and feedback immediate, so the person is neither bored nor anxious.

Closure can be concrete. An exported file is available. A lesson records its completed state. A request shows its resolution. A set of changes is saved. Because of the peak-end rule, this settled state is what the session will be remembered by, so it deserves the same design attention as the first screen. The screen can remain useful without demanding another action.

On return, restore enough context to resume: the relevant selection, draft, or location is more valuable than a generic welcome. Avoid replaying completed outcomes as if they just occurred. Distinguish new information from previously seen state.

## Part E. Craft

**21. What the strongest game and app interfaces have in common**

There is no best-looking interface independent of purpose. A competitive game, a writing app, and an analysis tool place different demands on attention. The useful comparison is how deliberately each organizes those demands. Strong interface craft combines understandable structure, perceptible priorities, reliable response, continuity between states, and restraint. Visual personality emerges through those choices without increasing the work of operating the product.

Evaluate three experiences separately: the first glance, the current action, and repeated use. At first glance the interface explains enough to begin. During action it stays responsive and makes consequences legible. Across repeated use it preserves predictable locations and avoids redundant demands. A treatment can succeed at one and fail at another.

**Beauty and usability are linked, in both directions.** Kurosu and Kashimura had 252 people rate 26 ATM layouts: perceived ease of use tracked perceived beauty far more than measured usability. Tractinsky, Katz, and Ikar replicated this with a working ATM simulation, before and after use, and post-use usability ratings still followed the aesthetics manipulation. This is the aesthetic-usability effect; note that it measures perceived usability, and later work suggests the causation also runs the other way.[60] Norman's Emotional Design separates visceral (immediate appearance), behavioral (use), and reflective (meaning and self-image) responses, and argues that positive affect widens attention and tolerance for small problems.[61] Two consequences follow. First, a clean, coherent surface is not decoration; it measurably changes how capable people feel and how forgiving they are. Second, the effect masks usability problems in testing, so attractive prototypes must be tested on task outcome, not preference (section 31).

A CHI 2026 study reported by Google compared Material 3 Expressive designs with prior Material designs across ten applications and 48 participants. The abstract reports 33% faster fixation on the correct element and 20% faster task completion in the expressive variants, with more positive ratings.[32] The findings concern the tested combinations and do not isolate color, shape, typography, or motion. The implication is that simplicity and visual emphasis cooperate: making an important control unmistakable reduces interpretation even when the control becomes more expressive. Removing all contrast in pursuit of quietness has the opposite effect. The rule: simplify relationships and strengthen the few signals that communicate them. If every minor action uses the strong treatment, it no longer establishes priority. Test expression over repeated exposure; a treatment that helps the first search may distract during sustained work.

A working definition of high-quality UI: a coherent visual and behavioral system that makes the relevant work easier to perceive and control.

**22. Typography is an interface behavior**

Apple's typography guidance treats type as a means of communicating hierarchy, meaning, and identity: legible sizes and weights, few typefaces, hierarchy preserved when text scales.[29] A strong text system tells someone what to read first and what can be scanned. In an operational row, the object name, current state, supporting detail, and action have distinguishable roles through alignment, weight, spacing, and concise language, before reaching for another container.

Define styles by their jobs: primary content, object title, supporting description, metadata, control label. A style has a reason to exist that survives a palette or font change. Do not create a new size for every layout adjustment.

A screen becomes brittle when it depends on every title being short, every number having the same width, or every user keeping the default text size. Test long names early. Where information can be truncated, provide a way to inspect it. Cultured Code's account of adjustable text in Things scales icons and layout alongside text rather than treating enlargement as an isolated setting.[30] The test is whether the hierarchy survives at a different size. Smaller text is not the default repair for insufficient space. Use tabular or numeric figures where numbers must be compared in columns. Quiet metadata must not outrank primary content through weight, color, or size.

**Color and depth carry meaning, not decoration**

Assign semantic color meanings once (success, warning, destructive, accent, disabled) and keep them stable across the product. Apple's color guidance prefers system and semantic colors that adapt to appearance and contrast settings over hard-coded values, and treats color as one cue among others rather than the sole signal.[83] Materials and elevation should express temporary versus durable layers: a sheet or overlay sits above the current context; durable content stays on the content surface.[84] Linear's calmer chrome is a useful restraint check: reduce visual competition while keeping information density, rather than painting every control as a raised object.[28] Icons earn their place when they accelerate recognition; decorative icons that compete with labels dilute hierarchy.

**Synthesis.** If removing color or shadow would erase the only cue that something is interactive, selected, or destructive, the design was relying on decoration as meaning. Restore a structural cue (label, weight, position, shape) first.


**Taste and styling north star**

This section turns a concrete reference set into enforceable visual craft for AI and humans designing screens. It does not replace the house rules or the research above. It says how those rules should *look* when the intended feeling is calm confidence with subtle game feel: simple, instantly recognizable, not boring, not busy, generous space, large targets, and clicks whose effect is obvious before you press.

**Reference set (Sep 2026).** Screens that define this taste: Loona home (dark, illustrated sleep content), a map discovery sheet with photo pins and a photo detail card, Discord "Create Your Server" (light, large choice rows with playful icons), and Apple Games Library / Events / Friends (black canvas, cinematic cards, floating pill nav). The rules below are what these share. Brand colors and art style may change; the structural habits should not.

**What they share (the distill)**

| Habit | What you see | Why it feels good |
| --- | --- | --- |
| Quiet chrome, loud content | Backgrounds are near-black, soft gray, or calm dark purple; maps are desaturated; UI bars are translucent or flat. Photos, 3D art, app icons, or character icons carry color and emotion. | Interest without busyness. The screen feels alive because of the *content*, not because every control is decorated. |
| One shape language | Large corner radii everywhere: cards, pills, chips, nav islands, icon wells. Circles for icon-only actions. Few sharp rectangles. | Soft, tactile, "pressable" without heavy skeuomorphism. Recognition of control type at a glance (house rule 2). |
| Whole-object targets | Feature cards, list rows, filter chips, and Play/Start pills are large. The whole card is the hit area; secondary actions (bookmark, filter) get their own clear wells. | Matches house rule 3 and Fitts (section 9). Game menus teach this: you aim at a slab, not a text link. |
| Predictable clicks | Cards with chevrons open. Pills filter or act. Play starts. Bottom destinations switch place. Active nav is a quiet pill/glow, not a new metaphor each screen. | Subtle game feel: you know what clicking will do before you click (sections 5 and 11). |
| Hierarchy by weight and silence | One bold title; one quieter subtitle; metadata smaller and muted. Accents (one purple, one yellow status dot, one blue CTA) are rare and reserved. | Simple to scan. Not boring because art and one accent carry life; not busy because chrome stays quiet. |
| Space as grouping | Generous padding inside cards and between sections. Equal gaps never between unequal groups (section 8). Lists breathe. | Good use of space without emptiness as a style pose. |
| Depth as layering, not clutter | Floating search, glass nav, soft shadows, translucent badges on art. Elevation marks temporary vs durable (color/depth craft above). | Physicality without juice overload (section 2). |

**Styling rules (do)**

1. **Start from a calm field.** Prefer a near-black, soft light-gray, or gently tinted dark canvas. Let content provide saturation. Desaturate busy backgrounds (maps, photos behind chrome) so pins and cards win.
2. **Round everything that is interactive.** Cards and primary buttons use a large, shared radius. Icon-only actions are circles or squircles. Keep the radius system small (two or three tokens), not a new curve per component.
3. **Make the primary object huge.** Featured content is a tall card or a full-width banner with art. Supporting filters are a row of fat chips. Do not bury the main thing in a dense grid of equal tiles.
4. **Put the verb on a pill.** Primary actions (Play, Start, Join, Set alarm, Add Friends) sit in tall pill buttons with clear labels. Secondary icon actions sit in circular wells. Never rely on bare text links for primary work.
5. **Overlay text on art with a legibility plan.** Title and short description live on a gradient or frosted bar at the bottom of the image. Small translucent badges (duration, "Major Update", "Challenge") sit in a corner. Do not sprinkle labels across the art.
6. **One accent, used sparingly.** Active tab, a single CTA, or a status dot may use the brand accent. Everything else is neutral. If accent appears on five unrelated things, hierarchy is broken (section 5).
7. **Pair icon + label for destinations.** Bottom nav and choice rows show a simple glyph and a word. Playful or 3D icons are fine for *categories and features*; keep system nav glyphs simple and thick.
8. **Show selection by scale and border, not by noise.** Selected map pin grows and gains a clear border. Selected nav item gets a quiet pill behind it. Do not pulse, shake, or confetti routine selection.
9. **Separate search from destinations when search is frequent.** A circular search control beside a floating nav island (Apple Games pattern) beats burying search inside an overflow menu.
10. **Let empty and waiting stay honest.** Prefer a clear next action on empty (Discord Join / Create) over decorative voids. Loading must not impersonate richer content than will arrive (section 23).

**Styling rules (do not)**

1. Do not decorate every row with unique illustration, gradient, and badge. Interest belongs on featured content; lists stay quieter.
2. Do not use tiny text links or icon-only glyphs as the only way to do the main job.
3. Do not mix sharp toolbars with soft cards on the same surface without a reason. One family of shapes.
4. Do not put equal visual weight on nav, filters, featured art, and five CTAs. Rank them (section 7).
5. Do not invent a new active-state language per screen.
6. Do not fill negative space with dividers, strokes, and nested cards. If Gestalt proximity already groups it, skip the box (section 8).
7. Do not confuse "game-like" with HUD clutter, XP bars, or badge walls. Game-like here means readable targets, clear feedback, and confident art, not gamification (section 19).
8. Do not make calm by lowering contrast below readable levels. Black canvas still needs white primary text and visible focus (section 15, section 30).

**AI screen brief (fill before drawing)**

When generating or revising a screen for this taste, answer in one short pass:

1. **Purpose** of the screen (section 7).
2. **Hero object:** what gets the large card or primary column.
3. **Chrome level:** how quiet is the background, nav, and chrome relative to content.
4. **Shape tokens:** card radius, pill height, icon-well size.
5. **Primary verb** and its pill placement.
6. **Secondary actions** and their circular wells.
7. **Accent budget:** where the single accent appears, and nowhere else.
8. **Tap test:** with a thumb-sized target overlay, does every important control clear house rule 3?
9. **Prediction test:** before interaction, can someone say what each major region does (section 5)?
10. **Refuse list:** which decoration was considered and cut.

**How this guides AI.** Prefer this section plus the house rules over generic "make it modern" prompts. When a proposed layout conflicts with these rules, restyle toward quiet chrome + large soft targets + content-led interest before inventing new components. When Brandon adds more reference screens, update the reference set line and only change a rule when the new screens clearly break a shared habit.

**23. A small visible surface can support substantial depth**

Cultured Code's Things 3 presentation describes opening a task into an editable surface with optional details available when needed, and direct placement through a draggable creation control.[31] The visible surface follows the current intention: someone capturing a thought needs a clear place to write; someone refining it needs details. These states share one coherent object rather than appearing as unrelated screens.

A default view includes the information necessary for the common decision. Optional detail has a discoverable, labeled location. Frequently needed controls do not become a repeated search merely to keep the resting screenshot sparse. Visual continuity (title, selection, or position) connects summary to detail; an expansion animation helps where it explains the relationship and is not required everywhere.

Direct manipulation needs an alternative. A drag may feel efficient to an experienced user and remain undiscovered by someone else. Preserve a conventional path to the same operation and verify it with keyboard, touch, and assistive technology. The pattern is a simple, complete starting point with accessible depth: a minimal surface that cannot support the real task is incomplete; a surface exposing all options at once is unnecessarily demanding.

Empty states and loading states are part of craft, not afterthoughts. Nielsen Norman Group advises against a blank panel that could mean "nothing exists," "still loading," or "error," and recommends explaining what belongs there and how to populate it.[85] Skeleton screens help when they match the eventual hierarchy; they are the wrong tool for process work that needs a progress story, and unnecessary for sub-second loads.[86] Never promise a denser layout than the result will deliver.

**24. Navigation should preserve a mental map**

Apple's navigation session distinguishes movement through an information hierarchy from a modal, self-contained task, and emphasizes meaningful destinations, persistent context, and clear labels.[37] A person should be able to tell whether they are visiting a place, inspecting an object, or temporarily completing a task; those situations carry different expectations for Back, Close, Cancel, and Save.

In a document product, opening a folder is movement through content; editing a sharing setting is a bounded operation on an object; comparing two documents needs a persistent workspace. Treating all three as identical modal dialogs makes navigation laborious. Stable location matters at several scales: primary destinations do not reorder, a selected item remains identifiable after refresh, returning from details restores a sensible place in the list. Simplifying navigation begins with naming the actual objects and tasks; a polished bar cannot repair categories that overlap. Review the labels without the visual treatment.
Information scent is the estimate people make of whether a path will lead to what they need.[90] Weak scent is a vague label; false scent is a confident label that opens the wrong place. Review labels without icons. Modes, places, and inspections should smell different: visiting a destination, inspecting an object, and completing a temporary task must not share identical chrome and identical verbs.


**25. Game interface case studies: craft includes constraint and repair**

**Destiny and depth.** David Candland's GDC session frames Destiny's UI challenge as serving new players while preserving depth and efficient access for experienced ones, across the free cursor, timed interactions, localization, visual direction, and icon production.[33] A product should evaluate the complete relationship between content and input: a controller cursor, a keyboard command menu, and a touch grid impose different demands. Borrow the objective of accessible depth, then choose a control model suited to the device. Destiny's Apply failure is in section 15.

**Hades and incremental refinement.** Supergiant's release notes document larger text in some contexts, better controller navigation, removing a hold requirement for the Codex, reduced gameplay clutter, and localization fixes.[35] Refinement often consists of removing small interruptions and repairing inconsistencies: a control that requires an unnecessary hold, a label that is hard to read, a state that fails in another language.

**VALORANT and protected readability.** Riot describes balancing art, performance, and competitive integrity, including visibility treatments for characters and avoiding graphics-setting differences that expose different information.[36] Protect meaningful information across conditions: a selected state stays clear in dark mode, reduced motion, and every supported display setting. Visual richness is never required to perceive what is needed to act correctly.

**26. Adapt the principles to AI and uncertain systems**

Many game mechanics have deliberately consistent rules. AI-mediated products vary in output quality and interpretation, so the interface must communicate what is proposed, what is known, and what was actually done.

Amershi and colleagues' human-AI interaction guidelines address initial expectations, ongoing use, mistakes, and change over time, with support for correction, dismissal, and understandable behavior. They were evaluated with practitioners across AI-infused products.[24] Their value is making tradeoffs explicit, not prescribing one interface.
Google's People + AI Guidebook (PAIR) extends the same discipline into patterns for when AI helps, how to show uncertainty, and how to keep people in control.[89] Keep three separations visible: interpretation versus commitment, proposal versus completion, and confidence versus decoration. Fluent wrong answers carry an information-scent risk: polished language can smell like truth. Always-visible Stop, Undo, Edit, and Dismiss controls are part of the feel of an uncertain system, not optional chrome.


Separate generating an answer from performing an operation. "Here is a draft" and "This was sent" must not share an ambiguous completion treatment. A polished visual result is not evidence the information is correct or the action succeeded. When the system is unsure, present the uncertainty that matters to the decision: the ambiguous recipient, the interpreted date. A conversational response can be natural while its action states remain consistent; variation in phrasing must not obscure whether an item exists, whether a change is pending, or whether a recommendation was applied. Give people efficient ways to redirect: edit, stop, dismiss, retry, without restarting the whole task.

## Part F. Applying it

**27. Worked examples across digital products**

These are proposed applications of the principles, not claims about specific commercial products. Each starts with an existing workflow and changes how it is presented and controlled.

**A: exporting a document.** A weak flow ends with a generic success toast and leaves the person searching for the file. A clearer flow keeps the destination visible, acknowledges the action promptly, and finishes with the actual file name and a way to access it. The connection is a complete action loop: intention produces an observable artifact. If export fails, the settings remain available for correction.

**B: organizing an inbox.** A weak bulk action says "Done" without showing whether it affected one message or every selected one. A clearer design exposes the selected count before action, applies within that scope, and retains recovery. Unselected content stays spatially stable. The connection is agency through scope and consequence; the changed list is the evidence, so a modest confirmation is enough.

**C: learning a difficult concept.** A weak product rewards opening a lesson or guessing repeatedly. A stronger exercise asks the learner to apply an idea, shows the consequence, explains the distinction, and offers a purposeful next attempt. The connection is competence through learning; challenge is valuable here because skill development is the purpose. Remove unrelated operating difficulty and do not equate speed with understanding unless speed is the skill.

**D: editing an image.** A weak adjustment panel offers many controls without a clear preview or reliable way back. A stronger flow shows the effect promptly, preserves the original, and allows comparison. The connection is supported experimentation. A useful constraint, such as snapping or a bounded range, is predictable and overridable. Silently modifying an unselected region breaks control.

**E: exploring an analytics dashboard.** A weak dashboard treats every metric as urgent and animates all values on load. A clearer design starts with the question the view answers, groups related measures, shows active filters, and preserves comparison context. The connection is a readable situation. Animation should not imply precision the data lacks. A dense comparison view may be right if it reduces navigation.

**F: using a conversational assistant.** A weak exchange blends advice, suggestions, and completed changes into one enthusiastic paragraph. A clearer exchange makes the main answer easy to find and distinguishes resulting objects from optional proposals. If an operation occurred, the affected object and confirmed state are nearby. The connection is visible consequence and closure. Suggested next actions reveal whether they ask another question or trigger a change.

**G: managing a subscription.** A weak account flow makes upgrading easy but canceling hard to find and interpret. A clearer design explains when a change takes effect, what access remains, and what can be revised; its confirmation names the actual outcome. The connection is trust in the rules.

**H: restyling an assistant's chat.** Suppose a first styling pass introduced raised edges on Send and suggestion chips, stronger composer focus, hover movement, and entrance animations. It explored tactile appearance before establishing the interaction principles, so it is an incomplete match for the intended direction. Repeated raised edges make many secondary choices compete as physical objects; generic animation on every newly mounted reply is a weak proxy for meaningful arrival.

The recommended composition is a quiet reading surface with a stable composer and a small, consistent visual vocabulary. The current reply carries the main emphasis. Resulting tasks or goals remain clearly actionable and visibly distinct from suggestions. Related choices stay close to the text they answer. History and copy controls remain available at lower resting prominence. The existing reply and receipt should be evaluated together so the result has one presentation rather than several layers announcing the same event.

| Moment | What the screen must do |
| --- | --- |
| Idle | Make starting understandable |
| Composing | Make the active field unmistakable; keep focus visible |
| Sent | Acknowledge without suggesting premature success |
| Receiving | Keep readable content stable; Stop reliable |
| Complete | Make clear whether the assistant answered, proposed, or changed something |
| Return | Restore context; do not replay past confirmations as new events |

This is intention, action, consequence, and rest. A completed request should not automatically become another assignment. If the product already has inline history, result widgets, receipts, draft recovery, and Send/Stop, the first design exercise should expose them coherently and change underlying behavior only where an actual usability problem is identified. The next implementation should define which user event deserves feedback and verify that rerenders, history restoration, and streaming updates do not replay it.

**28. A reusable pattern library**

Each pattern should solve an observed problem, and each has a failure condition. Describe a pattern in behavioral terms before it receives a visual treatment: "visible result" can be a row, a file, a highlighted region, or a sentence.

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

**29. Tradeoffs and failure modes**

- **Minimalism versus discoverability.** Removing controls reduces clutter and increases uncertainty at once. Test whether people can find the action rather than assuming flatness guarantees clarity.[25]
- **Guidance versus autonomy.** A recommendation helps when it reduces a real decision burden and constrains when alternatives are hidden or its basis is unclear.
- **Consistency versus context.** The same control behaves predictably; the same layout need not be imposed on unrelated tasks. Consistency in meaning beats identical geometry.
- **Immediate response versus honest status.** Optimistic presentation feels fast but must not misrepresent durable completion. Define rollback and reconciliation before adopting it.
- **Whitespace versus comparison.** Larger gaps aid grouping and harm scanning. Test with realistic content volume; an empty state does not establish the right density.
- **Delight versus repetition.** A flourish makes a rare event memorable and a frequent event tiring. Review frequency before assigning emphasis.
- **Challenge versus effort.** Preserve the challenge inherent in the person's goal; scrutinize difficulty created by the interface.
- **Completion versus continued engagement.** A new prompt helps someone continue a larger task or distracts them after finishing. Support both continuation and a confident exit.
- **Progress cues versus manipulation.** Endowed progress and goal gradients (section 18) work whether or not the progress is real. Use them only on real progress toward the person's own goal.

**30. A practical design process and the review kit**

**Process.** Begin with one recurring interaction: creating an object, modifying it, reviewing a result, recovering from failure. Write the desired experience in plain language. Document the current sequence including the awkward states, with real content, noting where the person must guess, wait without explanation, remember hidden context, or repeat work. Make a static version that clarifies grouping, wording, and state; a grayscale pass helps reveal hierarchy problems, then evaluate in color and for accessibility. Prototype the full sequence including slow completion, partial success, cancellation, and return visits. Add expressive polish after the loop is understandable; every treatment names the uncertainty it resolves or the character it reinforces. Test with representative users on identical content, and keep changes small enough that findings guide the next decision.

**Review contract for every new or changed surface.** Before implementation, record:

- **Purpose:** the single user outcome this surface serves.
- **Primary read:** what the person should notice first.
- **Necessary support:** the actions and information required to use it correctly.
- **Optional depth:** what can wait and the labeled route to it.
- **State changes:** what takes priority during loading, action, success, and recovery.

**House-rules check.** With realistic content, at phone width and desktop:

1. **Copy.** Is every label, heading, and message as short as it can be while naming the object and the outcome? Does anything restate what the screen shows?
2. **Recognizability.** Before clicking or hovering, can someone say what type of thing each component is, what it is for, and what they can do to it?
3. **Targets.** Is every clickable surface as large as the layout allows? If a card opens something, is the whole card the target? Do nested actions have their own large targets? Does anything rely on hover to be found?
4. **Hierarchy.** Can someone identify what the page, each section, and each component is for at first glance? Does the first thing they notice serve that purpose? Does every secondary element have a clear relationship to its parent? Are peers consistent without all competing for page-level attention?
5. **Simplification.** Does simplifying this surface reduce interpretation and effort, or merely hide controls?
6. **Conditions.** Do reading order, hierarchy, targets, and recovery survive phone widths, larger text, keyboard use, dark mode, and reduced motion?

**Accessibility as feel.** Treat these as part of the experience statement, not a separate compliance pass:

- **Focus order** matches the reading and action order someone would expect.
- **Target size** meets the house rule and platform minima (section 9).
- **Contrast** keeps text and controls readable without relying on color alone.
- **Reduced motion** preserves state meaning through static cues (section 15).
- **Name and role** expose what each control is to assistive technology, matching the visible label.


**UI craft review.**

| Dimension | Review question | Evidence to inspect |
| --- | --- | --- |
| First glance | Is the current subject and useful next action apparent? | Initial scan and first interaction |
| Hierarchy | Does emphasis follow task importance? | Primary content versus navigation and metadata |
| Typography | Do reading roles remain clear with real content? | Long labels, larger text, localization |
| Space | Does distance express relationships? | Grouping, comparison, target reach |
| Input | Does the interface track action accurately? | Press, drag, selection, cancellation |
| Continuity | Is it clear where content came from and where it went? | Open, close, return, refresh |
| Timing | Can the person proceed at their own pace? | Fast repetition and mid-transition input |
| Feedback | Does every signal mean what the system actually knows? | Confirmed, partial, failed, uncertain outcomes |
| Adaptation | Does the experience remain coherent across conditions? | Phone, keyboard, dark mode, reduced motion |
| Restraint | Is unnecessary demand removed after the event? | Settled states and sustained use |

**Interaction brief.** Copy for a specific workflow. It is a specification aid, not a checklist that must produce a visible element per row.

| Field | Fill in |
| --- | --- |
| Person and context | Who is acting, with what knowledge and constraints? |
| Intention | What real outcome are they trying to achieve? |
| Desired feeling | What should become easier to understand or control? |
| Starting state | What has already happened, and what is visible? |
| Available action | What can the person do, and how is it signaled? |
| Target and scope | What objects or people does the action affect? |
| Interpretation | What does the system understand the input to mean? |
| Immediate response | How is receipt acknowledged? |
| Working state | What remains in progress, and what control is available? |
| Success evidence | What proves the intended outcome happened? |
| Partial or unknown state | How are unresolved results represented? |
| Failure and recovery | What can the person correct, retry, or restore? |
| Completion | How does the flow reach a stable stopping point? |
| Return visit | What context should persist, and what must be refreshed? |
| Spatial hierarchy | What belongs together, and what deserves emphasis? |
| Motion purpose | What information does each transition communicate? |
| Input coverage | How does it work with keyboard, pointer, and touch? |
| Accessibility | How is meaning preserved with reduced motion and assistive technology? |
| Evidence to collect | What observable behavior would support the design? |

A useful brief is specific. "Provide clear feedback" is too broad. "After the server confirms the rename, update the file name in place and keep the row selected" can be implemented and evaluated.

**31. Evaluate the experience, not the theme**

Ask people what they expect before activating the important control. Afterward, ask what changed and whether anything remains to be done. Observe whether their explanation matches the actual state.

| Measure | How to observe it | Interpretation limit |
| --- | --- | --- |
| Prediction accuracy | Person describes expected action and scope | A correct guess may reflect prior familiarity |
| Outcome comprehension | Person identifies result and remaining work | A visible confirmation may still be inaccurate |
| Completion success | The intended task is completed correctly | Speed alone does not establish quality |
| Recovery success | Person corrects or recovers without restarting unnecessarily | Recovery support varies by operation |
| Operating effort | Hesitation, repeated navigation, duplicate activation | Some pauses reflect useful thinking |
| Orientation | Person resumes after interruption | Familiar users may compensate for weak design |
| Perceived control | Neutral interview questions | Self-report should be paired with behavior |
| Repetition tolerance | Common actions repeated over a realistic session | First-use preference can differ from habitual use |

For a task assistant, useful scenarios are: create one task, change a date, receive advice without a mutation, handle several changes, stop a response, recover from a failure, reopen history, check and un-check a habit. For each, record duplicate attempts, hesitation, missed confirmations, accidental actions, and whether the next step is clear.

Separate product outcome, perceived clarity, and visual preference. The aesthetic-usability effect (section 21) means people rate attractive designs as easier whether or not they performed better; a person may prefer a screenshot yet perform worse in the flow. Both observations matter; neither erases the other. Where a standardized instrument helps, validated player-experience and UX questionnaires exist ([75]); use them alongside observed behavior, not instead of it, and note that some widely used game questionnaires have documented validity problems.

Compare a restrained version with the current styling on identical content, in three passes: static hierarchy, complete interactions including interruption and recovery, then repeated operations over a realistic session. Test adverse conditions deliberately: long labels, empty and dense data, slow responses, interrupted requests, repeated input, keyboard navigation, phone keyboards, dark mode, reduced motion. When a version feels better, identify what changed in observable terms. When a version looks calmer but performs worse, restore the missing cues before adding decoration. When it works but feels sluggish, inspect acknowledgment and blocking transitions. When it feels busy, examine repeated demands and competing priorities, not only element count.

Measure session length cautiously. A short session can indicate efficient completion; a long one can indicate exploration or confusion. Avoid a universal numerical "game feel score." The strongest evidence is that people understand the design, use it effectively, recover when necessary, and describe the intended feeling in their own words.

The process should end with a small set of explicit rules the team can apply elsewhere: stable locations for common actions, consistent text roles, distinguishable states, interruptible presentation, and confirmed outcomes that remain inspectable. That makes quality reproducible rather than confined to one polished screen.

**Evidence and scope**

This guide draws on creator interviews, practitioner writing, design frameworks, a game-feel survey, motivational and behavioral research, usability guidance, HCI laws, and accessibility standards. These sources have different evidential roles. A creator interview documents intention; a case study suggests a mechanism; a framework structures reasoning; an empirical study supports claims within its tested conditions; patch notes and first-party design accounts document changes and intent, not measured usability outcomes.

The historical game examples are illustrative, not a controlled comparison of classic and contemporary games. GDC references use the accessible official session descriptions; Apple WWDC references include accessible transcripts. Behavioral findings (endowed progress, goal gradient, peak-end, overjustification) come from consumer and psychology settings and are applied here by analogy. Recommendations for the running example are interpretations and should be tested. Precise motion timing, ideal density, and the right amount of guidance depend on the task, audience, frequency of use, and context.


**Sources**

1. Robin Hunicke, Marc LeBlanc, and Robert Zubek. [MDA: A Formal Approach to Game Design and Game Research](https://www.cs.northwestern.edu/~hunicke/MDA.pdf), 2004. Primary framework connecting mechanics, dynamics, and emotional experience.
2. Martin Pichlmair and Mads Johansen. [Designing Game Feel. A Survey](https://arxiv.org/abs/2011.09201), 2020 preprint; associated IEEE Transactions on Games publication, 2021. Survey of more than 200 sources; abstract and metadata support the three-domain summary.
3. Nintendo. [Iwata Asks: New Super Mario Bros., Letting Everyone Know It Was a Good Mushroom](https://iwataasks.nintendo.com/interviews/wii/nsmb/0/3/), historical interview. Primary account of teaching through the opening encounters; publication date not exposed in the accessible page.
4. The Tetris Company. [About Tetris](https://play.tetris.com/about), undated. Official description of the core mechanics. The product comparison is analytical.
5. Nintendo. [Iwata Asks: Twilight Princess, The Hands-on Approach](https://www.nintendo.com/en-gb/Iwata-Asks/Iwata-Asks-Wii/Iwata-Asks-The-Legend-of-Zelda-Twilight-Princess/6-The-Hands-on-Approach/6-The-Hands-on-Approach-227645.html), historical interview. Primary account of player expectations and trust.
6. Jamie Churchman. [Mini Metro: When Less Is More](https://www.gdcvault.com/play/1024250/-Mini-Metro-When-Less), GDC 2017. Official session description on visual elimination and intrinsic reward.
7. Dinosaur Polo Club / DPC Labs. [Mini Metro](https://dinopoloclub.itch.io/minimetro), official developer listing. Route mechanics and transit-map representation.
8. Maddy Thorson. [Celeste & Forgiveness](https://www.mattmakesgames.com/articles/celeste_and_forgiveness/index.html), undated archived developer article. Primary descriptions of input buffering and forgiveness.
9. Don Norman. [Signifiers, Not Affordances](https://jnd.org/signifiers-not-affordances/), November 17, 2008; originally ACM Interactions 15(6). Primary explanation of perceptible clues to meaning and action.
10. Nielsen Norman Group. [Visual Hierarchy in UX: Definition](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/). Practitioner guidance on grouping, contrast, space, and emphasis.
11. Marieke McCloskey, Nielsen Norman Group. [Form Design Quick Fix: Group Form Elements Effectively Using White Space](https://www.nngroup.com/articles/form-design-white-space/), November 3, 2013. Proximity and label-control association.
12. Daniel Cook. [The Chemistry of Game Design](https://lostgarden.com/2021/03/13/the-chemistry-of-game-design-2/), originally 2007; republished March 13, 2021. Practitioner model of learning and interaction loops, not a universal empirical law.
13. Nielsen Norman Group. [Visibility of System Status](https://www.nngroup.com/articles/visibility-system-status/). Usability guidance on timely and understandable feedback.
14. Nielsen Norman Group. [User Control and Freedom](https://www.nngroup.com/articles/user-control-and-freedom/). Exits, cancellation, and recovery.
15. Andrew K. Przybylski, C. Scott Rigby, and Richard M. Ryan. [A Motivational Model of Video Game Engagement](https://selfdeterminationtheory.org/SDT/documents/2010_PrzybylskiRigbyRyan_ROGP.pdf), Review of General Psychology 14(2), 2010, pp. 154–166. Theory-based account of motivation.
16. April Tyack and Elisa D. Mekler. [Self-Determination Theory and HCI Games Research: Unfulfilled Promises and Unquestioned Paradigms](https://arxiv.org/abs/2405.12639), 2024, accepted TOCHI preprint. Abstract reports analysis of 259 works and cautions about superficial theoretical applications.
17. Nielsen Norman Group. [Memory Recognition and Recall in User Interfaces](https://www.nngroup.com/articles/recognition-and-recall/). Recognition, contextual cues, and memory demands.
18. Jakob Nielsen. [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/), December 3, 2006. Distinction between optional depth and sequential staging.
19. Martin Jonasson and Petri Purho. [Juice It or Lose It](https://www.gdcvault.com/play/1016789/Juice-It-or-Lose), GDC Europe 2012. Official session description of amplified feedback.
20. Page Laubheimer, Nielsen Norman Group. [Executing UX Animations: Duration and Motion Characteristics](https://www.nngroup.com/articles/animation-duration/), February 9, 2020. Timing heuristics, repeated interactions, and motion execution.
21. Disasterpeace. [Mini Metro articles, including Serialism & Sonification in Mini Metro](https://disasterpeace.com/blog/tag.Mini%2BMetro), including GDC 2018 transcript. Primary account of sound generated from game activity.
22. Microsoft. [Xbox Accessibility Guideline 117: Visual Distractions and Motion Settings](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/117), updated March 4, 2026. Moving and blinking content alongside readable UI.
23. W3C. [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/). Normative standard; consult individual success criteria and their levels and exceptions when applying it.
24. Saleema Amershi et al. [Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf), CHI 2019, DOI 10.1145/3290605.3300233. Eighteen guidelines, evaluated in multiple rounds including 49 practitioners and 20 AI-infused products.
25. Kate Moran, Nielsen Norman Group. [Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/), September 3, 2017. Eye-tracking experiment on weak and strong signifiers; its measured effect concerns specific click-search tasks.
26. Apple. [Motion](https://developer.apple.com/design/human-interface-guidelines/motion?changes=l_9_3), Human Interface Guidelines; change log includes September 9, 2025. Purposeful, brief, optional, and interruptible motion.
27. Apple. [Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/), WWDC 2018. Accessible transcript on responsiveness, continuous gesture feedback, interruption, and spatial consistency.
28. Charlie Aufmann and Maxime Heckel, Linear. [A Calmer Interface for a Product in Motion](https://linear.app/now/behind-the-latest-design-refresh), March 12, 2026. First-party account of reducing visual competition while retaining information density.
29. Apple. [Typography](https://developer.apple.com/design/human-interface-guidelines/typography?changes=lat_2_6), Human Interface Guidelines; change log includes December 16, 2025. Legibility, hierarchy, and adaptation to text size.
30. Cultured Code. [Things Big and Small](https://culturedcode.com/things/blog/2023/09/things-big-and-small/), September 6, 2023. First-party account of text, icon, and layout scaling.
31. Cultured Code. [What's New in the All-New Things?](https://culturedcode.com/things/features/), undated Things 3 launch presentation. Historical design account of task expansion, optional detail, and direct placement; not a claim about every current platform variant.
32. Frank Bentley, Lennard Schmidt, Alyssa Sheehan, Bianca Gallardo, and Ying Wang. [Usability Hasn't Peaked: Exploring How Expressive Design Overcomes the Usability Plateau](https://research.google/pubs/usability-hasnt-peaked-exploring-how-expressive-design-overcomes-the-usability-plateau/), CHI 2026. Publisher-listed abstract reporting a 48-participant comparison across ten applications; full methodology was not available on this publication page.
33. David Candland, Bungie. [Tenacious Design and the Interface of Destiny](https://www.gdcvault.com/play/1023107/Tenacious-Design-and-The-Interface), GDC 2016. Official session description on the challenge of approachable depth and interface production.
34. Bungie. [This Week at Bungie, September 19, 2019](https://www.bungie.net/7/en/News/article/48163), “Applied Science.” Primary explanation of Apply-control failures and narrower cancellation checks.
35. Supergiant Games. [Hades: Latest Updates](https://www.supergiantgames.com/blog/hades-updates/), release notes including v1.0, September 17, 2020. Reported improvements to text, controller navigation, hold behavior, clutter, and localization.
36. Brandon Wang, Riot Games. [VALORANT Shaders and Gameplay Clarity](https://www.riotgames.com/en/news/valorant-shaders-and-gameplay-clarity), June 30, 2020. Primary account of balancing art, performance, and visibility; a gameplay-rendering example rather than a menu-usability study.
37. Sarah McClanahan, Apple. [Explore Navigation Design for iOS](https://developer.apple.com/videos/play/wwdc2022/10001/), WWDC 2022. Accessible transcript on content hierarchy, tabs, context, and modal tasks; platform-specific prescriptions require adaptation outside iOS.
38. Apple. [Principles of Great Design](https://developer.apple.com/videos/play/wwdc2026/250/), WWDC26. Accessible transcript, particularly Purpose and Simplicity; first-party design guidance rather than a controlled usability study.
39. Riot Games. [Complementary Visual Design in Spirit Blossom](https://www.riotgames.com/en/news/complementary-visual-design-in-spirit-blossom). First-party interview with Legends of Runeterra senior visual designer Tom Sayer about information hierarchy, progress tracking, and adapting a shared visual theme.
40. Riot Games. [Clarity in League](https://www.leagueoflegends.com/en-us/news/dev/clarity-in-league/), March 12, 2021. Developer account of gameplay importance, visual hierarchy, and noise; applied here as an analogy for attention across nested UI components.
41. Roblox Creator Hub. [UI and UX Design](https://create.roblox.com/docs/production/game-design/ui-ux-design). Official guidance on prioritization, contextual actions, visual language, and consistency, including Super Striker League's possession-dependent controls. Accessed September 13, 2026.
42. Jeff Landa, Riot Games. [VALORANT Patch Notes 0.49](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-0-49/), April 28, 2020. Reported HUD and menu changes, including ping fading under aim, relocating Play controls, reducing preview height, and announcement precedence.
43. Ashley Tsao, Riot Games. [VALORANT Patch Notes 11.00](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-11-00/), June 24, 2025. Reported pickup feedback, shorter and less obstructive effects, and audio-priority adjustments; implementation examples rather than measured UX outcomes.
44. Steve Swink. [Game Feel: A Game Designer's Guide to Virtual Sensation](https://www.taylorfrancis.com/books/mono/10.1201/9781482267334/game-feel-steve-swink), Morgan Kaufmann, 2008. Defines game feel as "real-time control of virtual objects in a simulated space, with interactions emphasized by polish." Practitioner book; the often-quoted 100 ms responsiveness threshold is attributed to it by secondary sources and was not checked against the primary text here.
45. Thomas W. Malone. [What makes things fun to learn? Heuristics for designing instructional computer games](https://dl.acm.org/doi/10.1145/800088.802839), SIGSMALL 1980; and [Heuristics for designing enjoyable user interfaces: Lessons from computer games](https://dl.acm.org/doi/10.1145/800049.801756), Human Factors in Computer Systems 1982. Challenge, fantasy, and curiosity, applied explicitly to non-game interfaces in 1982. Foundational theory from small 1970s classroom studies; fuller treatment in Malone 1981, Cognitive Science 5(4).
46. Thomas W. Malone and Mark R. Lepper. [Making learning fun: A taxonomy of intrinsic motivations for learning](https://www.taylorfrancis.com/chapters/edit/10.4324/9781003163244-10/making-learning-fun-thomas-malone-mark-lepper), in Aptitude, Learning, and Instruction, Vol. 3, Erlbaum, 1987. Individual motivations (challenge, curiosity, control, fantasy) and interpersonal ones (cooperation, competition, recognition). Conceptual book chapter.
47. Mihaly Csikszentmihalyi. [Flow: The Psychology of Optimal Experience](https://www.harpercollins.com/products/flow-mihaly-csikszentmihalyi), Harper and Row, 1990; and Jenova Chen. [Flow in games (and everything else)](https://dl.acm.org/doi/10.1145/1232743.1232769), Communications of the ACM 50(4), 2007. Challenge-skill balance, clear goals, immediate feedback; Chen recommends letting players adjust their own challenge inside play. Popular synthesis and a four-page opinion column; flow measurement remains contested.
48. Raph Koster. [A Theory of Fun for Game Design](https://theoryoffun.com/), Paraglyph Press, 2004; 2nd ed. O'Reilly, 2013. Fun as the brain's reward for learning patterns. Practitioner book; the "fun is learning" line is paraphrased here.
49. Nicole Lazzaro. [Why We Play Games: Four Keys to More Emotion Without Story](https://www.semanticscholar.org/paper/2c62e7ddb42506beb06cad57c7bd9ee4a93b714c), XEODesign white paper, 2004. Hard fun, easy fun, altered states, and the people factor, from an observational study of 30 players. Industry white paper, small qualitative sample; two keys were later renamed.
50. Sebastian Deterding, Dan Dixon, Rilla Khaled, and Lennart Nacke. [From game design elements to gamefulness: Defining "gamification"](https://dl.acm.org/doi/10.1145/2181037.2181040), MindTrek 2011; and Sebastian Deterding. [The lens of intrinsic skill atoms: A method for gameful design](https://www.tandfonline.com/doi/abs/10.1080/07370024.2014.993471), Human-Computer Interaction 30(3-4), 2015. The standard definition of gamification, and a method that restructures the user's real goal pursuit rather than adding feedback on top. Design method paper with illustrative cases.
51. Sid Meier. [Interesting Decisions](https://gdcvault.com/play/1015756/Interesting), GDC 2012. Meaningful tradeoffs, decisions that reflect the player, and the information needed to own a decision. Practitioner talk; the taxonomy is from press coverage of the session.
52. Chris Crawford. The Art of Interactive Design, No Starch Press, 2002. Interactivity as a cyclic process in which two agents alternately listen, think, and speak; quality is limited by the weakest of the three. Practitioner book, not checked in this pass.
53. Mark A. Blythe, Kees Overbeeke, Andrew F. Monk, and Peter C. Wright (eds.). [Funology: From Usability to Enjoyment](https://link.springer.com/book/10.1007/1-4020-2967-5), Kluwer, 2003; and John M. Carroll and John C. Thomas. [FUN](https://dl.acm.org/doi/10.1145/49108.1045604), ACM SIGCHI Bulletin 19(3), 1988. Enjoyment as a design goal distinct from usability; Carroll and Thomas note that making a system easier can make it less fun. Edited volume of varying rigor; a second edition (Funology 2, 2018) exists.
54. Jesse Schell. The Art of Game Design: A Book of Lenses, Morgan Kaufmann, 2008. A game examined through many questions rather than one theory. Practitioner book, not checked in this pass.
55. Paul M. Fitts. [The information capacity of the human motor system in controlling the amplitude of movement](https://psycnet.apa.org/doi/10.1037/h0055392), Journal of Experimental Psychology 47(6), 1954; and I. Scott MacKenzie. [Fitts' law as a research and design tool in human-computer interaction](https://www.yorku.ca/mack/hci1992.html), Human-Computer Interaction 7(1), 1992. Movement time rises with the log of distance over target width; MacKenzie's Shannon formulation is the HCI standard. Predicts pointing time, not errors or complex 2D targets without extensions.
56. William E. Hick. [On the rate of gain of information](https://journals.sagepub.com/doi/10.1080/17470215208416600), Quarterly Journal of Experimental Psychology 4(1), 1952; and Ray Hyman. [Stimulus information as a determinant of reaction time](https://psycnet.apa.org/doi/10.1037/h0056940), Journal of Experimental Psychology 45(3), 1953. Choice reaction time grows with the log of the number of equiprobable alternatives. Applies to simple, practiced choices; menu extrapolations ignore familiarity and visual search.
57. Jakob Nielsen. [Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/), Nielsen Norman Group, 1993, from Usability Engineering (Academic Press, 1993); Robert B. Miller. Response time in man-computer conversational transactions, AFIPS Fall Joint Computer Conference, 1968; Stuart K. Card, Thomas P. Moran, and Allen Newell. The Psychology of Human-Computer Interaction, Erlbaum, 1983. The 0.1, 1, and 10 second limits; Miller is their origin and Card, Moran, and Newell supply the roughly 100 ms perceptual cycle. Heuristics from 1960s to 1980s systems, not modern controlled thresholds.
58. John Sweller. [Cognitive load during problem solving: Effects on learning](https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1202_4), Cognitive Science 12(2), 1988. Founding paper of cognitive load theory. Later "germane load" criticized as hard to falsify.
59. George A. Miller. [The magical number seven, plus or minus two](https://psychclassics.yorku.ca/Miller/), Psychological Review 63(2), 1956; and Nelson Cowan. [The magical number 4 in short-term memory](https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/magical-number-4-in-shortterm-memory-a-reconsideration-of-mental-storage-capacity/44023F1147D4A1D44BDC0AD226838496), Behavioral and Brain Sciences 24(1), 2001. Short-term memory spans, about 7 and about 4 chunks respectively. Neither is a cap on items visible on a screen.
60. Masaaki Kurosu and Kaori Kashimura. [Apparent usability vs. inherent usability](https://dl.acm.org/doi/10.1145/223355.223680), CHI '95 Companion, 1995; Noam Tractinsky, Adi S. Katz, and Dror Ikar. [What is beautiful is usable](https://academic.oup.com/iwc/article-abstract/13/2/127/898608), Interacting with Computers 13(2), 2000; and Kate Moran. [The Aesthetic-Usability Effect](https://www.nngroup.com/articles/aesthetic-usability-effect/), Nielsen Norman Group, 2017. 252 participants rating 26 ATM layouts (r = 0.589 between beauty and apparent usability), replicated before and after use. Both measure perceived usability by rating; later work finds the causal direction runs both ways.
61. Don Norman. [Emotional Design: Why We Love (or Hate) Everyday Things](https://www.basicbooks.com/titles/don-norman/emotional-design/9780465051366/), Basic Books, 2004. Visceral, behavioral, and reflective levels; positive affect broadens thinking. Popular book; the "attractive things work better" claim rests on source 60.
62. Richard M. Ryan, C. Scott Rigby, and Andrew Przybylski. [The motivational pull of video games: A self-determination theory approach](https://link.springer.com/article/10.1007/s11031-006-9051-8), Motivation and Emotion 30(4), 2006. Autonomy and competence satisfaction predict enjoyment and future play; intuitive controls contribute to competence. Self-report studies with modest samples; the PENS instrument is proprietary.
63. Joseph C. Nunes and Xavier Drèze. [The endowed progress effect: How artificial advancement increases effort](https://academic.oup.com/jcr/article-abstract/32/4/504/1787024), Journal of Consumer Research 32(4), 2006. 300 car-wash loyalty cards; 34% redemption with two pre-stamps versus 19% blank, same eight purchases required. Single field site with limited independent replication.
64. Ran Kivetz, Oleg Urminsky, and Yuhuang Zheng. [The goal-gradient hypothesis resurrected](https://journals.sagepub.com/doi/10.1509/jmkr.43.1.39), Journal of Marketing Research 43(1), 2006. Café card purchases accelerate toward the reward (about 20% shorter interpurchase times) and reset after it. One café and one online panel; conceptually overlaps source 63.
65. Bluma Zeigarnik. [Über das Behalten von erledigten und unerledigten Handlungen](https://doi.org/10.1007/BF02409755), Psychologische Forschung 9, 1927; and Rosanna Ghibellini and Beat Meier. [Interruption, recall and resumption: A meta-analysis of the Zeigarnik and Ovsiankina effects](https://www.nature.com/articles/s41599-025-05000-w), Humanities and Social Sciences Communications 12, 2025. The meta-analysis found no memory advantage for unfinished tasks but a general tendency to resume them.
66. Barbara L. Fredrickson and Daniel Kahneman. [Duration neglect in retrospective evaluations of affective episodes](https://psycnet.apa.org/doi/10.1037/0022-3514.65.1.45), Journal of Personality and Social Psychology 65(1), 1993; Donald A. Redelmeier and Daniel Kahneman. [Patients' memories of painful medical treatments](https://www.sciencedirect.com/science/article/abs/pii/0304395996029946), Pain 66(1), 1996; and Amy M. Do, Alexander V. Rupert, and George Wolford. [Evaluations of pleasurable experiences: The peak-end rule](https://link.springer.com/article/10.3758/PBR.15.1.96), Psychonomic Bulletin and Review 15(1), 2008. Retrospective evaluation tracks peak and end, not duration, for painful and pleasant experiences. A 2022 meta-analysis (Alaybek et al., OBHDP) finds the effects real but smaller and more variable than textbook accounts.
67. George Loewenstein. [The psychology of curiosity: A review and reinterpretation](https://psycnet.apa.org/doi/10.1037/0033-2909.116.1.75), Psychological Bulletin 116(1), 1994. Curiosity as deprivation arising from a perceived gap in knowledge. Theoretical review; one of several accounts.
68. Daniel Kahneman and Amos Tversky. [Prospect theory: An analysis of decision under risk](https://www.econometricsociety.org/publications/econometrica/1979/03/01/prospect-theory-analysis-decision-under-risk), Econometrica 47(2), 1979; and Kai Herng Loh. [How streaks keep Duolingo learners committed to their language goals](https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals/), Duolingo Blog, May 10, 2017. Losses loom larger than gains; the Duolingo post reports a streak-wager test raising day-7 retention 14%. Loss aversion is weak or absent at small stakes (Gal and Rucker 2018); the Duolingo post is first-party, without sample sizes or baselines.
69. George Fan. [How I Got My Mom to Play Through Plants vs. Zombies](https://www.gdcvault.com/play/1015541/How-I-Got-My-Mom), GDC 2012. Ten tutorial techniques, including at most eight words on screen and teaching through visuals. Practitioner talk; the enumerated list is from the slides and press coverage.
70. Mark R. Lepper, David Greene, and Richard E. Nisbett. [Undermining children's intrinsic interest with extrinsic reward](https://psycnet.apa.org/doi/10.1037/h0035519), Journal of Personality and Social Psychology 28(1), 1973; and Edward L. Deci, Richard Koestner, and Richard M. Ryan. [A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation](https://psycnet.apa.org/doi/10.1037/0033-2909.125.6.627), Psychological Bulletin 125(6), 1999. 128 experiments; expected tangible rewards reduce free-choice intrinsic motivation (d from -0.28 to -0.40), verbal feedback enhances it. Disputed by Cameron and Pierce (1994) and Eisenberger and Cameron (1996).
71. Charles B. Ferster and B. F. Skinner. [Schedules of Reinforcement](https://archive.org/details/schedulesofreinf0000bfsk), Appleton-Century-Crofts, 1957. Variable-ratio schedules produce high, steady response rates. The persistence-under-extinction claim is a textbook generalization from the wider operant literature; the application to product mechanics is an analogy.
72. Juho Hamari, Jonna Koivisto, and Harri Sarsa. [Does gamification work? A literature review of empirical studies on gamification](https://dl.acm.org/doi/10.1109/HICSS.2014.377), HICSS 2014. Positive but context- and user-dependent effects; many studies short, small, or uncontrolled.
73. Michael Sailer, Jan Ulrich Hense, Sarah Katharina Mayr, and Heinz Mandl. [How gamification motivates: An experimental study of the effects of specific game design elements on psychological need satisfaction](https://www.sciencedirect.com/science/article/pii/S074756321630855X), Computers in Human Behavior 69, 2017. Badges, leaderboards, and performance graphs raised competence and meaningfulness; avatars, story, and teammates raised relatedness; autonomy unaffected. Randomized online simulation; sample size not confirmed here.
74. Jonna Koivisto and Juho Hamari. [The rise of motivational information systems: A review of gamification research](https://www.sciencedirect.com/science/article/pii/S0268401217305169), International Journal of Information Management 45, 2019. Review of 819 studies; results lean positive with a remarkable share of mixed findings. For effect sizes, newer meta-analyses (Sailer and Homner 2020) are better.
75. Vero Vanden Abeele, Katta Spiel, Lennart Nacke, Daniel Johnson, and Kathrin Gerling. [Development and validation of the Player Experience Inventory](https://www.sciencedirect.com/science/article/pii/S1071581919301302), International Journal of Human-Computer Studies 135, 2020; Wijnand IJsselsteijn, Yvonne de Kort, and Karolien Poels. [The Game Experience Questionnaire](https://research.tue.nl/en/publications/the-game-experience-questionnaire), TU Eindhoven, 2013; Effie L.-C. Law, Florian Brühlmann, and Elisa D. Mekler. [Systematic review and validation of the Game Experience Questionnaire](https://dl.acm.org/doi/10.1145/3242671.3242683), CHI PLAY 2018; and Marc Hassenzahl, Michael Burmester, and Franz Koller. [AttrakDiff](https://link.springer.com/chapter/10.1007/978-3-322-80058-9_19), Mensch und Computer 2003. PXI (10 constructs, validated with 529 players) and AttrakDiff (pragmatic and hedonic quality) are usable instruments; the GEQ was never peer-reviewed and its 7-factor structure failed validation with 633 participants.

76. Kieran Hicks, Patrick Dickinson, Jussi Holopainen, and Kathrin Gerling. [Good Game Feel: An Empirically Grounded Framework for Juicy Design](https://dl.digra.org/index.php/dl/article/view/936), DiGRA 2018, DOI 10.26503/dl.v2018i1.936. Developer-survey framework for analyzing juiciness against game state and feedback significance.
77. Kieran Hicks, Kathrin Gerling, Patrick Dickinson, and Vero Vanden Abeele. [Juicy Game Design: Understanding the Impact of Visual Embellishments on Player Experience](https://dl.acm.org/doi/10.1145/3311350.3347171), CHI PLAY 2019, DOI 10.1145/3311350.3347171. Visual embellishments raised appeal; competence effects were context-specific across the tested games.
78. Dan Saffer. [Microinteractions: Designing with Details](https://www.oreilly.com/library/view/microinteractions/9781449342760/), O'Reilly, 2013. Triggers, rules, feedback, loops, and modes for small interaction moments. Practitioner book.
79. Google. [States](https://m3.material.io/foundations/interaction/states), Material Design 3. Interaction states (enabled, disabled, hover, focus, pressed, dragged) as a coherent set. Accessed September 21, 2026.
80. Nielsen Norman Group. [Proximity Principle in Visual Design](https://www.nngroup.com/articles/gestalt-proximity/). Items near each other are perceived as related.
81. Nielsen Norman Group. [Similarity Principle in Visual Design](https://www.nngroup.com/articles/gestalt-similarity/). Shared visual traits imply grouping.
82. Nielsen Norman Group. [The Principle of Common Region](https://www.nngroup.com/articles/common-region/); and [Continuation: Gestalt Principle for User Interface Design](https://www.nngroup.com/videos/continuation-gestalt/). Boundaries group contents; the eye follows alignment and smooth paths.
83. Apple. [Color](https://developer.apple.com/design/human-interface-guidelines/color), Human Interface Guidelines. Semantic system colors, adaptation to appearance and contrast, color not used alone. Accessed September 21, 2026.
84. Apple. [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), Human Interface Guidelines. Choose materials by semantic role and layer separation. Accessed September 21, 2026.
85. Nielsen Norman Group. [Designing Empty States in Complex Applications](https://www.nngroup.com/articles/empty-state-interface-design/). Avoid blank panels that confuse loading, absence, and error; explain how to populate.
86. Page Laubheimer, Nielsen Norman Group. [Skeleton Screens 101](https://www.nngroup.com/articles/skeleton-screens/). Content-shaped placeholders; unsuitable when they misrepresent hierarchy or when a spinner fits process work better.
87. Nielsen Norman Group. [Preventing User Errors: Avoiding Unconscious Slips](https://www.nngroup.com/articles/slips/). Slips as execution errors; constraints, defaults, and forgiveness.
88. Nielsen Norman Group. [Preventing User Errors: Avoiding Conscious Mistakes](https://www.nngroup.com/articles/user-mistakes/). Mistakes from mismatched mental models; clearer goals and feedback.
89. Google People + AI Research. [People + AI Guidebook](https://pair.withgoogle.com/guidebook/). Patterns for human-centered AI products, including control, uncertainty, and trust. Accessed September 21, 2026.
90. Nielsen Norman Group. [Information Scent: How Users Decide Where to Go Next](https://www.nngroup.com/articles/information-scent/). Labels and cues as estimates of path value; weak and false scent.
91. Jakob Nielsen. [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/); and [Maintain Consistency and Adhere to Standards](https://www.nngroup.com/articles/consistency-and-standards/). Consistency and standards heuristic; internal versus external consistency.
