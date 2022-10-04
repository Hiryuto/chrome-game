chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'installed.html' })
  }
  if (details.reason === 'update') {
    chrome.storage.local.set({ CharacterImg: 'Temp' })
    chrome.storage.local.set({ TempImg: 'Temp' })
    chrome.storage.local.set({ authorization: 'Temp' })
    //開発版のみ
    chrome.tabs.create({ url: 'index.html' })
    //ゲームの変数をChromeの同期ストレージに作成
    //プレイヤーステータスの作成
    var statuss = {
      level: 1,
      exp: 0,
      totalExp: 0,
      hp: 10,
      atk: 1,
      def: 1,
      spd: 1,
      point: 100,
      coin: 0,
    }
    let status = JSON.stringify(statuss)
    chrome.storage.local.set({
      gamestatus: status,
    })
    //システム
    let flag = {
      stage: 1,
      stageClear: [1, 1],
    }
    let gameInv = {
      0: [{ 0: 1, 1: 5, 2: 10 }],
      1: [{}],
      2: [{}],
      3: [{}],
    }
    let skilldata = {
      setskill: [0],
    }
    skill = JSON.stringify(skilldata)
    Inv = JSON.stringify(gameInv)
    flags = JSON.stringify(flag)
    chrome.storage.local.set({ flag: flags })
    chrome.storage.local.set({ gameInv: Inv })
    chrome.storage.local.set({ gameGear: 'null' })
    chrome.storage.local.set({ gameSkill: skill })
  }
})
