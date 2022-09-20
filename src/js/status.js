//変数の宣言
/**
 * ステータスが入る変数です
 * @type {{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント}}
 */
var Status
var setstatus

//chrome.storageから変数を取得
chrome.storage.local.get([`gamestatus`], function (response) {
  Status = JSON.parse(response.gamestatus)
})
setTimeout(() => {
  textContent('point', Status.point)
  textContent('hp', Status.hp)
  textContent('atk', Status.atk)
  textContent('def', Status.def)
  textContent('spd', Status.spd)
}, 50)

//ボタン制御
document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})
document.getElementById('addhp').addEventListener('click', () => {
  if (Status.point > 0) {
    Status.point--
    Status.hp++
    setstatus = JSON.stringify(Status)
    chrome.storage.local.set({
      gamestatus: setstatus,
    })
    chrome.storage.local.get([`gamestatus`], function (response) {
      Status = JSON.parse(response.gamestatus)
    })
    setTimeout(() => {
      textContent('point', Status.point)
      textContent('hp', Status.hp)
      textContent('atk', Status.atk)
      textContent('def', Status.def)
      textContent('spd', Status.spd)
    }, 50)
  }
})
document.getElementById('addatk').addEventListener('click', () => {
  if (Status.point > 0) {
    Status.point--
    Status.atk++
    setstatus = JSON.stringify(Status)
    chrome.storage.local.set({
      gamestatus: setstatus,
    })
    chrome.storage.local.get([`gamestatus`], function (response) {
      Status = JSON.parse(response.gamestatus)
    })
    setTimeout(() => {
      textContent('point', Status.point)
      textContent('hp', Status.hp)
      textContent('atk', Status.atk)
      textContent('def', Status.def)
      textContent('spd', Status.spd)
    }, 50)
  }
})
document.getElementById('adddef').addEventListener('click', () => {
  if (Status.point > 0) {
    Status.point--
    Status.def += 4
    setstatus = JSON.stringify(Status)
    chrome.storage.local.set({
      gamestatus: setstatus,
    })
    chrome.storage.local.get([`gamestatus`], function (response) {
      Status = JSON.parse(response.gamestatus)
    })
    setTimeout(() => {
      textContent('point', Status.point)
      textContent('hp', Status.hp)
      textContent('atk', Status.atk)
      textContent('def', Status.def)
      textContent('spd', Status.spd)
    }, 50)
  }
})
document.getElementById('addspd').addEventListener('click', () => {
  if (Status.point > 0) {
    Status.point--
    Status.spd++
    setstatus = JSON.stringify(Status)
    chrome.storage.local.set({
      gamestatus: setstatus,
    })
    chrome.storage.local.get([`gamestatus`], function (response) {
      Status = JSON.parse(response.gamestatus)
    })
    setTimeout(() => {
      textContent('point', Status.point)
      textContent('hp', Status.hp)
      textContent('atk', Status.atk)
      textContent('def', Status.def)
      textContent('spd', Status.spd)
    }, 50)
  }
})

/**
 * @param {string} id HTMLのID
 * @param {string} message 変換したい文字列を指定
 */
function textContent(id, message) {
  document.getElementById(id).textContent = `${message}`
}

/**
 * @param {string} id HTMLのID
 * @param {string} message 変換したいHTMLを指定
 */
function innerHTML(id, message) {
  document.getElementById(id).innerHTML = `${message}`
}
