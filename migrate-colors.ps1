# Color Migration Script
# This script replaces cyan colors with emerald-teal colors

$files = Get-ChildItem -Path "src" -Include *.jsx,*.js -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace cyan with emerald
    $content = $content -replace 'cyan-500', 'emerald-500'
    $content = $content -replace 'cyan-400', 'emerald-400'
    $content = $content -replace 'cyan-600', 'teal-600'
    $content = $content -replace 'cyan-300', 'emerald-300'
    $content = $content -replace 'cyan-700', 'teal-700'
    
    # Replace blue with teal
    $content = $content -replace 'blue-600', 'teal-500'
    $content = $content -replace 'blue-700', 'teal-600'
    $content = $content -replace 'blue-500', 'teal-400'
    $content = $content -replace 'blue-800', 'teal-700'
    
    # Save the file
    Set-Content -Path $file.FullName -Value $content
}

Write-Host "Color migration complete!" -ForegroundColor Green
Write-Host "Replaced cyan colors with emerald-teal across all JSX files." -ForegroundColor Green
