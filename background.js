chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'replaceImage',
    title: '<img> タグに変換する',
    contexts: ['selection']
  });
})

function replaceImage() {
  let selection = window.getSelection().toString();
  let regex = /\((.*?)\)/;
  let match = selection.match(regex);
  if (match) {
    let url = match[1];
    let imgTag = document.createElement('img');
    imgTag.src = url;
    console.log(imgTag);
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
