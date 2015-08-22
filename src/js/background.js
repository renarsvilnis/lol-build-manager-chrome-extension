
const config = require('lol-build-manager-config');
var util = require('lol-build-manager-util');

let isSiteSupported = function(url) {
  return util.isSubstringsInString(url, config.supportedBuildSites) > -1;
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
  // data object which gets sent to the native application
  let data = {
    url: tab.url
  };

  // new tab options
  let opts = {
    url: config.urlProtocol + '://' + util.encodeUrlData(data)
  };

  chrome.tabs.create(opts, function(newTab) {
    // TODO: listen when tab loaded then close it
    // chrome.tabs.remove(newTab.id);
  });
});

