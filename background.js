chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'replaceImage',
    title: '<img> タグに変換する',
    contexts: ['selection']
  });
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'replaceImage') {
    console.log('replaceImage');
  }
})
