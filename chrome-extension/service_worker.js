const contextMenuTitleID = 'contextMenuTitleID'
const contextMenuSeparatorID = 'contextMenuSeparatorID'
const contextMenuShortDefinitionID = 'contextMenuShortDefinitionID'
const contextMenuLongDefinitionID = 'contextMenuLongDefinitionID'

chrome.contextMenus.create({
    id: contextMenuTitleID,
    title: "OFAC - Office of Foreign Asset Control Office of Foreign Asset Control",
    enabled: true,
    contexts: ["selection"]
})
// chrome.contextMenus.create({
//     id: contextMenuSeparatorID,
//     type: "separator",
//     contexts: ["selection"]
// })
// chrome.contextMenus.create({
//     id: contextMenuShortDefinitionID,
//     enabled: false,
//     title: 'Loading...',
//     contexts: ["selection"]
// })
// chrome.contextMenus.create({
//     id: contextMenuLongDefinitionID,
//     enabled: false,
//     title: ' ',
//     contexts: ["selection"]
// })

let url

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.create({ url: url });
})

const loadDefinition = (acronym) => {
    fetch('http://localhost:8080/api/v1/words/tcp') // acronym
        .then((response) => response.json())
        .then((data) => {
            url = data.url
            // chrome.contextMenus.update(contextMenuShortDefinitionID, {
            //     'title': data.short_definition
            // })
            // chrome.contextMenus.update(contextMenuLongDefinitionID, {
            //     'title': data.long_definition
            // })
            chrome.contextMenus.update(contextMenuTitleID, {
                'title': `${acronym} - ${data.short_definition}`,
            })

        })
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'updateBetterSlangContextMenu' && request.selection.length > 0) {
        chrome.contextMenus.update(contextMenuTitleID, {
            'title': `BetterDefine: "${request.selection}"`,
        })
        loadDefinition(request.selection)
        // chrome.contextMenus.update(contextMenuShortDefinitionID, {
        //     'title': 'Loading...'
        // })
        // chrome.contextMenus.update(contextMenuLongDefinitionID, {
        //     'title': ' '
        // })
        // loadDefinition(request.selection)
    } else {
        sendResponse({})
    }
})
