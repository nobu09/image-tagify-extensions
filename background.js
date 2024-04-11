chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'replaceImage',
    title: '<img> タグに変換する',
    contexts: ['selection']
  });
})

function replaceImage() {
  let selection = window.getSelection();
  if (!selection.rangeCount) return;
  let range = selection.getRangeAt(0);

  let selectionText = selection.toString();
  let regex = /\((.*?)\)/;
  let match = selectionText.match(regex);
  if (match) {
    let url = match[1];
    let imgTagText = `<img width=500 src="${url}">`; 
    console.log(imgTagText);
    range.deleteContents();
    let textNode = document.createTextNode(imgTagText);
    range.insertNode(textNode);
  }
  // if (!selection.rangeCount) return;

  // let range = selection.getRangeAt(0);
  // let imgTag = document.createElement('img');
  // imgTag.src = selection.toString();
  // range.deleteContents();  // 選択範囲の内容を削除
  // range.insertNode(imgTag);  // 選択範囲に<img>タグを挿入
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
