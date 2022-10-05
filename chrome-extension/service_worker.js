const contextMenuTitleID = 'contextMenuTitleID'

chrome.contextMenus.create({
    id: contextMenuTitleID,
    title: "BetterSlang Extension",
    enabled: true,
    contexts: ["selection"]
})

let url
let longDescription

chrome.contextMenus.onClicked.addListener((info, tab) => {
    // const c = confirm(longDescription) // not working
    // if (c) {
    // }
    chrome.tabs.create({ url: url })
})

const loadDefinition = (acronym) => {
    fetch(`http://localhost:8080/api/v1/words/${acronym}`)
        .then((response) => response.json())
        .then((data) => {
            url = data.url
            longDescription = data.short_definition
            chrome.contextMenus.update(contextMenuTitleID, {
                'title': `${acronym} - ${data.short_definition}`
            })
        }).catch(() => {
            chrome.contextMenus.update(contextMenuTitleID, {
                'title': `${acronym} - No found`
            })
        })
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.message == 'updateBetterSlangContextMenu' && request.selection.length > 0) {
        chrome.contextMenus.update(contextMenuTitleID, {
            'title': `BetterDefine: "${request.selection}"`
        })
        loadDefinition(request.selection)
    }
})
