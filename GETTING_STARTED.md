# Getting Started with Design Core

Design Core is a visual design tool for teams. You prompt AI to build interactive prototypes and screens -- no coding needed.

Pick your path below:

- **Setting up for your company?** You're the first person bringing Design Core to your org. Start at [Company Setup](#company-setup).
- **Joining your team's repo?** Your company already has Design Core and someone shared a link with you. Skip to [Designer Setup](#designer-setup).

---

## Company Setup

You're setting up Design Core for your organization for the first time.

### Step 1: Fork the repo

1. Click the **Fork** button at the top of this GitHub page
2. Choose your company's GitHub organization as the owner
3. Keep the repo name as `design-core` (or rename it -- up to you)
4. Click **Create fork**

You now have your own copy at `https://github.com/YOUR_ORG/design-core`

### Step 2: Download Cursor + Node.js

**[Download Cursor](https://www.cursor.com)** -- the AI-powered editor that runs Design Core. Install it, default settings are fine.

**[Download Node.js](https://nodejs.org)** -- click the **LTS** button. Install with defaults.

### Step 3: Paste this into Cursor

Open Cursor, press **Cmd+L** (Mac) or **Ctrl+L** (Windows) to open the AI chat, and paste:

```
I'm setting up Design Core for my company for the first time. Please help me:

1. Clone our forked repo to my computer
2. Install dependencies
3. Set up my identity and company info
4. Start the preview server and walk me through the tool

Our repo is at: https://github.com/YOUR_ORG/design-core.git
```

> Replace `YOUR_ORG` with your GitHub organization name.

The AI will clone the repo, ask your name and company, set everything up, and walk you through the tool.

### Step 4: Share with your team

Once you're set up, share the link to **your fork's** Getting Started page with your designers:

```
https://github.com/YOUR_ORG/design-core/blob/main/GETTING_STARTED.md#designer-setup
```

They'll follow the Designer Setup below.

---

## Designer Setup

Your company already has Design Core. Someone shared a repo link with you.

### Step 1: Download Cursor + Node.js

**[Download Cursor](https://www.cursor.com)** -- the AI-powered editor you'll use. Install it, default settings are fine.

**[Download Node.js](https://nodejs.org)** -- click the **LTS** button. Install with defaults.

### Step 2: Paste this into Cursor

Open Cursor, press **Cmd+L** (Mac) or **Ctrl+L** (Windows) to open the AI chat, and paste:

```
I'm joining my team's Design Core repo. Please help me get set up:

1. Clone the repo to my computer
2. Install dependencies
3. Set up my designer identity
4. Start the preview server and show me around

The repo is at: https://github.com/YOUR_ORG/design-core.git
```

> Replace `YOUR_ORG` with your company's GitHub organization name (your admin can tell you this).

The AI will clone the repo, ask your name, set up your identity, and walk you through the tool.

---

## What happens next?

Whether you're an admin or a designer, once setup is done you just chat with the AI to build things:

- *"Create a new project called Mobile App Redesign"*
- *"Build a login screen with email and password fields"*
- *"Make an interactive onboarding flow with 3 steps"*

---

## Quick reference

| What | How |
|---|---|
| Open AI chat | **Cmd+L** (Mac) or **Ctrl+L** (Windows) |
| Open terminal | **Ctrl+`** (backtick, the key above Tab) |
| Start preview server | `npm run dev` in terminal |
| Stop preview server | **Ctrl+C** in terminal |
| See your designs | Browser at the URL shown in terminal |
| Save to Git | Source Control sidebar → type message → checkmark → sync |

---

## Troubleshooting

**"npm: command not found"**
→ Node.js isn't installed. Go back and download it from [nodejs.org](https://nodejs.org).

**"npm run dev" shows an error**
→ Make sure you ran `npm install` first. Close the terminal, open a new one, try again.

**Browser shows blank page**
→ Check the terminal says "VITE ready" and the URL matches. Try **Cmd+Shift+R** to hard refresh.
