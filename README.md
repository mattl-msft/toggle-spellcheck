# Toggle Spellcheck Browser Extension

A simple browser extension for Chrome and Microsoft Edge that allows you to toggle spellcheck on/off for all text input fields and contenteditable elements on any webpage.

## Features

- 🔄 Toggle spellcheck on/off with a single click
- 📝 Works with text inputs, `textareas`, and `contenteditable` elements
- 💾 Remembers your preference across pages
- 🚀 Automatically applies to dynamically added elements
- 🎨 Clean and simple user interface

## Installation

### Chrome / Edge

1. Clone or download this repository to your local machine
2. Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" using the toggle in the top right corner
4. Click "Load unpacked"
5. Select the `toggle-spellcheck` folder
6. The extension icon should now appear in your browser toolbar

## Usage

1. Navigate to any webpage with text input fields
2. Click the extension icon in your browser toolbar
3. Click the toggle button to turn spellcheck ON or OFF
4. The current state is displayed in the popup
5. All text fields on the page will be updated immediately

## How It Works

The extension:

- Finds all `<input>`, `<textarea>`, and elements with `contenteditable` attributes
- Sets the `spellcheck` attribute to either `true` or `false`
- Monitors the page for dynamically added elements and applies the setting automatically
- Stores your preference using Chrome's storage API

## Files Structure

```
toggle-spellcheck/
├── manifest.json       # Extension configuration
├── popup.html          # Popup UI structure
├── popup.css           # Popup styling
├── popup.js            # Popup logic and messaging
├── content.js          # Content script for page manipulation
├── icons/              # Extension icons (need to be added)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

## Browser Compatibility

- ✅ Google Chrome (Manifest V3)
- ✅ Microsoft Edge (Manifest V3)
- ✅ Other Chromium-based browsers

## Permissions

The extension requires the following permissions:

- `activeTab`: To access the current tab
- `scripting`: To inject the content script
- `storage`: To remember your spellcheck preference

## Development

To modify the extension:

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## License

This project is licensed under the GNU General Public License version 3 (GPL-3.0). You may copy, modify, and redistribute the code under the terms of that license.

Key points:

- Copyleft: Derivative works must also be distributed under GPL-3.0.
- No warranty: Provided "as is" without any guarantee.
- Patent protection: Includes explicit patent grants from contributors.

See the `LICENSE` file for the complete text. If you contribute, you agree your contributions are licensed under GPL-3.0.

If you need a permissive (non-copyleft) alternative, open an issue to discuss dual-licensing possibilities.
