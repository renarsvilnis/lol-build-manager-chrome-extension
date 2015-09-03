import {isSiteSupported, createAppProtocolUrl} from 'lol-build-manager-util';

/**
 * Check if tab exists
 * Reference: http://stackoverflow.com/a/27532535/1378261
 * @param  {string|number} tabId
 * @param  {Function} callback [description]
 * @return {null}
 * @return {Boolean} Does tab exists
 */
let tabExists = function(tabId, callback) {

  // Check tab id if not null, as it is optional
  // Reference: https://developer.chrome.com/extensions/tabs
  if(!tabId) {
    callback(null, false);
    return;
  }

  chrome.tabs.get(tabId, function() {
    let exists = chrome.runtime.lastError ? false : true;
    callback(null, exists);
  });
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  tabExists(tabId, function(err, exists) {
    if(!err && exists && isSiteSupported(tab.url))
      chrome.pageAction.show(tabId);
  });
});

// Listen to page action clicks
chrome.pageAction.onClicked.addListener(function(tab) {

  tabExists(tab.id, function(err, exists) {

    // just ignore non-existing tabs
    if(err || !exists)
      return;

    // data object which gets sent to the native application
    let data = {
      url: tab.url
    };

    createAppProtocolUrl(data, function(err, newTabUrl) {

      if(err)
        return;

      // new tab options
      let opts = {
        url: newTabUrl
      };

      chrome.tabs.create(opts, function(newTab) {
        // TODO: listen when tab loaded then close it
        // chrome.tabs.remove(newTab.id);
      });
    });
  });
});
