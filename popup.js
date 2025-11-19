// Get references to UI elements
const toggleButton = document.getElementById('toggleButton');

// Initialize the UI with the current state
async function initializeUI() {
	try {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		// Check if spellcheck has been activated for this tab
		const tabKey = `activated_${tab.id}`;
		const result = await chrome.storage.session.get([tabKey, 'spellcheckEnabled']);
		const isActivated = result[tabKey] || false;
		
		if (!isActivated) {
			// Not activated yet - show unactivated state
			updateUI('unactivated');
		} else {
			// Already activated - show current on/off state
			const isEnabled = result.spellcheckEnabled !== undefined ? result.spellcheckEnabled : true;
			updateUI(isEnabled ? 'on' : 'off');
		}
	} catch (error) {
		console.error('Error initializing UI:', error);
	}
}

// Update UI elements based on spellcheck state
function updateUI(state) {
	if (state === 'on') {
		toggleButton.textContent = 'Spell check is: ON';
		toggleButton.className = 'toggle-button on';
	} else if (state === 'off') {
		toggleButton.textContent = 'Spell check is: OFF';
		toggleButton.className = 'toggle-button off';
	} else if (state === 'unactivated') {
		toggleButton.textContent = 'Activate spell check';
		toggleButton.className = 'toggle-button unactivated';
	}
}

// Toggle spellcheck on the current page
async function toggleSpellcheck() {
	try {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		// Check if spellcheck has been activated for this tab
		const tabKey = `activated_${tab.id}`;
		const result = await chrome.storage.session.get([tabKey, 'spellcheckEnabled']);
		const isActivated = result[tabKey] || false;
		
		let newState;
		if (!isActivated) {
			// First activation - turn spellcheck on
			newState = true;
			await chrome.storage.session.set({ [tabKey]: true, spellcheckEnabled: true });
		} else {
			// Already activated - toggle between on and off
			const currentState = result.spellcheckEnabled !== undefined ? result.spellcheckEnabled : true;
			newState = !currentState;
			await chrome.storage.session.set({ spellcheckEnabled: newState });
		}

		// Send message to content script to toggle spellcheck
		await chrome.tabs.sendMessage(tab.id, {
			action: 'toggleSpellcheck',
			enabled: newState,
		});

		// Update UI
		updateUI(newState ? 'on' : 'off');
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
