chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'replaceImage',
    title: '<img> タグに変換する',
  });
})
