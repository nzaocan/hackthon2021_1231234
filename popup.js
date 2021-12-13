let testbutton = document.getElementById("testbutton");

// testbutton.onclick=init;


testbutton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['main.js'],
    });
  });
