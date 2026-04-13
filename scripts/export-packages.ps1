# Requires adb in PATH or run from Android SDK platform-tools folder:
#   .\export-packages.ps1
# Copies `pm list packages -f` output to the clipboard (Windows).

$ErrorActionPreference = "Stop"

if (-not (Get-Command adb -ErrorAction SilentlyContinue)) {
    Write-Host "adb not found. Add platform-tools to PATH or run:" -ForegroundColor Yellow
    Write-Host '  & "D:\path\to\platform-tools\adb.exe" shell pm list packages -f | Set-Clipboard'
    exit 1
}

$output = adb shell pm list packages -f 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host $output
    exit $LASTEXITCODE
}

Set-Clipboard -Value $output -ErrorAction Stop
$lines = ($output -split "`r?`n").Where({ $_ -ne "" }).Count
Write-Host "Copied $lines lines to clipboard. Paste into Android Package Advisor." -ForegroundColor Green
