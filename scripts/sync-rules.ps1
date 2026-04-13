# Copy data/rules.json -> docs/data/rules.json (run after editing rules).
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "data\rules.json"
$dst = Join-Path $root "docs\data\rules.json"
Copy-Item -LiteralPath $src -Destination $dst -Force
Write-Host "Synced rules -> $dst"
