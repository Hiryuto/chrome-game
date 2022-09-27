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
 * スキルが管理されている変数
 * @type {{setskill: SkillId}}
 */
var skill

import { skilldata } from '../asset/data.js'

/**
 * 待機 ※await必須
 * @param {待つ時間} waitTime
 * @returns
 */
const sleep = (waitTime) => new Promise((resolve) => setTimeout(resolve, waitTime))

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
  chrome.storage.local.get(['gameSkill'], function (response) {
    skill = JSON.parse(response.gameSkill)
  })
  await sleep(1000)
}
document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})

async function viewSetup() {
  sync()
  await sleep(1000)
  console.log(skill)
  var details = document.createElement('details')
  var summary = document.createElement('summary')
  summary.innerHTML = skilldata[skill.setskill].name
  details.appendChild(summary)
  var p = document.createElement('p')
  p.innerHTML = skilldata[skill.setskill].description
  details.appendChild(p)
  document.getElementById('SubmitSkill').appendChild(details)
}

viewSetup()
