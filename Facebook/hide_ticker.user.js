// ==UserScript==
// @name Facebook Ticker Hider
// @namespace http://petergrippi.com/
// @description hides the new Ticker on the Facebook home page
// @match http://www.facebook.com/*
// @match https://www.facebook.com/*
// ==/UserScript==
/*jslint browser: true, sub: false, white: false, maxerr: 50, indent: 2 */
(function (window) {
  "use strict";

  var ticker_chatbar = document.getElementById('pagelet_ticker'), style;

  if (ticker_chatbar !== null) {
    ticker_chatbar.style.display = 'none';
  }

  style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = '.fbFeedTicker { display: none !important; }';
  document.getElementsByTagName('head')[0].appendChild(style);
}(window));
