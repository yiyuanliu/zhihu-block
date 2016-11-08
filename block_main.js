stringArray = new Array()
patternArray = new Array()
height = document.body.scrollHeight
enable = true

chrome.storage.sync.get(new Array('keywords', 'enable_main', 'patterns'), function (o) {
  if (o['keywords']) {
    stringArray = o['keywords']
  }

  if (o['enable_main'] != undefined) {
    enable = o['enable_main']
  }

  if (o['patterns']) {
    patternArray = o['patterns']
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
  if (enable) {
    if (changes['keywords'] && changes['keywords'].newValue) {
      stringArray = changes['keywords'].newValue
      blockTopics()
    }

    if (changes['patterns'] && changes['patterns'].newValue) {
      patternArray = changes['patterns'].newValue
      blockTopics()
    }
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
  if (feedItem.getElementsByClassName('feed-title')[0]) {
    var content = feedItem.getElementsByClassName('feed-title')[0].innerText.toLowerCase()
    if (!content) {
      return false
    }

    for (var i = 0; i < stringArray.length; i++) {
      var match = stringArray[i]
      if (content.indexOf(match.toLowerCase()) != -1) {
        return true;
      }
    }

    for (var i = 0; i < patternArray.length; i++) {
      try {
        if (content.match(patternArray[i])) {
          console.log('match ' + patternArray[i]);
          return true
        }
      } catch (e) {
        console.log(e);
      }
    }
    return false
  }
}

function blockItem(feedItem) {
  feedItem.style.display = 'none'
}
