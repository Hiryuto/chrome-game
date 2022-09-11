/**
 * ステータスが入る変数です
 * @type {{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント,coin:コイン,}}
 */
var Status

/**
 * ゲームフラグが管理されている変数です
 * @type {{stage: 最大クリア親ステージ,stageClear: [最大クリアステージ],}}
 */
var flag

/**
 * ステージ情報
 */
import { stage, item } from '../asset/data.js'

/**
 * ゲームデータの同期
 */
async function sync() {
  chrome.storage.local.get([`gamestatus`], function (response) {
    Status = JSON.parse(response.gamestatus)
  })
  chrome.storage.local.get(['flag'], function (response) {
    flag = JSON.parse(response.flag)
  })
  await sleep(100)
}

function clear_screen() {
  const screen = document.getElementById('screen')
  while (screen.lastChild) {
    screen.removeChild(screen.lastChild)
  }
}

function main_view() {
  var mainquest = document.createElement('button')
  mainquest.innerHTML = 'メインクエスト'
  mainquest.style = 'padding: 20px'
  mainquest.id = 'mainquest'
  mainquest.disabled = false
  mainquest.onclick = function () {
    window.location.href = 'mainquest.html'
  }
  document.getElementById('screen').appendChild(mainquest)
  var subquest = document.createElement('button')
  subquest.innerHTML = 'サブクエスト'
  subquest.style = 'padding: 20px; margin-left: 10px;'
  subquest.id = 'subquest'
  subquest.type = 'submit'
  subquest.disabled = true
  document.getElementById('screen').appendChild(subquest)
}

/**
 * 待機 ※await必須
 * @param {待つ時間} waitTime
 * @returns
 */
const sleep = (waitTime) => new Promise((resolve) => setTimeout(resolve, waitTime))

document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})

main_view()
