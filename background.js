chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'replaceImage',
    title: 'imgタグに変換',
    contexts: ['editable'] // 編集可能なテキストフィールド上で右クリックしたときに表示
  });
})

function replaceImage() {
  let textarea = document.activeElement;
  if (textarea.tagName !== 'TEXTAREA') return;
  let textAreaText = textarea.value;
  let regex = /!\[.*\]\((.*?)\)/;
  let match = textAreaText.match(regex);
  if (match) {
    let url = match[1];
    let imgTagText = `<img width="500" src="${url}" />`;
    textarea.value = textarea.value.replace(regex, imgTagText);
  }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'replaceImage') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: replaceImage,
    })
  }
});
