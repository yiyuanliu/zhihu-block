var strArray = new Array()
var patternArray = new Array()

chrome.storage.sync.get(new Array('enable_main', 'keywords', 'patterns',  'enable_topic', 'enable_explore' ), function (o) {
  if (o['keywords']) {
    strArray = o['keywords']
  }

  if (o['patterns']) {
    patternArray = o['patterns']
  }

  for (var i = 0; i < strArray.length; i++) {
    addItem(strArray[i])
  }

  for (var i = 0; i < patternArray.length; i++) {
    addPatternItem(patternArray[i])
  }

  var ids = new Array('enable_main', 'enable_topic', 'enable_explore')
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i]
    if (o[id] != undefined) {
      document.getElementById(ids[i]).checked = true
    }
  }
  console.log(o);
})
document.getElementById('enable_main').addEventListener('change',function () { onStateChanged('enable_main') })
document.getElementById('enable_topic').addEventListener('change',function () { onStateChanged('enable_topic') })
document.getElementById('enable_explore').addEventListener('change',function () { onStateChanged('enable_explore') })

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
  document.getElementById('keyword-list').appendChild(li)
}

function removeKeyWord(str) {
  if (strArray.indexOf(str) != -1) {
    strArray.splice(strArray.indexOf(str), 1)
    chrome.storage.sync.set({'keywords': strArray}, function () { removeItem(str) })
  }
}

function removeItem(str) {
  document.getElementById('keyword-list').removeChild(document.getElementById('id:' + str))
}

function addPatternItem(str) {
  var li = document.createElement('li')
  var text = document.createTextNode(str)

  var close = document.createElement('a')
  close.setAttribute('href', '#')
  close.setAttribute('class', 'close')
  close.addEventListener('click', function(){ removePattern(str) })
  close.appendChild(document.createTextNode('删除'))

  li.appendChild(text)
  li.appendChild(close)
  li.setAttribute('id','id-pattern:' + str)
  document.getElementById('pattern-list').appendChild(li)
}

function removePattern(str) {
  if (patternArray.indexOf(str) != -1) {
    patternArray.splice(patternArray.indexOf(str), 1)
    chrome.storage.sync.set({'patterns': patternArray}, function () { removePatternItem(str) })
  }
}

function removePatternItem(str) {
  document.getElementById('pattern-list').removeChild(document.getElementById('id-pattern:' + str))
}

function onStateChanged(id) {
  var key = id;
  var value = document.getElementById(id).checked
  switch (id) {
    case 'enable_main':
    case 'enable_topic':
    case 'enable_explore':
      break;
    default:
      return
  }
  var obj = {}
  obj[key] = value
  chrome.storage.sync.set(obj, function () { })
}
