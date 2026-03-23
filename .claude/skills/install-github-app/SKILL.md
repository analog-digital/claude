---
name: install-github-app
description: Install the Claude Code GitHub App on a repository. Use when the user wants to connect their GitHub repository to Claude Code, set up the GitHub App integration, or enable Claude to respond to GitHub issues and pull requests.
---

# Install GitHub App Skill

Guide the user through installing the Claude Code GitHub App on their GitHub repository so Claude can interact with issues, pull requests, and other GitHub events.

## Workflow

Make a todo list for all the tasks in this workflow and work on them one after another.

### 1. Detect Repository Info

Find the current repository's GitHub remote:

```bash
git remote get-url origin
```

Parse the owner and repo name from the URL (handles both HTTPS and SSH formats):
- `https://github.com/owner/repo.git` → owner/repo
- `git@github.com:owner/repo.git` → owner/repo

### 2. Check GitHub CLI Authentication

```bash
gh auth status
```

If not authenticated, prompt the user to run `gh auth login` first.

### 3. Check if App is Already Installed

```bash
gh api /repos/{owner}/{repo}/installation 2>/dev/null && echo "installed" || echo "not installed"
```

If already installed, inform the user and skip to step 6.

### 4. Display Installation Instructions

Tell the user:

> To install the Claude Code GitHub App on **{owner}/{repo}**:
>
> 1. Visit the GitHub App installation page
> 2. Click **Install** or **Configure**
> 3. Select **Only select repositories** and choose **{repo}**
> 4. Click **Install**

Provide the installation URL using:
```
https://github.com/apps/claude/installations/new?suggested_target_id={owner}
```

Ask the user to open this URL in their browser and complete the installation, then confirm when done.

### 5. Verify Installation

After the user confirms, verify the app is installed:

```bash
gh api /repos/{owner}/{repo}/installation
```

If this returns a valid installation object, the app is installed successfully.
If it fails, check:
- Was the correct repository selected?
- Does the user have admin access to the repository?

### 6. Confirm Repository Settings

Check that the repository has the necessary configuration:

```bash
ls .claude/settings.json 2>/dev/null && echo "exists" || echo "missing"
```

If `.claude/settings.json` is missing, inform the user they may want to run `/session-start-hook` to set up their project configuration.

### 7. Summary

Provide a summary with:
- ✅/‼️ GitHub App installation status
- Repository it was installed on
- Next steps (e.g., the app will now respond to issues and PRs on that repo)

## Notes

- The user must have **admin** or **owner** permissions on the repository to install the GitHub App
- If installing on an organization repository, an org admin may need to approve the installation
- Once installed, the app can be managed at: `https://github.com/settings/installations` (personal) or `https://github.com/organizations/{org}/settings/installations` (org)
