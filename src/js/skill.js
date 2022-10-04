/**
 * ステータスが入る変数です
 * @type {{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント,coin:コイン,}}
 */
let Status

/**
 * ゲームフラグが管理されている変数です
 * @type {{stage: 最大クリア親ステージ,stageClear: [最大クリアステージ],}}
 */
let flag

/**
 * スキルが管理されている変数
 * @type {{setskill: SkillId}}
 */
let skill

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
  Status = await chrome.storage.local.get('gamestatus')
  flag = await chrome.storage.local.get('flag')
  skill = await chrome.storage.local.get('gameSkill')
}
document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})

async function viewSetup() {
  console.log('aaaa')
  await sync()
  console.log(skill)
  console.log(skill.setskill.length)
  for (let i = 0; i < skill.setskill.length; i++) {
    const skillid = skill.setskill[i]
    const details = document.createElement('details')
    const summary = document.createElement('summary')
    summary.innerHTML = skilldata[skillid].name
    details.appendChild(summary)
    const box = document.createElement('div')
    box.className = 'box1'
    const box_title = document.createElement('span')
    box_title.className = 'box-title'
    box_title.innerHTML = '効果'
    box.appendChild(box_title)
    const p = document.createElement('p')
    p.innerHTML = skilldata[skillid].effect
    box.appendChild(p)
    details.appendChild(box)
    p.innerHTML = skilldata[skillid].description
    details.appendChild(p)
    document.getElementById('SubmitSkill').appendChild(details)
  }
  console.log(Object.keys(skilldata).length)
  for (let i = 0; i < Object.keys(skilldata).length; i++) {
    const details = document.createElement('details')
    const summary = document.createElement('summary')
    summary.innerHTML = skilldata[i].name
    details.appendChild(summary)
    const box = document.createElement('div')
    box.className = 'box1'
    const box_title = document.createElement('span')
    box_title.className = 'box-title'
    box_title.innerHTML = '効果'
    box.appendChild(box_title)
    let effect_p = document.createElement('p')
    effect_p.innerHTML = skilldata[i].effect
    box.appendChild(effect_p)
    details.appendChild(box)
    let description_p = document.createElement('p')
    description_p.innerHTML = skilldata[i].description
    details.appendChild(description_p)
    let hr = document.createElement('hr')
    details.appendChild(hr)
    let button = document.createElement('button')
    button.innerHTML = 'スキルをセットする'
    button.id = i
    console.log(i)
    button.onclick = function () {
      console.log(skill)
      setskill(i)
    }
    console.log(button.onclick)
    details.appendChild(button)
    document.getElementById('SkillList').appendChild(details)
  }
}
function setskill(skillids) {
  let result = window.confirm(skilldata[skillids].name + 'を設定してよろしいですか？')
  if (result) {
    let skill_splice = skill.setskill
    skill_splice.splice(0, 1, skillids)
    console.log(skill)
  } else {
  }
}
function delskill(skillids) {}
viewSetup()
