$extensions = @("*.jsx", "*.js", "*.css", "*.html", "*.json")
$path = "C:\Users\ToonZ\.gemini\antigravity\scratch\elitecrete_app"

Get-ChildItem -Path $path -Recurse -File -Include $extensions | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $original = $content
    
    if ($content -match 'Elite Crete Systems' -or $content -match '\bElite Crete\b(?!\.com)') {
        $content = $content -replace 'Elite Crete Systems', 'Elite South Texas'
        $content = $content -replace '\bElite Crete\b(?!\.com)', 'Elite South Texas'
        
        if ($content -ne $original) {
            Set-Content -Path $_.FullName -Value $content -NoNewline
            Write-Host "Updated $($_.FullName)"
        }
    }
}
