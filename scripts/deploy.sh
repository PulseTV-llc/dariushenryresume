#!/usr/bin/env bash
# Deploy the website with the Vercel CLI, safely.
#   scripts/deploy.sh            -> a PREVIEW deployment (any branch)
#   scripts/deploy.sh --prod     -> PRODUCTION, only from a clean `main` that matches origin/main
# Refuses `--prod` from any other branch, and checks that this folder is linked to the website project
# (portfolio-site), never to another project such as vexaos-iot. Use this instead of calling `vercel --prod`.
set -euo pipefail
cd "$(dirname "$0")/.."
project=$(node -e "try{console.log(require('./.vercel/project.json').projectName)}catch{console.log('')}")
if [ "$project" != "portfolio-site" ]; then
  echo "✖ This folder is linked to Vercel project '${project:-none}', not portfolio-site. Not deploying." >&2; exit 1
fi
branch=$(git rev-parse --abbrev-ref HEAD)
if [[ " $* " == *" --prod "* || " $* " == *" --production "* || " $* " == *" --target production "* || " $* " == *" --target=production "* ]]; then
  if [ "$branch" != "main" ]; then
    echo "✖ Refusing a production deploy from branch '$branch'. vexaos.io deploys only from main." >&2; exit 1
  fi
  if [ -n "$(git status --porcelain)" ]; then echo "✖ main has uncommitted changes. Not deploying." >&2; exit 1; fi
  git fetch -q origin main
  if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then echo "✖ main is not the same as origin/main. Not deploying." >&2; exit 1; fi
fi
exec vercel deploy "$@" --scope darius-henrys-projects
