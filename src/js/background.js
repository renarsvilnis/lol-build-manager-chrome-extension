// import {isSiteSupported, createAppProtocolUrl} from 'lol-build-manager-util';
import {isSiteSupported, createAppProtocolUrl} from 'lol-build-manager-util';

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(isSiteSupported(tab.url))
    chrome.pageAction.show(tabId);
});

// Listen to page action clicks
chrome.pageAction.onClicked.addListener(function(tab) {

  // data object which gets sent to the native application
  let data = {
    url: tab.url
  };

  let newTabUrl = createAppProtocolUrl(data);

  // new tab options
  let opts = {
    url: newTabUrl
  };

  chrome.tabs.create(opts, function(newTab) {
    // TODO: listen when tab loaded then close it
    // chrome.tabs.remove(newTab.id);
  });
});
