import { getGear, getGameInv } from './global.js'
import { item } from '../asset/data.js'

var Tablelist

document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})
//任意のタブにURLからリンクするための設定
async function GethashID(hashIDName) {
  if (hashIDName) {
    //タブ設定
    $('.tab li')
      .find('button')
      .each(function () {
        //タブ内のaタグ全てを取得
        const idName = $(this).attr('href') //タブ内のaタグのリンク名（例）#lunchの値を取得
        if (idName == hashIDName) {
          //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
          const parentElm = $(this).parent() //タブ内のaタグの親要素（li）を取得
          $('.tab li').removeClass('active') //タブ内のliについているactiveクラスを取り除き
          $(parentElm).addClass('active') //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
          //表示させるエリア設定
          $('.area').removeClass('is-active') //もともとついているis-activeクラスを取り除き
          $(hashIDName).addClass('is-active') //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加
        }
      })
    let hashNameNoSharp = hashIDName.replace(/#/g, '') //URLのハッシュタグから「#」を消す
    switch (
      hashNameNoSharp //表示するカテゴリーによってメタデータの場所が違うので表示する処理
    ) {
      case 'Weapon':
        nowviewGear(1, 'Weapon')
        break
      case 'Helmet':
        nowviewGear(2, 'Helmet')
        break
      case 'Chestplate':
        nowviewGear(3, 'Chestplate')
        break
      case 'Boots':
        nowviewGear(4, 'Boots')
        break
      case 'Accessory':
        nowviewGear(5, 'Accessory')
        break
      default: //例外処理
        document.querySelector(`#${hashNameNoSharp} .nowEquipment td`).innerHTML = 'エラーが発生しました'
    }
  }
}

//タブをクリックしたら
$('.tab button').on('click', function () {
  var idName = $(this).attr('href') //タブ内のリンク名を取得
  GethashID(idName) //設定したタブの読み込みと
  return false //aタグを無効にする
})

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
  $('.tab li:first-of-type').addClass('active') //最初のliにactiveクラスを追加
  $('.area:first-of-type').addClass('is-active') //最初の.areaにis-activeクラスを追加
  var hashName = location.hash //リンク元の指定されたURLのハッシュタグを取得
  console.log(hashName)
  if (!hashName) {
    console.log(hashName)
    hashName = '#Helmet'
  }
  GethashID(hashName) //設定したタブの読み込み
})

/**
 * 装備中のものを表示する
 * @param {メタデータのカテゴリーID} dataCategoryID
 * @param {カテゴリーの名前} CategoryName
 */
async function nowviewGear(dataCategoryID, CategoryName) {
  let nowGear = await getGear() //現在装備しているものを取得
  if (CategoryName == 'Accessory') {
    //もしアクセサリーを見ているなら
    let nowAccessoryName1
    let nowAccessoryName2
    if (item[`${dataCategoryID}`][`${nowGear['Accessory'][0]}`] != undefined && nowGear['Accessory'][0] != undefined) {
      //もしアクセサリースロットの1番目に[アイテムIDが存在する]かつ[インベントリデータに存在するなら]
      nowAccessoryName1 = item[`${dataCategoryID}`][`${nowGear['Accessory'][0]}`].name
      if (
        item[`${dataCategoryID}`][`${nowGear['Accessory'][1]}`] != undefined &&
        nowGear['Accessory'][1] != undefined
      ) {
        //もしアクセサリースロットの2番目に[アイテムIDが存在する]かつ[インベントリデータに存在するなら]
        nowAccessoryName2 = item[`${dataCategoryID}`][`${nowGear['Accessory'][1]}`].name
      } else {
        nowAccessoryName2 = '装備していません'
      }
    } else {
      nowAccessoryName1 = '装備していません'
      nowAccessoryName2 = '装備していません'
    }
    //装備状況を表示する
    document.querySelectorAll(`#${CategoryName} .nowEquipment tbody tr td`)[1].innerHTML = nowAccessoryName1
    document.querySelectorAll(`#${CategoryName} .nowEquipment tbody tr td`)[3].innerHTML = nowAccessoryName2
  } else if (nowGear[`${CategoryName}`] != null) {
    //何かを装備していたら
    let nowGearName = item[`${dataCategoryID}`][`${nowGear[`${CategoryName}`]}`].name
    document.querySelector(`#${CategoryName} .nowEquipment tbody tr td`).innerHTML = nowGearName
  } else {
    //もし何も装備していなかったら
    document.querySelector(`#${CategoryName} .nowEquipment tbody tr td`).innerHTML = '装備していません'
  }
  view(dataCategoryID, CategoryName)
}

