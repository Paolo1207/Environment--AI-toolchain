# FE-01 Setup Checklist

Do these on your own computer. Tick each box as you go.

## 1. Install tools

- [ ] Node.js LTS from https://nodejs.org, then check: `node -v` and `npm -v`
- [ ] Git from https://git-scm.com, then check: `git --version`
- [ ] Editor: VS Code (https://code.visualstudio.com) or Cursor
- [ ] Claude Code: follow the install steps at https://code.claude.com/docs/en/overview, then run `claude` in a terminal and sign in
- [ ] Tell Git who you are (use the same email as your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

## 2. Create the repo on GitHub

- [ ] On github.com click New repository, name it (e.g. `fe-capstone`), set it Public, leave "Add README / .gitignore / license" UNCHECKED (you have your own files), create it.

## 3. Add the starter files and make three commits

Copy README.md, LICENSE, .gitignore and CLAUDE.md into a new folder, then edit the placeholders: your name in `LICENSE`, project name and pitch in `README.md`, and the stack in `CLAUDE.md`.

```bash
mkdir fe-capstone && cd fe-capstone
# copy the 4 files in here
git init
git add README.md
git commit -m "docs: add README stub"

git add LICENSE .gitignore
git commit -m "chore: add MIT license and gitignore"

git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with stack and conventions"

git branch -M main
git remote add origin https://github.com/<your-username>/fe-capstone.git
git push -u origin main
```

Format rule: `type(optional-scope): short summary`. Types: feat, fix, docs, style, refactor, test, chore. Lowercase, no trailing period.

## 4. Ask Claude Code to critique your README

In the repo folder, run `claude` and send:

```
Read README.md and critique it for a recruiter or reviewer who has 30 seconds.
List the top 3 weaknesses, then apply the single most valuable improvement
directly to the file. Do not commit.
```

Review the diff (`git diff`), then commit it yourself so your history stays clean:

```bash
git add README.md
git commit -m "docs: improve README based on AI critique"
git push
```

## 5. Screenshot

Take a screenshot of the terminal (or Cursor panel) while Claude Code is mid-task or has just finished, with these visible: the prompt you sent, Claude's response or edit, and the repo/folder name. Crop out anything private.

## 6. Submit

- Repo URL: `https://github.com/<your-username>/fe-capstone`
- Screenshot file

## Final check before submitting

- [ ] Repo is public and the URL opens when logged out
- [ ] README, LICENSE and CLAUDE.md are visible at the repo root
- [ ] `git log --oneline` shows at least 3 Conventional Commits
- [ ] No placeholder text like `<Your Full Name>` is left
- [ ] Screenshot clearly shows Claude Code or Cursor doing a task
