# Getting Started — Design Core

Welcome! This guide will get you from zero to creating screens and prototypes in about 10 minutes. No coding experience needed.

---

## 1. Install Cursor

Cursor is the editor you'll use to create and preview screens. It has built-in AI that helps you design.

1. Go to [cursor.com](https://www.cursor.com) and download Cursor for your computer (Mac, Windows, or Linux)
2. Open the installer and follow the prompts
3. When it asks about settings, the defaults are fine — just click through

---

## 2. Install Node.js

Node.js runs the preview server so you can see your screens in a browser.

1. Go to [nodejs.org](https://nodejs.org) and download the **LTS** version (the green button)
2. Open the installer and follow the prompts
3. To verify it worked, open Cursor's terminal (see step 4) and type `node --version` — you should see a version number

---

## 3. Clone the project

"Cloning" downloads the project files to your computer.

1. Open Cursor
2. Click **File → Open Folder** (or **Cmd+O** on Mac)
3. If you don't have the project yet:
   - Open the terminal in Cursor: press **Ctrl+`** (backtick, the key above Tab)
   - Navigate to where you want the project:
     ```
     cd ~/Documents
     ```
   - Clone the repo:
     ```
     git clone https://github.com/YOUR_ORG/design-core.git
     ```
   - Then open that folder in Cursor: **File → Open Folder → Documents → design-core**

---

## 3b. Set your designer name (optional)

So that new projects show you as the creator (e.g. "Ben" on the home page):

1. Copy the example file: `.designer.example` → `.designer` (same folder as the project)
2. Open `.designer` and replace `"Your Name"` with your name

The `.designer` file is not committed to git, so each designer can have their own. If you skip this, you can still edit `project.json` and `data/projects/index.json` by hand when you create a project.

---

## 4. Start the preview server

This lets you see your work in a browser with live reload — changes appear instantly.

1. Open the terminal in Cursor: press **Ctrl+`** (backtick key)
2. The first time only, install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm run dev
   ```
4. You'll see something like:
   ```
   VITE ready in 300 ms
   ➜ Local: http://localhost:3000/
   ```
5. Open that URL in your browser (Chrome, Safari, etc.)
6. **Leave the terminal running.** Don't close it while you're working.

To stop the server later, click in the terminal and press **Ctrl+C**.

---

## 5. Create a screen (for the canvas)

Canvas screens are static HTML files — no interactivity, just visual design exploration.

### Ask the AI (recommended)

1. Open the AI chat in Cursor: press **Cmd+L** (Mac) or **Ctrl+L** (Windows)
2. Type something like:

   > Create a settings screen for the sample-app project with a user avatar, name, and toggle switches for notifications and dark mode

3. The AI will create an HTML file in `public/data/projects/sample-app/screens/` using the design system
4. Check your browser — refresh the canvas page to see it

---

## 6. Create a prototype

Prototypes are **interactive mini web apps** — they have working forms, buttons, animations, and real behavior. This is the main feature of the tool.

### How to create one

1. Create a new folder: `public/data/projects/sample-app/prototypes/my-feature/`
2. Create `meta.json` inside it:
   ```json
   {
     "name": "My Feature",
     "description": "Description of what this prototype does"
   }
   ```
3. Add your prototype to the index: open `public/data/projects/sample-app/prototypes/index.json` and add an entry
4. Create `index.html` inside the folder — this is where the AI builds the interactive prototype
5. Open that `index.html` and prompt the AI:

   > Build a login flow with email validation, password strength meter, and a success animation

6. The AI writes the full interactive HTML/CSS/JS using the design system
7. Preview it: go to the project page and click your prototype

### Example prompts

- "Build a signup form with email, password, confirm password. Show inline validation. On submit, show a success screen with confetti."
- "Create a multi-step onboarding: welcome, pick interests, set profile photo, done."
- "Make a settings page with toggles for notifications, dark mode, and location sharing."
- "Build a search experience — type in a search bar, show filtered results below."

---

## 7. Edit a screen or prototype

### Using the AI

Open any file and press **Cmd+L** to chat with the AI. Try things like:

- "Add a search bar at the top"
- "Make the button animate on hover"
- "Add form validation to the email field"
- "Change the color scheme to use more teal accents"
- "Add a transition when switching between steps"

The AI knows the design system and will use the right colors, fonts, and components automatically.

---

## 8. Share your work

### Push to Git (publishes to GitHub Pages)

1. Click the **Source Control** icon in the left sidebar (it looks like a branch/fork)
2. You'll see your changed files listed
3. Type a short message describing what you did (e.g. "Add login prototype")
4. Click the **checkmark** button to commit
5. Click the **sync/push** button to push to the team

Once pushed to `main`, your prototypes are live at:
```
https://YOUR_ORG.github.io/design-core/prototype.html?project=sample-app&proto=YOUR_PROTOTYPE
```

### Copy a shareable link

On the project page, click **Copy link** next to any prototype. This gives you the direct URL.

---

## Quick reference

| What you want to do | How |
|---|---|
| Open AI chat | **Cmd+L** (Mac) or **Ctrl+L** (Windows) |
| Open terminal | **Ctrl+`** (backtick) |
| Start preview server | `npm run dev` in terminal |
| Stop preview server | **Ctrl+C** in terminal |
| See your changes | Check browser at http://localhost:3000 |
| Save to Git | Source Control sidebar → type message → checkmark → sync |
| Find a file | **Cmd+P** (Mac) or **Ctrl+P** (Windows), then type the filename |

---

## Where do my files go?

```
public/data/
  projects/
    sample-app/                     ← Your project
      screens/
        homepage.html               ← Static canvas screen
        discover.html               ← Another canvas screen
      canvas.json                   ← Screen positions on the canvas
      prototypes/
        index.json                  ← List of all prototypes
        onboarding/                 ← A prototype
          meta.json                 ← Name and description
          index.html                ← The interactive prototype (HTML/CSS/JS)
        settings-flow/              ← Another prototype
          meta.json
          index.html
```

**Key rules:**
- Canvas screens = HTML + CSS only (no JavaScript)
- Prototypes = interactive HTML + CSS + JavaScript
- When working on a prototype, only edit files inside that prototype's folder
- Don't edit files in `public/styles/` or other project folders unless asked

---

## Troubleshooting

**"npm: command not found"**
→ Node.js isn't installed. Go back to step 2.

**"npm run dev" shows an error**
→ Make sure you ran `npm install` first. If it still fails, close the terminal, open a new one, and try again.

**Browser shows a blank page**
→ Make sure the terminal says "VITE ready" and the URL matches what it shows. Try a hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows).

**"I accidentally edited the wrong file"**
→ No worries. In the terminal, run `git checkout -- path/to/file` to undo your changes. Or ask the AI: "Undo my changes to public/styles/shared.css".

---

## Tips

- **Be specific with the AI.** "Build a login form with email validation and a forgot password link" works better than "make a login".
- **Reference existing prototypes.** "Make it work like the onboarding prototype but for settings" helps the AI match the pattern.
- **Prototypes are interactive.** Don't be afraid to ask for working forms, animations, state changes, and transitions.
- **Save often.** Commit and push after each prototype so you don't lose work.
- **Preview on mobile.** Prototypes are displayed in a 390×844 phone frame. Resize your browser to test.
