import { item } from '../asset/data.js'
import { getGameInv } from './global.js'
//メインページのボタンが押されるとメインページに移動する
document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})

document.getElementById('items').addEventListener('click', () => {
  view(0)
})
document.getElementById('weapons').addEventListener('click', () => {
  view(1)
})
document.getElementById('armors').addEventListener('click', () => {
  view('armors')
})
document.getElementById('others').addEventListener('click', () => {
  view(999)
})

view(0)
async function view(page) {
  const gameInv = await getGameInv()
  const tbody = document.getElementsByTagName('tbody')
  let count = tbody.length
  for (let i = 0; i < count; i++) {
    tbody[0].remove()
  }
  if (page == 'armors') {
    //装備だった時
    for (let i = 2; i <= 5; i++) {
      //装備のカテゴリーの数繰り返す
      let key = Object.entries(gameInv[i][0])
      for (let j = 0; j < key.length; j++) {
        //カテゴリー内にあるアイテムの種類の回数繰り返す
        if (item[i][`${key[j][0]}`] != undefined) {
          //itemデータにアイテムIDが存在するかのチェック
          viewTable(2, item[i][`${key[j][0]}`].name, gameInv[i][0][`${key[j][0]}`], item[i][`${key[j][0]}`].sell)
        } else {
          //itemデータにアイテムIDがない場合
          viewTable(2, 'エラーが発生しました', '', '')
        }
      }
    }
  } else {
    //装備以外の場合
    const tbl = document.getElementsByTagName('table')[page]
    const tblBody = document.createElement('tbody')
    let key = Object.entries(gameInv[page][0])
    for (let i = 0; i < key.length; i++) {
      // 表の行を作成
      const row = document.createElement('tr')
      // <td> 要素とテキストノードを作成し、テキストノードを
      // <td> の内容として、その <td> を表の行の末尾に追加
      if (item[page][`${key[i][0]}`] != undefined) {
        //↓よくわからないからコメントアウトしている
        // if (gameInv[page][0][`${key[i][0]}`] != undefined) {
        viewTable(
          page,
          item[page][`${key[i][0]}`].name,
          gameInv[page][0][`${key[i][0]}`],
          item[page][`${key[i][0]}`].sell,
        )
        // }
      } else {
        return
      }
      tbl.appendChild(tblBody)
    }
  }
}

//任意のタブにURLからリンクするための設定
function GethashID(hashIDName) {
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
  GethashID(hashName) //設定したタブの読み込み
})

/**
 * インベントリのテーブルを描画する関数
 * @param {Number} CategoryId
 * @param {object} itemName
 * @param {object} itemCount
 * @param {object} itemSellValue
 */
function viewTable(CategoryId, itemName, itemCount, itemSellValue) {
  const row = document.createElement('tr')
  const tbl = document.getElementsByTagName('table')[CategoryId]
  const tblBody = document.createElement('tbody')
  let cell = document.createElement('td')
  let cellText = document.createTextNode(itemName)
  cell.appendChild(cellText)
  row.appendChild(cell)
  cell = document.createElement('td')
  cellText = document.createTextNode(itemCount)
  cell.appendChild(cellText)
  row.appendChild(cell)
  cell = document.createElement('td')
  cellText = document.createTextNode(itemSellValue)
  cell.appendChild(cellText)
  row.appendChild(cell)
  tblBody.appendChild(row)
  tbl.appendChild(tblBody)
}
