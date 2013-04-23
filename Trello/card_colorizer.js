// ==UserScript==
// @name Trello Card Colorizer
// @namespace http://petergrippi.com/
// @description adds color to cards
// @include https://trello.com/board/*
// ==/UserScript==
/*jslint browser: true, sub: false, white: false, maxerr: 50, indent: 2 */
(function(){
  "use strict";

  var root = this;
  var $ = root.jQuery;
  $('.card-label').each(function(){
    var $this = $(this);
    $this.closest('.list-card').css('background-color', $this.css('background-color'));
  });
}).call(this);