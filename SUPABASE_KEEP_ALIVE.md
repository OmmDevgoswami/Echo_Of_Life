# 🛡️ Supabase Keep-Alive Guide

Supabase automatically pauses free tier projects if they have **no activity for 7 days**. To prevent your `EchoOfLife` project from being paused and losing immediate access to your data, we've implemented an automated "ping" system.

## 1. ✅ What we've done so far

1.  **Created a Ping Script**: `scripts/keep_alive.js` - This script performs a simple read from your `posts` table to generate activity.
2.  **Created a GitHub Workflow**: `.github/workflows/keep_alive.yml` - This will run the script automatically every **5 days** once you push it to GitHub.
3.  **Manual Ping**: I just ran the script for you! 🌟 Your database is now recorded as **active** as of today.

## 2. 🚀 Remaining Steps (Your Turn)

To ensure this continues automatically, you need to do the following:

### A. Add GitHub Secrets
Since your `.env` file is not pushed to GitHub (for security), you need to tell GitHub what your Supabase keys are:
1.  Go to your repository on GitHub.
2.  **Settings** > **Secrets and variables** > **Actions**.
3.  Add two **New repository secrets**:
    -   `VITE_SUPABASE_URL`: `https://yilquaofguizxvojscuo.supabase.co`
    -   `VITE_SUPABASE_ANON_KEY`: `eyJhbGci...GWXmY` (The full key from your `.env`)

### B. Push the Changes
Open your terminal and run:
```bash
git add scripts/keep_alive.js .github/workflows/keep_alive.yml
git commit -m "chore: add supabase keep-alive workflow"
git push
```

## 3. 💡 Other Ways to Stay Active

If you don't use the GitHub Action, you can keep the project active manually by:
-   **Visiting the Dashboard**: Simply log in to the [Supabase Dashboard](https://supabase.com/dashboard) and browse your tables once a week.
-   **Usage**: Editing a post, adding a comment, or just visiting your live site will also count as activity if it triggers a database request.

> [!TIP]
> I've set the schedule to run every **5 days** to give ourselves a 2-day buffer before the 7-day limit hits!

---
**Your project is safe for now!** Just make sure to finish the GitHub setup above to keep it that way forever.