async function view(id, CategoryName) {
  Tablelist = document.createElement('tbody')
  const gameInv = await getGameInv()
  const tbody = document.querySelectorAll('.is-active table tbody')
  const tbl = document.querySelectorAll('.is-active table')[1]
  if (tbody.length > 1) {
    for (let i = tbody.length; i >= 1; i--) {
      tbody[1].remove()
    }
  }

  let InvCount = Object.keys(gameInv[`${id}`][0]).length
  console.log(CategoryName)
  let itemID = Object.keys(gameInv[id][0])
  let itemCount = Object.values(gameInv[id][0])
  for (let i = 1; i <= InvCount; i++) {
    if (item[`${id}`][`${itemID[`${i - 1}`]}`] != undefined) {
      //itemデータにアイテムIDが存在するかのチェック
      viewTable(item[`${id}`][`${itemID[`${i - 1}`]}`].name, itemCount[`${i - 1}`], CategoryName, itemID[`${i - 1}`])
    } else {
      //itemデータにアイテムIDがない場合
      viewTable('内部ﾃﾞｰﾀの破損', 'ｴﾗｰ', CategoryName, '')
    }
  }

  //サンプル

  // for (let i = 2; i <= 5; i++) {
  //   //装備のカテゴリーの数繰り返す
  //   let key = Object.entries(gameInv[i][0])
  //   for (let j = 0; j < key.length; j++) {
  //     //カテゴリー内にあるアイテムの種類の回数繰り返す
  //     if (item[`${id}`][`${key[j][0]}`] != undefined) {
  //       //itemデータにアイテムIDが存在するかのチェック
  //       viewTable(item[i][`${key[j][0]}`].name, gameInv[i][0][`${key[j][0]}`], item[i][`${key[j][0]}`].sell)
  //     } else {
  //       //itemデータにアイテムIDがない場合
  //       viewTable('エラーが発生しました', '', '')
  //     }
  //   }
  // }

  tbl.appendChild(Tablelist)
}

/**
 * インベントリのテーブルを描画する関数
 * @param {object} itemName アイテムの名前
 * @param {object} itemCount アイテムの数
 * @param {string} itemCategoryName アイテムのカテゴリー名
 * @param {number} itemID アイテムのID
 * @param {number} itemCategoryID アイテムのカテゴリーID
 */
function viewTable(itemName, itemCount, itemCategoryName, itemID, itemCategoryID) {
  const row = document.createElement('tr')
  const tbl = document.querySelectorAll('.is-active table')[1]
  let cell = document.createElement('td')
  cell.style = 'font-size:3px'
  let cellText = document.createTextNode(itemName)

  let button = document.createElement('button')

  cell.appendChild(cellText)
  row.appendChild(cell)
  cell = document.createElement('td')
  cellText = document.createTextNode(itemCount)
  cell.appendChild(cellText)
  row.appendChild(cell)
  cell = document.createElement('td')
  if (itemCategoryName == 'Accessory') {
    button.innerText = '装備する(A)'
    button.onclick = function () {
      saveGear(itemCategoryName, itemCategoryID, itemID, itemCount, '0')
    }
    button.style = 'font-size:3px;margin:2.5px'
    cell.appendChild(button)
    let buttonB = document.createElement('button')
    buttonB.innerText = '装備する(B)'
    buttonB.onclick = function () {
      saveGear(itemCategoryName, itemCategoryID, itemID, itemCount, '1')
    }
    buttonB.style = 'font-size:3px;margin:2.5px'
    cell.appendChild(buttonB)
  } else {
    button.innerText = '装備する'
    button.onclick = function () {
      saveGear(itemCategoryName, itemCategoryID, itemID, itemCount, '0')
    }
    button.style = 'font-size:3px'
    cell.appendChild(button)
  }
  row.appendChild(cell)
  Tablelist.appendChild(row)
  console.log(Tablelist)
}

async function saveGear(saveCategoryName, saveCategoryID, saveItemID, saveItemCount, slotID) {
  var nowGear = await getGear()
  if (saveCategoryName == 'Accessory') {
    if (saveItemID) {
      if (saveItemCount != 1) {
        console.log(nowGear)
        nowGear[`${saveCategoryName}`][`${slotID}`] = saveItemID
        chrome.storage.local.set({ gameGear: nowGear })
      } else {
        switch (slotID) {
          case '0':
            if (nowGear.Accessory[1] != saveItemID) {
              nowGear[`${saveCategoryName}`][`${slotID}`] = saveItemID
              chrome.storage.local.set({ gameGear: nowGear })
            } else {
              return alert('アクセサリーの数がありません')
            }
            break
          case '1':
            if (nowGear.Accessory[0] != saveItemID) {
              nowGear[`${saveCategoryName}`][`${slotID}`] = saveItemID
              chrome.storage.local.set({ gameGear: nowGear })
            } else {
              return alert('アクセサリーの数がありません')
            }
            break
        }
      }
    } else {
      return alert('エラーが発生しました')
    }
  } else {
    if (saveItemID) {
      nowGear[`${saveCategoryName}`] = saveItemID
      chrome.storage.local.set({ gameGear: nowGear })
    } else {
      return alert('エラーが発生しました')
    }
  }
  location.hash = `${saveCategoryName}`
  location.reload()
}
