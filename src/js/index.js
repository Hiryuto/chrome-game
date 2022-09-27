//変数の宣言
/**
 * ステータスが入る変数です
 * @type {{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント,coin:コイン,}}
 */
var Status

//chrome.storageから変数を取得
chrome.storage.local.get([`gamestatus`], function (response) {
  Status = JSON.parse(response.gamestatus)
})
//HTMLに変数を設定
setTimeout(() => {
  textContent('level', Status.level)
  textContent('exp', Status.exp)
  textContent('hp', Status.hp)
  textContent('atk', Status.atk)
  textContent('def', Status.def)
  textContent('spd', Status.spd)
  textContent('coin', Status.coin)
}, 400)

document.getElementById('quest_button').addEventListener('click', () => {
  window.location.href = 'quest.html'
})
document.getElementById('status_button').addEventListener('click', () => {
  window.location.href = 'status.html'
})
document.getElementById('inv_button').addEventListener('click', () => {
  window.location.href = 'inventory.html'
})
document.getElementById('skill').addEventListener('click', () => {
  window.location.href = 'skill.html'
})

/**
 * @param {string} id HTMLのID
 * @param {string} message 変換したい文字列を指定
 */
function textContent(id, message) {
  document.getElementById(id).textContent = `${message}`
}
/**
 *
 * @param {string} id HTMLのID
 * @param {string} message 変換したいHTMLを指定
 */
function innerHTML(id, message) {
  document.getElementById(id).innerHTML = `${message}`
}
