import { item } from '../asset/data.js'

var GameInv

/**
 * ゲームデータの同期
 */
function sync() {
  chrome.storage.local.get([`gameInv`], function (response) {
    GameInv = JSON.parse(response.gameInv)
  })
}
/**
 * 待機 ※await必須
 * @param {待つ時間} waitTime
 * @returns
 */
const sleep = (waitTime) => new Promise((resolve) => setTimeout(resolve, waitTime))

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
  view(2)
})
document.getElementById('others').addEventListener('click', () => {
  view(3)
})

view(0)
async function view(page) {
  sync()
  await sleep(500)
  var cl8 = document.getElementsByTagName('tbody')
  for (i = 0; i < cl8.length; i++) {
    cl8[i].remove()
  }
  var tbl = document.getElementsByTagName('table')[page]
  var tblBody = document.createElement('tbody')
  for (var i = 0; i < 3; i++) {
    // 表の行を作成
    var row = document.createElement('tr')
    // <td> 要素とテキストノードを作成し、テキストノードを
    // <td> の内容として、その <td> を表の行の末尾に追加
    if (item[page][i] != undefined) {
      console.log('aaa' + GameInv[page][0][i])
      var cell = document.createElement('td')
      console.log
      var cellText = document.createTextNode(item[page][i].name)
      cell.appendChild(cellText)
      row.appendChild(cell)
      var cell = document.createElement('td')
      console.log(GameInv[page][0][i])
      var cellText = document.createTextNode(GameInv[page][0][i])
      cell.appendChild(cellText)
      row.appendChild(cell)
      var cell = document.createElement('td')
      var cellText = document.createTextNode(item[page][i].sell)
      cell.appendChild(cellText)
      row.appendChild(cell)
      tblBody.appendChild(row)
    } else {
      return
    }
  }
  tbl.appendChild(tblBody)
}

//任意のタブにURLからリンクするための設定
function GethashID(hashIDName) {
  if (hashIDName) {
    //タブ設定
    $('.tab li')
      .find('a')
      .each(function () {
        //タブ内のaタグ全てを取得
        var idName = $(this).attr('href') //タブ内のaタグのリンク名（例）#lunchの値を取得
        if (idName == hashIDName) {
          //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
          var parentElm = $(this).parent() //タブ内のaタグの親要素（li）を取得
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
$('.tab a').on('click', function () {
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
