const body = document.body?.innerText || "";

if (
  body.includes("Authentication details received") ||
  body.includes("authorized") ||
  body.includes("You may close this window") ||
  body.includes("You may now close this browser tab")
) {
  chrome.runtime.sendMessage({ action: "closeTab" });
}
