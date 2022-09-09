function main_view() {
  var mainquest = document.createElement('button')
  mainquest.innerHTML = 'メインクエスト'
  mainquest.style = 'padding: 20px'
  mainquest.id = 'mainquest'
  mainquest.disabled = false
  mainquest.onclick = function () {
    main_quest()
  }
  document.getElementById('screen').appendChild(mainquest)
  var subquest = document.createElement('button')
  subquest.innerHTML = 'サブクエスト'
  subquest.style = 'padding: 20px; margin-left: 10px;'
  subquest.id = 'subquest'
  subquest.type = 'submit'
  subquest.disabled = true
  document.getElementById('screen').appendChild(subquest)
}
function main_quest() {
  clear_screen()

  const screen = document.getElementById('screen')
  while (screen.lastChild) {
    screen.removeChild(screen.lastChild)
  }
  for (var i = 1; stageNumber >= i; i++) {
    var id = i - 1
    var button = document.createElement('button')
    button.style = 'margin-bottom: 5px;'
    button.innerHTML = `${stage.data[id].StageName}`
    button.id = stage.data[id].StageId
    button.onclick = function () {
      stageload(i - 1)
    }
    document.getElementById('screen').prepend(button)
    var br = document.createElement('br')
    document.getElementById('screen').prepend(br)
  }
  var h2 = document.createElement('h2')
  h2.innerHTML = 'ステージを選択してください'
  document.getElementById('screen').prepend(h2)
  document.getElementById('mainpage').style.display = 'inline-block'
  document.getElementById('hr').style.display = 'block'
  document.getElementById('br').style.display = 'none'
}

function clear_screen() {
  const screen = document.getElementById('screen')
  while (screen.lastChild) {
    screen.removeChild(screen.lastChild)
  }
}

main_view()
