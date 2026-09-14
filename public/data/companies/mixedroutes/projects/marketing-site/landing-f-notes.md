# Landing F: a little more life

New 1280px canvas screen to the right of E. Keeps C and D's concise copy, V2 type, blue actions, and recognizable product components. Adds a longer sequence with distinct compositions: interest-to-plan hero, wide discovery cards, saved-place list, shared-interest connection, plan details, paired chat and invite examples, photographic outcome, questions, and closing invitation.

## Experience and review contract

- Purpose: help someone understand MixedRoutes and decide to get the app.
- Intended feeling: oriented, capable, and unhurried about making time with friends.
- Primary read: more life, less noise. The hero connects a request, a suggestion based on shared interests, a settled plan, and a friend’s reply.
- Necessary support: what you can find, what saving means, how people connect, plan details and RSVP choices, chat, sharing, and platform availability.
- Optional depth: About and FAQ destinations.
- State changes: static HTML/CSS only. Examples distinguish saved, invited, and going; they do not claim an action just completed. Product controls are visual illustrations, not working app controls.

## Application of the gaming guide

Based on docs/game-feel-for-digital-products.md, especially sections 5 through 12, 14, 17, 20, and 30.

- One purpose per section. Each has a heading, a short explanation, and a relevant artifact. More length comes from distinct useful sections.
- Stable meaning: blue identifies actions; labeled mint treatments indicate confirmed RSVP. Interest colors stay paired with interest labels and illustrations.
- Recognizable controls: illustrated buttons and RSVP choices have generous visible targets. The website's real links retain focus outlines.
- Agency: Going, Maybe, and Can't go are visible together, with Change answer beside the current RSVP.
- Visible outcome: the hero connects the original request to a relevant suggestion and settled plan; later sections explain the capabilities. The outcome band returns attention to time together.
- Rhythm: alternate wide browsing, focused examples, a paired comparison, and photography. No automatic motion or repeated celebration.
- Copy stays about the user's life and the product. Design rationale is recorded here, not placed in customer-facing copy.

Names, venues, dates, guest counts, and product states are illustrative. No invented ratings or testimonials. This is a static design study, not a usability-tested interactive prototype.

## Hero refinement

Uses the supplied headline and supporting copy at a large, bold scale. Four cards adapt the supplied stacked graphic: a plain-language request, one suggestion with its reason (you and your friends like games), the resulting plan with three attendees and a Going state, then a chat reply. The citrus suggestion leads; white supporting cards step inward slightly. A faint connecting line and lilac circle carry the sequence without animation or extra panels. Mobile cards align to preserve readable text.

## Hero variations (right-hand graphic only)

Three hero-only screens sit to the right of F on the canvas: `website-v2-landing-f-hero-1.html`, `-2.html`, `-3.html`. Each keeps the same copy, nav, and route strip and changes only the right-hand object. All three consolidate the four steps (request, suggestion, plan, reply), enlarge the type, align edges, put the lilac dot texture and two light rings behind the object, and lift it with a perspective tilt plus a soft ground shadow beneath. Static CSS only, no motion.

- Hero 1, one panel: a single white panel holds the whole sequence as one readable object. Strongest "one thing to look at" read.
- Hero 2, layered deck: the citrus suggestion leads on its own plane; the plan and reply step forward in front of it, the request sits behind. Most depth.
- Hero 3, tilted board: the texture becomes a lilac board tilted in perspective, and the cards hover above it at different heights. Most playful, and the texture is part of the object rather than behind it.

Shared classes use the `mrfh-` prefix in company.css. The tilt is removed under 700px so cards stack flat and stay legible.

## Flip variation

`website-v2-landing-f-flip.html` sits to the right of the hero variations and leaves F itself unchanged. The plan row under the suggestion is removed because the suggestion already carries the same information; the request stays above and the reply stays below. The citrus suggestion card turns over on a 12 second CSS cycle through three ideas (a game night in, jazz night, a ridge walk), and the reply below changes with it so the name, event, and message always match. This is CSS keyframes only, no JavaScript. It departs from the "no automatic motion" rule in the review contract on purpose, as a study; reduced-motion users see the first idea and reply with no animation.
