document.addEventListener("selectionchange", function (e) {
    chrome.runtime.sendMessage({ message: 'updateBetterSlangContextMenu', selection: getSelection().toString() })
})