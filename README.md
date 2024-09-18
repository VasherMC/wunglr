# wunglr
The hidden side of tumblr. Inspired by [this tumblr post by morphimus](https://www.tumblr.com/morphimus/710837261845037056/it-looked-kinda-like-this-the-post-would-be-the).

Click the <kbd>↶W</kbd> button at the top right of a post to flip it, and see the hidden wungle text written on the other side.

You can also wungle the current text selection in the post editor, with the added <kbd>W↷</kbd> (Wungle)/<kbd>↶W</kbd> (Unwungle) buttons (only appear when selecting text).

If you want to remove wungle text and can't select the right text to unwungle in the post editor, you can use tumblr's HTML editor.

## Installation
Get from the [Chrome Web Store](https://chromewebstore.google.com/detail/wunglr/gbkaeeecnehigjlgdcogiimdbfgpoikd) or [Firefox Addon Marketplace](https://addons.mozilla.org/en-US/firefox/addon/wunglr/).

### Manual installation
Manual installation is also possible, but you will not receive any future updates.

Users of Chrome (and other chromium-based browsers, such as Edge, Opera, Brave, Vivaldi, etc) can download and install via Developer mode:
1. Download the `extension` folder to your device
2. Go to `chrome://extensions` and enable Developer mode (at top-right in Chrome)
3. Click the "Load Unpacked" button (at top-left in Chrome) and select the `extension` folder

Firefox users can only install as a Temporary extension,  which will be removed after closing the browser:
1. Download the `extension` folder to your device
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on" and select the `manifest.json` file


### Installation - New Xkit version
Assuming you have [New Xkit](https://github.com/new-xkit/XKit) installed:
1. Open the Xkit Editor:
   1. On tumblr, open your browser's Devtools (with the <kbd>F12</kbd> key or <kbd>Ctrl+Shift+J</kbd>)
   2. In the console, type (but do not press enter): `onbeforeunload=e=>''`
   3. Open the New Xkit menu and go to "Other" > "Advanced Settings" > "Xkit Editor"
   4. Click the "Open Editor" button
   5. To prevent tumblr from redirecting you, quickly:
      1. Click anywhere inside the editor
      2. Alt-tab to the Devtools Console
      3. Press Enter to input the line of code you typed earlier
      4. Wait for a popup saying something like "Leave site? Changes may not be saved", and Cancel it
2. In the Xkit editor, Click "New Extension" at the top left (Ctrl + E), and name it 'wunglr'
3. Go to the JSON (Ctrl + 4) tab, and delete the existing JSON
4. Paste the contents of [wunglr.json](new-xkit-7.9.2/wunglr.json)
5. Click "Save" on the left (Ctrl + S)
6. Refresh any tumblr tabs
