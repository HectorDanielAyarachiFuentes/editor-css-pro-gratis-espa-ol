chrome.action.onClicked.addListener(function (tab) {
  // For security reasons, do not inject content scripts into chrome:// URLs
  if (tab.url.startsWith("chrome://")) {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["starter.js"],
  });
});