var strArray = undefined
var patternArray = undefined

chrome.storage.sync.get(new Array('keywords', 'patterns'), function (o) {
  if (o['keywords']) {
    strArray = o['keywords']
  } else {
    strArray = new Array()
  }

  if (o['patterns']) {
    patternArray = o['patterns']
  } else {
    patternArray = new Array()
  }
})

document.getElementById('add').addEventListener('click', function() {
  addKeyWord(document.getElementById('input').value)
})

document.getElementById('input').addEventListener('keydown', function (event) {
  if (event.keyCode == '13') {
    addKeyWord(document.getElementById('input').value)
  }
})

document.getElementById('pattern-add').addEventListener('click', function () {
  addPattern(document.getElementById('pattern-input').value)
})

document.getElementById('pattern-input').addEventListener('keydown', function () {
  if (event.keyCode == '13') {
    addPattern(document.getElementById('pattern-input').value)
  }
})

document.getElementById('keyword-msg').style.display = 'none'
document.getElementById('pattern-msg').style.display = 'none'

function addKeyWord(str) {
  if (!strArray) {
    return
  }
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
      document.getElementById('keyword-msg').style.display = 'block'
      document.getElementById('keyword-msg').innerText = '添加成功'
      document.getElementById('input').value = ''
      document.getElementById('input').focus()
    })
  } else if (isBlank) {
    document.getElementById('keyword-msg').style.display = 'block'
    document.getElementById('keyword-msg').innerText = '关键词为空'
  } else {
    document.getElementById('keyword-msg').style.display = 'block'
    document.getElementById('keyword-msg').innerText = '已经添加过该关键词'
  }
}

function addPattern(str) {
  if (!patternArray) {
    return
  }

  try {
    var reg = new RegExp(str)
  } catch (e) {
    console.log(e);
    document.getElementById('pattern-msg').style.display = 'block'
    document.getElementById('pattern-msg').innerText = '表达式错误'
    return
  }

  var isBlank = true;
  for (var i = 0; i < str.length; i++) {
    if (str[i] != ' ') {
      isBlank = false;
      break;
    }
  }

  if (!isBlank && patternArray.indexOf(str) == -1) {
    patternArray[patternArray.length] = str
    chrome.storage.sync.set({'patterns': patternArray}, function () {
      console.log("pattern added " + str);
      document.getElementById('pattern-msg').style.display = 'block'
      document.getElementById('pattern-msg').innerText = '添加成功'
      document.getElementById('pattern-input').value = ''
      document.getElementById('pattern-input').focus()
    })
  } else if (isBlank) {
    document.getElementById('pattern-msg').style.display = 'block'
    document.getElementById('pattern-msg').innerText = '表达式错误'
  } else {
    document.getElementById('pattern-msg').style.display = 'block'
    document.getElementById('pattern-msg').innerText = '已经添加过该表达式'
  }

}
