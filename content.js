const body = document.body?.innerText || "";

if (
  body.includes("Authentication details received") ||
  body.includes("authorized") ||
  body.includes("You may close this window")
) {
  chrome.runtime.sendMessage({ action: "closeTab" });
}
