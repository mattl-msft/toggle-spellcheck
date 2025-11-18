// Get references to UI elements
const toggleButton = document.getElementById('toggleButton');

// Initialize the UI with the current state
async function initializeUI() {
	try {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		// Get the current spellcheck state from storage
		const result = await chrome.storage.local.get(['spellcheckEnabled']);
		const isEnabled =
			result.spellcheckEnabled !== undefined ? result.spellcheckEnabled : false;

		updateUI(isEnabled);
	} catch (error) {
		console.error('Error initializing UI:', error);
	}
}

// Update UI elements based on spellcheck state
function updateUI(isEnabled) {
	if (isEnabled) {
		toggleButton.textContent = 'Spell check is: ON';
		toggleButton.className = 'toggle-button on';
	} else {
		toggleButton.textContent = 'Spell check is: OFF';
		toggleButton.className = 'toggle-button off';
	}
}

// Toggle spellcheck on the current page
async function toggleSpellcheck() {
	try {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		// Get current state
		const result = await chrome.storage.local.get(['spellcheckEnabled']);
		const currentState =
			result.spellcheckEnabled !== undefined ? result.spellcheckEnabled : false;
		const newState = !currentState;

		// Save new state
		await chrome.storage.local.set({ spellcheckEnabled: newState });

		// Send message to content script to toggle spellcheck
		await chrome.tabs.sendMessage(tab.id, {
			action: 'toggleSpellcheck',
			enabled: newState,
		});

		// Update UI
		updateUI(newState);
	} catch (error) {
		console.error('Error toggling spellcheck:', error);
		// If there's an error (like the content script not being ready), try injecting it
		try {
			const [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});
			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ['content.js'],
			});
			// Try the toggle again
			setTimeout(() => toggleSpellcheck(), 100);
		} catch (injectError) {
			console.error('Error injecting content script:', injectError);
		}
	}
}

// Add event listener to the toggle button
toggleButton.addEventListener('click', toggleSpellcheck);

// Initialize the UI when the popup opens
initializeUI();
