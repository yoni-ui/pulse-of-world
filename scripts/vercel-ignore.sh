#!/bin/bash
# Vercel Ignored Build Step: exit 0 = skip, exit 1 = build
# Only build when web-relevant files change. Skip desktop, docs, scripts, CI, etc.

# Normalize branch name (Vercel usually sets VERCEL_GIT_COMMIT_REF to "main", not refs/heads/main)
REF="${VERCEL_GIT_COMMIT_REF##refs/heads/}"

# On main: skip only when we can diff against a *previous production deploy* and nothing web-relevant changed.
# If VERCEL_GIT_PREVIOUS_SHA is missing (first deploy, cache unavailable, or fresh project), we must NOT fall
# through to the "preview without PR" skip — that would cancel production builds with exit 0.
if [ "$REF" = "main" ]; then
  if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ] || ! git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null; then
    echo "Building: main (no valid VERCEL_GIT_PREVIOUS_SHA — first deploy or no prior build to compare)"
    exit 1
  fi
  WEB_CHANGES=$(git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" HEAD -- \
    'src/' 'api/' 'server/' 'shared/' 'public/' 'blog-site/' 'pro-test/' 'proto/' 'convex/' \
    'package.json' 'package-lock.json' 'vite.config.ts' 'tsconfig.json' \
    'tsconfig.api.json' 'vercel.json' 'middleware.ts' | head -1)
  [ -z "$WEB_CHANGES" ] && echo "Skipping: no web-relevant changes on main" && exit 0
  exit 1
fi

# Skip preview deploys that aren't tied to a pull request
[ -z "$VERCEL_GIT_PULL_REQUEST_ID" ] && exit 0

# Resolve comparison base: prefer VERCEL_GIT_PREVIOUS_SHA, fall back to merge-base with main
# (empty/invalid PREVIOUS_SHA caused false "build" on PRs that only touch scripts/)
COMPARE_SHA="$VERCEL_GIT_PREVIOUS_SHA"
if [ -z "$COMPARE_SHA" ] || ! git cat-file -e "$COMPARE_SHA" 2>/dev/null; then
  COMPARE_SHA=$(git merge-base HEAD origin/main 2>/dev/null)
fi
[ -z "$COMPARE_SHA" ] && exit 1

# Build if any of these web-relevant paths changed
git diff --name-only "$COMPARE_SHA" HEAD -- \
  'src/' \
  'api/' \
  'server/' \
  'shared/' \
  'public/' \
  'blog-site/' \
  'pro-test/' \
  'proto/' \
  'convex/' \
  'package.json' \
  'package-lock.json' \
  'vite.config.ts' \
  'tsconfig.json' \
  'tsconfig.api.json' \
  'vercel.json' \
  'middleware.ts' \
  | grep -q . && exit 1

# Nothing web-relevant changed, skip the build
exit 0
