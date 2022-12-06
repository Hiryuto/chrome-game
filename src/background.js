chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'installed.html' })
  }
  if (details.reason === 'update') {
    //開発版のみ
    chrome.tabs.create({ url: 'index.html' })
    //ゲームの変数をChromeの同期ストレージに作成
    //プレイヤーステータスの作成
    var statusData = {
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
    //システムflag
    let flagData = {
      stage: 1,
      stageClear: [1, 1],
    }
    let gameInvData = {
      //通常アイテム
      0: [{ 1: 1, 2: 1, 3: 0, 0: 999, 5: 1 }],
      //武器
      1: [{ 2: 1 }],
      //---装備---
      //ヘルメット
      2: [{ 0: 1 }],
      //チェストプレート
      3: [{ 1: 1, 2: 2 }],
      //ブーツ
      4: [{ 3: 1, 4: 1, 5: 1 }],
      //アクセサリー
      5: [{ 6: 1 }],
      //その他
      999: [{}],
    }
    let skillData = {
      setSkill: [0],
    }
    let setting = {
      gameSpeed: 500,
    }
    let gameGeardata = {
      Helmet: null,
      Chestplate: null,
      Boots: null,
      Weapon: null,
      Accessory: [null, null],
    }
    chrome.storage.local.set({ status: statusData })
    chrome.storage.local.set({ flag: flagData })
    chrome.storage.local.set({ gameInv: gameInvData })
    chrome.storage.local.set({ gameGear: gameGeardata })
    chrome.storage.local.set({ skill: skillData })
    chrome.storage.local.set({ setting: setting })
  }
})
