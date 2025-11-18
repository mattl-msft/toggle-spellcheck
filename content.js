// Function to find all spellcheckable elements on the page
function getSpellcheckableElements() {
	const elements = [];

	// Find all text input fields
	const textInputs = document.querySelectorAll(
		'input[type="text"], input[type="email"], input[type="search"], input[type="url"], input:not([type])'
	);
	elements.push(...textInputs);

	// Find all textarea elements
	const textareas = document.querySelectorAll('textarea');
	elements.push(...textareas);

	// Find all contenteditable elements
	const contentEditables = document.querySelectorAll(
		'[contenteditable="true"], [contenteditable=""]'
	);
	elements.push(...contentEditables);

	return elements;
}

// Function to set spellcheck attribute on all elements
function setSpellcheck(enabled) {
	const elements = getSpellcheckableElements();
	const value = enabled ? 'true' : 'false';

	elements.forEach((element) => {
		element.setAttribute('spellcheck', value);
	});

	console.log(
		`Spellcheck ${enabled ? 'enabled' : 'disabled'} for ${
			elements.length
		} elements`
	);
	return elements.length;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'toggleSpellcheck') {
		const count = setSpellcheck(message.enabled);
		sendResponse({ success: true, count: count });
	}
	return true; // Keep the message channel open for async response
});

// Initialize spellcheck state when the page loads
async function initializeSpellcheck() {
	try {
		const result = await chrome.storage.local.get(['spellcheckEnabled']);
		const isEnabled =
			result.spellcheckEnabled !== undefined ? result.spellcheckEnabled : false;
		setSpellcheck(isEnabled);
	} catch (error) {
		console.error('Error initializing spellcheck:', error);
	}
}

// Observe DOM changes to apply spellcheck to dynamically added elements
const observer = new MutationObserver(async (mutations) => {
	// Check if any new text inputs or contenteditable elements were added
	let shouldUpdate = false;

	for (const mutation of mutations) {
		if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
			for (const node of mutation.addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					// Check if the added node or its descendants contain spellcheckable elements
					if (
						node.matches &&
						(node.matches('input, textarea, [contenteditable]') ||
							node.querySelector('input, textarea, [contenteditable]'))
					) {
						shouldUpdate = true;
						break;
					}
				}
			}
		}
		if (shouldUpdate) break;
	}

	if (shouldUpdate) {
		try {
			const result = await chrome.storage.local.get(['spellcheckEnabled']);
			const isEnabled =
				result.spellcheckEnabled !== undefined
					? result.spellcheckEnabled
					: false;
			setSpellcheck(isEnabled);
		} catch (error) {
			console.error('Error updating spellcheck on DOM change:', error);
		}
	}
});

// Start observing the document for changes
observer.observe(document.body, {
	childList: true,
	subtree: true,
});

// Initialize spellcheck when the script loads
initializeSpellcheck();
