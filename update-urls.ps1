$path = "C:\Users\ToonZ\.gemini\antigravity\scratch\elitecrete_app\src"
Get-ChildItem -Path $path -Recurse -File -Include *.jsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'http://localhost:3001') {
        $content = $content -replace 'http://localhost:3001', ''
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "Updated $($_.FullName)"
    }
}
