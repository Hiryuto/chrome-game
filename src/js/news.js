document.getElementById('mainpage').addEventListener('click', () => {
  window.location.href = 'index.html'
})

const newsIndex = await (
  await fetch('https://raw.githubusercontent.com/Hiryuto/chrome-rpg-notification/main/notification-index.json', {
    cache: 'no-cache',
  })
).json()

function load() {
  const main = document.getElementById('screen')
  const newsList = document.createElement('div')
  newsList.className = 'newsList'
  let newsCount = 0
  if (newsIndex.index.length == 0) {
    const noNews = document.createElement('h3')
    noNews.innerHTML = 'お知らせはありません'
    noNews.className = 'noNews'
    newsList.append(noNews)
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
          lastUpdate.innerHTML = `${lastUpdateTime.toLocaleDateString()} ${lastUpdateTime.toLocaleTimeString('en-US', {
            timeStyle: 'short',
          })}`
        }
        const description = document.createElement('p')
        description.innerHTML = newsIndex.index[i].description
        description.className = 'descriptionShort'
        const hr = document.createElement('hr')
        newsContent.append(title)
        newsContent.append(lastUpdate)
        newsContent.append(hr)
        if (newsIndex.index[i].more == true) {
          const br = document.createElement('br')
          const more = document.createElement('p')
          more.innerHTML = '続きを読む'
          more.className = 'more'
          newsContent.append(description)
          newsContent.append(more)
        } else {
          newsContent.append(description)
        }
        newsList.append(newsContent)
      }
      newsCount++
    }
  }
  main.append(newsList)
  console.log(newsIndex)
}

window.onload = load()
