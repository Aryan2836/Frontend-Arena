# Deploy Frontend Arena

Recommended repository name: `frontend-arena`

## Upload to GitHub

Create an empty repository on GitHub. Do not add a README, license or `.gitignore` on GitHub because these files already exist locally.

Run these commands inside the `frontend-arena` folder:

```bash
git init -b main
git add .
git commit -m "Launch Frontend Arena"
git remote add origin https://github.com/Aryan2836/frontend-arena.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Deploy with Vercel

1. Sign in to Vercel with GitHub.
2. Select **Add New > Project**.
3. Import the `frontend-arena` repository.
4. Keep **Framework Preset** as `Other`.
5. Keep **Root Directory** as `./`.
6. Leave Build Command and Output Directory empty.
7. Select **Deploy**.

After deployment, copy the production URL into the Live Demo line in `README.md`, commit it and push again.

## Future updates

```bash
git add .
git commit -m "Describe the update"
git push
```

Every push to `main` will create a new production deployment after the GitHub repository is connected to Vercel.
