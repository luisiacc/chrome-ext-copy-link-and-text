// Create the context menu item
chrome.contextMenus.create({
  id: "copy-content-link",
  title: "Copy Content and Link",
  contexts: ["link"],
});

// Listen for the context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-content-link") {
    // Inject content script to get the link content
    chrome.tabs.executeScript(tab.id, { file: "content_script.js" }, () => {
      chrome.tabs.sendMessage(tab.id, { action: "copyContentAndLink" });
    });
  }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyToClipboard") {
    const { content, link } = request;
    const textToCopy = `${content} ${link}`;
    copyToClipboard(textToCopy);
  }
});

// Copy the provided text to the clipboard
function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = text;
  console.error(text);
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
