# Device setup (short reference)

Full illustrated guide: open [device-setup.html](device-setup.html) in a browser.

## Quick steps

1. **Enable Developer Options** — Settings → About phone → Software information → tap **Build number** 7 times.
2. **Enable USB debugging** — Settings → Developer options → USB debugging → ON.
3. **Install ADB** on your PC from [developer.android.com/studio/releases/platform-tools](https://developer.android.com/studio/releases/platform-tools).
4. **Connect** phone via USB data cable → accept the "Allow USB debugging?" prompt on the phone screen.
5. **Verify**: run `adb devices` — device should show as `device` (not `unauthorized`).
6. **Export packages** and paste into the advisor:
   - Windows: `.\adb.exe shell pm list packages -f | Set-Clipboard`
   - macOS/Linux: `adb shell pm list packages -f | pbcopy`

## Restore a removed package

```
adb shell cmd package install-existing com.example.package
```

## After you are done

Turn **USB debugging off** again: Settings → Developer options → USB debugging → OFF.
