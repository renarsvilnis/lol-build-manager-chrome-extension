
const config = require('lol-build-manager-config');
let util = require('lol-build-mananger-config');

let isSiteSupported = function(url) {
  return util.isSubstringsInString(url, SUPPORTED_SITES) > -1;
};

// Called when the url of a tab changes.
let checkForValidUrl = function(tabId, changeInfo, tab) {
  if (isSiteSupported(tab.url))
    chrome.pageAction.show(tabId);
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// Listen to page action clicks
chrome.pageAction.onClicked.addListener(function(tab) {

  // TODO: get additional info about the website
  // data object for the native applications
  var data = {
    url: tab.url
  };

  // new tab options
  var opts = {
    url: config.shema + '://' + util.encodeUrlData(data)
  };

  chrome.tabs.create(opts, function(newTab) {
    console.log('Data sent:', opts.url);

    // TODO: listen when tab loaded then close it
    // chrome.tabs.remove(newTab.id);
  });
});

