/**
 * ゲームフラグが管理されている変数です
 * @type {{stage: 最大クリア親ステージ,stageClear: [最大クリアステージ],}}
 */
let flag

/**
 * ステージ情報
 */
import { stagedata, item } from '../asset/data.js'

import { getFlag } from './global.js'

function clear_screen() {
  const screen = document.getElementById('screen')
  while (screen.lastChild) {
    screen.removeChild(screen.lastChild)
  }
}
async function main_quest() {
  clear_screen()
  const flag = await getFlag()
  console.log(flag)
  for (let i = 1; flag.stage >= i; i++) {
    const id = i - 1
    const button = document.createElement('button')
    button.style = 'margin-bottom: 5px;'
    button.innerHTML = `${stagedata.data[id].StageName}`
    console.log(stagedata)
    button.id = stagedata.data[id].StageId
    button.onclick = function () {
      stageload(i - 1)
    }
    const br = document.createElement('br')
    document.getElementById('screen').prepend(br)
    document.getElementById('screen').prepend(button)
  }
  const h2 = document.createElement('h2')
  h2.innerHTML = 'ステージを選択してください'
  document.getElementById('screen').prepend(h2)
  document.getElementById('mainpage').style.display = 'inline-block'
  document.getElementById('hr').style.display = 'block'
  document.getElementById('br').style.display = 'none'
}

async function stageload(stageid) {
  //stageview([親ステージID])
  stageview(stageid)
}

function stageview(stageid, stageNumber) {
  const stageiD = stageid - 1
  const stageID = stagedata.data[stageiD].StageId
  const stageName = stagedata.data[stageiD].StageName
  stageNumber += 1
  const screen = document.getElementById('screen')

  while (screen.lastChild) {
    screen.removeChild(screen.lastChild)
  }
  const header = document.createElement('h2')
  header.innerHTML = 'ステージを選択してください'
  screen.appendChild(header)
  const stages = document.createElement('div')
  stages.id = 'stage'
  screen.appendChild(stages)
  const button = document.createElement('button')
  button.id = `${stageID}${stageid}-1`
  button.style = 'margin-bottom: 5px;'
  button.innerHTML = `${stageName} ${stageid}-1`
  button.onclick = function () {
    window.location.href = `./battle.html?stage=${stageid}&stageid=1`
  }
  // document.getElementById('stage').append(br)
  document.getElementById('stage').prepend(button)

  for (let i = 2; i <= flag.stageClear[stageiD]; i++) {
    const br = document.createElement('br')
    document.getElementById('stage').prepend(br)
    const button = document.createElement('button')
    button.id = `${stageID}${stageid}-${i}`
    button.style = 'margin-bottom: 5px;'
    button.innerHTML = `${stageName} ${stageid}-${i}`
    button.onclick = function () {
      window.location.href = `./battle.html?stage=${stageid}&stageid=${i - 1}` //1
      test(`${i}`) //2
    }
    document.getElementById('stage').prepend(button)
  }
  const hr = document.createElement('hr')
  const footer = document.createElement('button')
  footer.id = `backquest`
  footer.style = 'margin-bottom: 5px;'
  footer.innerHTML = `クエストページに戻る`
  footer.onclick = function () {
    main_quest()
  }
  screen.appendChild(hr)
  screen.appendChild(footer)
  document.getElementById('mainpage').style.display = 'none'
  document.getElementById('hr').style.display = 'none'
  document.getElementById('br').style.display = 'none'
}

/**
 * 待機 ※await必須
 * @param {待つ時間} waitTime
 * @returns
 */
const sleep = (waitTime) => new Promise((resolve) => setTimeout(resolve, waitTime))

document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'quest.html'
})

main_quest()
