import { getNewsLatestReadTime } from './global.js'

document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})

const newsIndex = await (
  await fetch('https://raw.githubusercontent.com/Hiryuto/chrome-rpg-notification/dev/notification-index.json', { cache: 'no-cache' })
).json()

function load() {
  updateLastReadNewsTime()
  const main = document.getElementById('screen')
  const newsList = document.createElement('div')
  newsList.className = 'newsList'
  let newsCount = 0
  let newsListNumber = 0
  if (newsIndex.index.length == 0) {
    console.log(newsIndex.index)
    const noNews = document.createElement('h3')
    noNews.innerHTML = 'お知らせはありません'
    noNews.className = 'noNews'
    newsList.append(noNews)
    return main.append(newsList)
  } else {
    for (let i = newsIndex.index.length - 1; i > -1; i--) {
      if (newsCount < 5) {
        const newsContent = document.createElement('div')
        newsContent.className = 'newsContent'
        newsContent.addEventListener('click', function () {
          console.log(`${newsIndex.index[i].categoryId}    ${newsIndex.index[i].notificationId}`)
        })
        const title = document.createElement('h1')
        title.innerHTML = newsIndex.index[i].title
        const lastUpdate = document.createElement('p')
        lastUpdate.className = 'date'
        if (newsIndex.index[i].updateTime == 'TIMESTAMP') {
          lastUpdate.innerHTML = '数分前'
        } else {
          const lastUpdateTime = new Date(newsIndex.index[i].updateTime * 1000)
          lastUpdate.innerHTML = `${lastUpdateTime.toLocaleDateString()} ${lastUpdateTime.toLocaleTimeString('en-US', { timeStyle: 'short' })}`
        }
        const description = document.createElement('p')
        description.innerHTML = newsIndex.index[i].description
        description.className = 'descriptionShort'
        const hr = document.createElement('hr')
        newsContent.append(title)
        newsContent.append(lastUpdate)
        newsContent.append(hr)
        if (newsIndex.index[i].more == true) {
          const more = document.createElement('p')
          more.innerHTML = '続きを読む'
          more.className = 'more'
          newsContent.append(description)
          newsContent.append(more)
        } else {
          newsContent.append(description)
        }
        newsList.append(newsContent)
      } else {
      }
      if (newsCount % 5 === 0) {
        newsListNumber++
      }
      newsCount++
    }
    main.append(newsList)
    if (newsListNumber >= 2) {
      const listNumberBox = document.createElement('div')
      listNumberBox.className = 'listNumberBox'
      const listUl = document.createElement('ul')
      const listNumber = document.createElement('div')
      listNumber.className = 'listNumber'
      const listNumberLi = document.createElement('li')
      const listNumberButton = document.createElement('button')
      listNumberButton.innerHTML = '1'
      listNumberButton.disabled = true
      listNumberButton.addEventListener('click', function () {
        pageEvent(1, listNumberButton)
      })
      listNumberLi.append(listNumberButton)
      listNumber.append(listNumberLi)
      let numberCount = 0
      let etc = false
      for (let i = 2; i < newsListNumber; i++) {
        if (numberCount < 2) {
          const listNumberLi = document.createElement('li')
          const listNumberButton = document.createElement('button')
          listNumberButton.innerHTML = i
          listNumberButton.addEventListener('click', function () {
            pageEvent(i, listNumberButton)
          })
          listNumberLi.append(listNumberButton)
          listNumber.append(listNumberLi)
          numberCount++
        } else if (i >= 5 && etc == false) {
          var input = document.createElement('input')
          input.type = 'text'
          input.placeholder = '...'
          input.className = 'etc'
          input.id = 'etc'
          listNumber.append(input)
          etc = true
        }
      }
      const listNumberLiF = document.createElement('li')
      const listNumberButtonF = document.createElement('button')
      listNumberButtonF.innerHTML = newsListNumber
      listNumberButtonF.addEventListener('click', function () {
        pageEvent(newsListNumber, listNumberButtonF)
      })
      listNumberLiF.append(listNumberButtonF)
      listNumber.append(listNumberLiF)

      // if (newsListNumber>)
      listUl.append(listNumber)
      listNumberBox.append(listUl)
      main.append(listNumberBox)
      main.append(document.createElement('br'))
    }
    console.log(newsIndex)
  }
  document.getElementById('etc').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      if (document.getElementById('etc').value != '') {
        if (/[0-9]/.test(document.getElementById('etc').value)) {
          switch (document.getElementById('etc').value) {
            case '1':
            case '2':
            case '3':
            case document.querySelectorAll('.listNumber button')[document.querySelectorAll('.listNumber button').length - 1].innerHTML:
              alert('ボタンで選択してください')
              return (document.getElementById('etc').value = '')

            default:
              if (
                document.querySelectorAll('.listNumber button')[document.querySelectorAll('.listNumber button').length - 1].innerHTML >
                  document.getElementById('etc').value &&
                1 < document.getElementById('etc').value
              ) {
                pageEvent(document.getElementById('etc').value, null)
                document.getElementById('etc').value = ''
                const nowDisabled = document.querySelectorAll('[disabled]')
                for (let i = 0; i < nowDisabled.length; i++) {
                  nowDisabled[0].disabled = false
                }
              } else {
                alert('存在しないページです')
                return (document.getElementById('etc').value = '')
              }
              break
          }
        } else {
          alert('数字を入力してください')
          return (document.getElementById('etc').value = '')
        }
      }
    }
  })
}
function pageEvent(page, htmlElement) {
  if (htmlElement != null) {
    const nowDisabled = document.querySelectorAll('[disabled]')
    if (nowDisabled[1]) {
      alert('エラーが発生しました。\nホーム画面に戻ります')
      window.location = './index.html'
    }
    console.log(nowDisabled)
    if (nowDisabled.length != 0) {
      nowDisabled[0].disabled = false
    }
    htmlElement.disabled = true
  }
  const oldNewsList = document.getElementsByClassName('newsList')[0]
  oldNewsList.remove()
  const main = document.getElementById('screen')
  const newsList = document.createElement('div')
  newsList.className = 'newsList'
  let newsCount = 0
  let newsListNumber = 0
  //prettier-ignore
  const viewNewsListNumber = (newsIndex.index.length + 5) - (page * 5)
  for (let i = viewNewsListNumber - 1; i > -1; i--) {
    if (newsCount < 5) {
      const newsContent = document.createElement('div')
      newsContent.className = 'newsContent'
      newsContent.addEventListener('click', function () {
        console.log(`${newsIndex.index[i].categoryId}    ${newsIndex.index[i].notificationId}`)
      })
      const title = document.createElement('h1')
      title.innerHTML = newsIndex.index[i].title
      const lastUpdate = document.createElement('p')
      lastUpdate.className = 'date'
      if (newsIndex.index[i].updateTime == 'TIMESTAMP') {
        lastUpdate.innerHTML = '数分前'
      } else {
        const lastUpdateTime = new Date(newsIndex.index[i].updateTime * 1000)
        lastUpdate.innerHTML = `${lastUpdateTime.toLocaleDateString()} ${lastUpdateTime.toLocaleTimeString('en-US', { timeStyle: 'short' })}`
      }
      const description = document.createElement('p')
      description.innerHTML = newsIndex.index[i].description
      description.className = 'descriptionShort'
      const hr = document.createElement('hr')
      newsContent.append(title)
      newsContent.append(lastUpdate)
      newsContent.append(hr)
      if (newsIndex.index[i].more == true) {
        const more = document.createElement('p')
        more.innerHTML = '続きを読む'
        more.className = 'more'
        newsContent.append(description)
        newsContent.append(more)
      } else {
        newsContent.append(description)
      }
      newsList.append(newsContent)
    } else {
    }
    if (newsCount % 5 === 0) {
      newsListNumber++
    }
    newsCount++
  }
  console.log(newsListNumber)
  main.prepend(newsList)
}

window.onload = load()

async function updateLastReadNewsTime() {
  const lastReadNews = await getNewsLatestReadTime()
  lastReadNews.lastReadNews = newsIndex.lastUpdate
  chrome.storage.local.set({
    lastReadNewsTime: lastReadNews,
  })
}
