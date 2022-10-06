const contextMenuTitleID = 'contextMenuTitleID'
const contextMenuSeparatorID = 'contextMenuSeparatorID'
const contextMenuMoreInfoID = 'contextMenuMoreInfoID'

chrome.contextMenus.create({
    id: contextMenuTitleID,
    title: "BetterSlang Extension",
    enabled: true,
    contexts: ["selection"]
})
chrome.contextMenus.create({
    id: contextMenuSeparatorID,
    type: "separator",
    contexts: ["selection"]
})
chrome.contextMenus.create({
    id: contextMenuMoreInfoID,
    enabled: true,
    title: 'More info',
    contexts: ["selection"]
})

let url
let longDescription

chrome.contextMenus.onClicked.addListener((info, tab) => {
    // const c = confirm(longDescription) // not working
    // if (c) {
    // }
    if (info.menuItemId === contextMenuMoreInfoID) {
        chrome.tabs.create({ url: url })
    }
})

const loadDefinition = (acronym) => {
    fetch(`http://betterjargonapi-env.eba-rzb43vsp.us-east-1.elasticbeanstalk.com/api/v1/words/${acronym}`)
        .then((response) => response.json())
        .then((data) => {
            url = data.url
            longDescription = data.short_definition
            chrome.contextMenus.update(contextMenuTitleID, {
                'title': `${acronym} - ${data.short_definition}`
            })
            chrome.contextMenus.update(contextMenuMoreInfoID, {
                enabled: true,
            })
        }).catch(() => {
            chrome.contextMenus.update(contextMenuTitleID, {
                'title': 'No found'
            })
            chrome.contextMenus.update(contextMenuMoreInfoID, {
                enabled: false,
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
