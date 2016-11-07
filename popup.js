var strArray = new Array()
chrome.storage.sync.get('keywords', function (o) {
  if (o['keywords']) {
    strArray = o['keywords']
  }

  for (var i = 0; i < strArray.length; i++) {
    addItem(strArray[i])
  }
})

document.getElementById('add').addEventListener('click', function() {
  addKeyWord(document.getElementById('input').value)
})

document.getElementById('input').addEventListener('keydown', function (event) {
  console.log(event + " " + event.keyCode);
  if (event.keyCode == '13') {
    addKeyWord(document.getElementById('input').value)
  }
})

function addKeyWord(str) {
  var isBlank = true;
  for (var i = 0; i < str.length; i++) {
    if (str[i] != ' ') {
      isBlank = false;
      break;
    }
  }

  if (!isBlank && strArray.indexOf(str) == -1) {
    strArray[strArray.length] = str
    chrome.storage.sync.set({'keywords': strArray}, function () {
      addItem(str)
    })
  }
}

function addItem(str) {
  var li = document.createElement('li')
  var text = document.createTextNode(str)

  var close = document.createElement('a')
  close.setAttribute('href', '#')
  close.setAttribute('class', 'close')
  close.addEventListener('click', function(){ removeKeyWord(str)
    console.log('remove ' + str); })
  close.appendChild(document.createTextNode('删除'))

  li.appendChild(text)
  li.appendChild(close)
  li.setAttribute('id','id:' + str)
  document.getElementById('list').appendChild(li)
}

function removeKeyWord(str) {
  if (strArray.indexOf(str) != -1) {
    strArray.splice(strArray.indexOf(str), 1)
    chrome.storage.sync.set({'keywords': strArray}, function () { removeItem(str) })
  }
}

function removeItem(str) {
  document.getElementById('list').removeChild(document.getElementById('id:' + str))
}
