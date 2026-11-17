const SUCCESS_MARKERS = [
  "Authentication details received",
  "Authentication successful",
  "authorized",
  "You may close this window",
  "You may now close this browser tab",
];

function isSuccessPage() {
  const body = document.body?.innerText || "";
  return SUCCESS_MARKERS.some((marker) => body.includes(marker));
}

let closed = false;

function closeIfDone() {
  if (closed || !isSuccessPage()) return false;
  closed = true;
  chrome.runtime.sendMessage({ action: "closeTab" });
  return true;
}

// The success message may be rendered after load, so keep watching briefly.
if (!closeIfDone()) {
  const observer = new MutationObserver(() => {
    if (closeIfDone()) observer.disconnect();
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  setTimeout(() => observer.disconnect(), 30000);
}
