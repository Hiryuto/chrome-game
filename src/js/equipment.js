import { getGear } from './global.js'
import { item } from '../asset/data.js'

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
  var hashName = '#Helmet' //リンク元の指定されたURLのハッシュタグを取得
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
    document.querySelectorAll(`#${CategoryName} .nowEquipment tbody tr td`)[0].innerHTML = nowAccessoryName1
    document.querySelectorAll(`#${CategoryName} .nowEquipment tbody tr td`)[1].innerHTML = nowAccessoryName2
  } else if (nowGear[`${CategoryName}`] != null) {
    //何かを装備していたら
    let nowGearName = item[`${dataCategoryID}`][`${nowGear[`${CategoryName}`]}`].name
    document.querySelector(`#${CategoryName} .nowEquipment tbody tr td`).innerHTML = nowGearName
  } else {
    //もし何も装備していなかったら
    document.querySelector(`#${CategoryName} .nowEquipment tbody tr td`).innerHTML = '装備していません'
  }
}
