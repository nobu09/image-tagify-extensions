chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'replaceImage',
    title: '<img> タグに変換する',
    contexts: ['selection']
  });
})

function replaceImage() {
  let selection = window.getSelection().toString();
  console.log(selection)
  const imgTag = '<img src="' + selection + '">';
  selection = imgTag;
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'replaceImage') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: replaceImage,
    })
    .then(() => console.log("success"))
  }
});
