# Homepage / chat

Reworked around the simplicity guidance in `docs/game-feel-for-digital-products.md`, sections 6, 7, and 27H.

- Purpose: start or resume a conversation with Yarvy.
- Primary read: the message field and its invitation to talk.
- Necessary support: Send, three starting prompts, earlier messages, and familiar navigation.
- Optional depth: Tasks, Upcoming, Lists, and You remain labeled destinations. Task results, goals, memory, Copy, and Undo appear only when relevant to a conversation.
- State changes: sending retains the request and reveals the conversation above the composer. Stop replaces Send during a reply. Confirmed changes show the affected object and scoped Undo inline. Proposals use Add and never imply they are saved. Return restores the latest conversation and any draft.

This screen shows the homepage before a new message, not a topic-specific conversation or a planning dashboard. Its initial layout needs no preselected project or task. Once a conversation begins, the welcome and starting prompts yield to the messages; the composer remains the input anchor below them. Earlier messages expand within that conversation.

The canvas is static HTML/CSS. Runtime behavior is described here rather than simulated with decorative status or extra UI panels.
