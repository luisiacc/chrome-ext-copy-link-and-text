chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyContentAndLink") {
    const linkElement = document.activeElement;
    const content = linkElement.textContent || linkElement.innerText;
    const link = linkElement.href;

    chrome.runtime.sendMessage({
      action: "copyToClipboard",
      content: content,
      link: link,
    });
  }
});
