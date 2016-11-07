stringArray = new Array()
height = document.body.scrollHeight
enable = true

chrome.storage.sync.get(new Array('keywords', 'enable_main'), function (o) {
  if (o['keywords']) {
    stringArray = o['keywords']
  }

  if (o['enable_main'] != undefined) {
    enable = o[enable_main]
  }

  if (enable) {
    blockTopics()
    setInterval(function () {
      if (document.body.scrollHeight != height) {
        blockTopics()
      }
    }, 1000)
  }
})

chrome.storage.onChanged.addListener(function(changes, namespace) {
  var newArray = changes['keywords'].newValue;
  if (newArray && enable) {
    stringArray = newArray
    blockTopics()
  }
})

function blockTopics() {
  var feedItems = document.getElementsByClassName('feed-item')
  for (var i = 0; i < feedItems.length; i++) {
    var item = feedItems[i]
    if (isMatch(item)) {
      blockItem(item)
    }
  }
  height = document.body.scrollHeight
}

function isMatch(feedItem) {
  var content = feedItem.getElementsByClassName('feed-title')[0].innerText
  if (!content) {
    return false
  }

  for (var i = 0; i < stringArray.length; i++) {
    var match = stringArray[i]
    if (content.indexOf(match) != -1) {
      return true;
    }
  }
  return false
}

function blockItem(feedItem) {
  feedItem.style.display = 'none'
}
