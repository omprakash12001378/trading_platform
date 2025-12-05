# Git History Cleanup Script
# This script removes the old application.properties file with secrets from git history

Write-Host "=== Git History Cleanup ===" -ForegroundColor Cyan
Write-Host ""

# Check if git-filter-repo is installed
Write-Host "Checking for git-filter-repo..." -ForegroundColor Yellow
$filterRepoInstalled = $false

try {
    git filter-repo --version 2>$null
    $filterRepoInstalled = $true
    Write-Host "✓ git-filter-repo is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ git-filter-repo is not installed" -ForegroundColor Red
}

if (-not $filterRepoInstalled) {
    Write-Host ""
    Write-Host "Installing git-filter-repo..." -ForegroundColor Yellow
    
    # Try to install via pip
    try {
        pip install git-filter-repo
        Write-Host "✓ git-filter-repo installed successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to install git-filter-repo" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install manually:" -ForegroundColor Yellow
        Write-Host "1. Install Python if not already installed"
        Write-Host "2. Run: pip install git-filter-repo"
        Write-Host ""
        Write-Host "Alternative: Use the manual cleanup method below" -ForegroundColor Cyan
        Write-Host ""
        
        # Provide alternative method
        Write-Host "=== Alternative: Manual Cleanup ===" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Run these commands manually:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "# 1. Create a backup" -ForegroundColor Gray
        Write-Host "git clone . ../trading_platform_backup" -ForegroundColor White
        Write-Host ""
        Write-Host "# 2. Remove the file from the first commit" -ForegroundColor Gray
        Write-Host 'git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ''Backend-Spring boot/src/main/resources/application.properties''" --prune-empty --tag-name-filter cat -- --all' -ForegroundColor White
        Write-Host ""
        Write-Host "# 3. Clean up" -ForegroundColor Gray
        Write-Host "git reflog expire --expire=now --all" -ForegroundColor White
        Write-Host "git gc --prune=now --aggressive" -ForegroundColor White
        Write-Host ""
        Write-Host "# 4. Force push" -ForegroundColor Gray
        Write-Host "git push origin master --force" -ForegroundColor White
        
        exit 1
    }
}

Write-Host ""
Write-Host "=== Cleaning Git History ===" -ForegroundColor Cyan
Write-Host ""

# Backup first
Write-Host "Creating backup..." -ForegroundColor Yellow
$backupPath = "../trading_platform_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
git clone . $backupPath 2>$null
Write-Host "✓ Backup created at: $backupPath" -ForegroundColor Green

Write-Host ""
Write-Host "Removing old application.properties from history..." -ForegroundColor Yellow

# Remove the file from history (but keep the current version)
git filter-repo --path "Backend-Spring boot/src/main/resources/application.properties" --invert-paths --force

Write-Host "✓ File removed from git history" -ForegroundColor Green

Write-Host ""
Write-Host "=== Cleanup Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Verify the changes: git log --oneline" -ForegroundColor White
Write-Host "2. Re-add the remote: git remote add origin https://github.com/omprakash12001378/trading_platform.git" -ForegroundColor White
Write-Host "3. Force push: git push origin master --force" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  WARNING: Force push will rewrite history on GitHub" -ForegroundColor Yellow
Write-Host "   Only do this if you're the sole contributor or have coordinated with your team" -ForegroundColor Yellow
