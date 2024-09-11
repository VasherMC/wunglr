# wunglr
The hidden side of tumblr.

Click the <kbd>↶W</kbd> button to flip a post and see the hidden text written on the other side. Inspired by [this tumblr post by morphimus](https://www.tumblr.com/morphimus/710837261845037056/it-looked-kinda-like-this-the-post-would-be-the).

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
