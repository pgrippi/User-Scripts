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

  var ticker = document.getElementById('pagelet_rhc_ticker');
  if (ticker !== null) {
    ticker.style.display = 'none';
  }
}());