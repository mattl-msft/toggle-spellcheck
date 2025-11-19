# Toggle Spellcheck Browser Extension

A simple browser extension for Chrome and Microsoft Edge that allows you to toggle spellcheck on/off for all text input fields and contenteditable elements on any webpage.

## Features

- 🔄 Three-state toggle: Unactivated → ON → OFF → ON...
- 📝 Works with text inputs, `textareas`, and `contenteditable` elements
- 🔄 Resets to unactivated state on page refresh
- 🚀 Automatically applies to dynamically added elements (once activated)
- 🎨 Clean and simple user interface with color-coded states

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
3. **First time on page**: You'll see a gray button saying "Activate spell check"
4. **First click**: Activates spellcheck and turns it ON (green button)
5. **Subsequent clicks**: Toggle between ON (green) and OFF (red)
6. **Refresh page**: Returns to the unactivated state (gray button)

### State Behavior

- **🔘 Gray (Unactivated)**: Default state on page load. Spellcheck is not applied to any fields.
- **🟢 Green (ON)**: Spellcheck is actively checking all text fields, textareas, and contenteditable elements.
- **🔴 Red (OFF)**: Spellcheck is disabled for all text fields, textareas, and contenteditable elements.

Note: Each page refresh resets the extension to the unactivated state, requiring you to activate spellcheck again if needed.

## How It Works

The extension operates in three states:

1. **Unactivated (Default)**: When you first load a page, the extension is in an unactivated state. No spellcheck attributes are applied to page elements.

2. **Activated - ON**: After clicking "Activate spell check", the extension:
   - Finds all `<input>`, `<textarea>`, and elements with `contenteditable` attributes
   - Sets the `spellcheck` attribute to `true`
   - Monitors the page for dynamically added elements and applies the setting automatically

3. **Activated - OFF**: Clicking again toggles to OFF state:
   - Sets the `spellcheck` attribute to `false` on all applicable elements
   - Continues monitoring for new elements

The activation state is tracked per-tab using session storage, which automatically clears when you refresh the page or navigate to a new page, returning you to the unactivated state.

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
