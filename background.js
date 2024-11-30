let activeTab = null;
let startTime = null;
const siteTimes = {};

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function updateTime() {
  if (activeTab && startTime) {
    const now = Date.now();
    const elapsed = now - startTime;
    const domain = getDomain(activeTab.url);

    if (domain) {
      siteTimes[domain] = (siteTimes[domain] || 0) + elapsed;
      chrome.storage.local.set({ siteTimes });
    }
    startTime = now;
  }
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  updateTime();

  chrome.tabs.get(tabId, (tab) => {
    activeTab = tab;
    startTime = Date.now();
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateTime();
    activeTab = tab;
    startTime = Date.now();
  }
});

chrome.windows.onFocusChanged.addListener(() => {
  updateTime();
});

chrome.runtime.onSuspend.addListener(() => {
  updateTime();
});
