# lol-build-manager-chrome-extension
Chrome extension for the League of Legends build manager.

It works by listening to tab changes and checking if tab url is supported by League of Legends Build Manager and showing [`pageAction`](https://developer.chrome.com/extensions/pageAction) button that opens a new that opens [League of Legends Build Manager app](https://github.com/renarsvilnis/lol-build-manager-electron-app).

### Developing
```bash
npm install
npm run watch
```

#### Running extension
1. Go to `chrome://extensions/`
2. enable `Developer mode`
3. click `Load unpacked extension`, select path to `path/to/lol-build-manager-chrome-extension/build`
4. for debugging open dev-tools by clicking `Inspect views: background page`

### Publishing
```bash
npm run build
```

Upload extension and update store info through Google Chrome web store [Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)

### TODO
- [ ] Close newly created tabbed after visiting page
- [ ] Add automated icon importing
- [ ] [Add automated build number incrementing](https://github.com/ragingwind/gulp-chrome-manifest)
- [ ] Wait for design makeover
- [ ] Publish in Chrome Extension store
- [ ] JavaScript file minification in build



