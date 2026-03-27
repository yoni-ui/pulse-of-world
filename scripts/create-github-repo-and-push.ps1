# Creates github.com/<Owner>/<Repo> via API, then pushes branch main to remote "pulse".
# Requires: a Personal Access Token with "repo" scope.
#   https://github.com/settings/tokens  →  Generate new token (classic)  →  enable "repo"
#
# Usage (PowerShell):
#   $env:GITHUB_TOKEN = "ghp_xxxxxxxx"
#   .\scripts\create-github-repo-and-push.ps1
#
# Or:
#   .\scripts\create-github-repo-and-push.ps1 -Token "ghp_xxxxxxxx"

param(
  [string] $Token = $env:GITHUB_TOKEN,
  [string] $Owner = "yyishak",
  [string] $Repo = "pulse-of-world",
  [string] $Branch = "main",
  [string] $RemoteName = "pulse"
)

$ErrorActionPreference = "Stop"

if (-not $Token) {
  Write-Host "Set GITHUB_TOKEN or pass -Token (see script header)." -ForegroundColor Red
  exit 1
}

$headers = @{
  Authorization = "Bearer $Token"
  Accept        = "application/vnd.github+json"
  "User-Agent"  = "pulse-of-world-create-script"
}

$body = @{
  name        = $Repo
  description = "PulseOfGlobe AI — real-time global intelligence platform"
  private     = $false
  auto_init   = $false
} | ConvertTo-Json

$uri = "https://api.github.com/user/repos"

try {
  Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body -ContentType "application/json" | Out-Null
  Write-Host "Created https://github.com/$Owner/$Repo" -ForegroundColor Green
} catch {
  $err = $_.ErrorDetails.Message
  if ($err -match "already exists" -or $_.Exception.Response.StatusCode -eq 422) {
    Write-Host "Repo may already exist; continuing to push." -ForegroundColor Yellow
  } else {
    throw
  }
}

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

git remote set-url $RemoteName "https://github.com/$Owner/$Repo.git"
git push -u $RemoteName $Branch

Write-Host "Done." -ForegroundColor Green
