# ÆTHER — Git Branching Strategy

## Branch Structure
main        → production. Auto-deploys to Vercel. Never push here directly.
dev         → staging. Has its own Vercel preview URL. 
feature/*   → individual features. Always branch from dev.
fix/*       → bug fixes. Branch from dev.
hotfix/*    → critical production fixes only. Branch from main.

## Workflow For Every Feature
1. git checkout dev
2. git pull origin dev
3. git checkout -b feature/feature-name
4. Build the feature with Claude Code
5. git add .
6. git commit -m "feat: description of what was built"
7. git push origin feature/feature-name
8. Merge into dev when complete and tested

## Commit Message Format
feat:     new feature added
fix:      bug fixed
style:    design/CSS changes only
refactor: code restructure, no behaviour change
docs:     markdown files updated
config:   environment or config changes

## Rules
- Never commit .env.local
- Never push directly to main
- Test on dev preview URL before merging to main
- Every Claude Code session states which branch it is working on
