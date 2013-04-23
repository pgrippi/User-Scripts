// ==UserScript==
// @name Trello Card Colorizer
// @namespace http://petergrippi.com/
// @description adds color to cards
// @match https://trello.com/board/*
// ==/UserScript==
(function(){
  "use strict";

  var root = this;
  var $ = root.jQuery;
  $('.card-label').each(function(){
    var $this = $(this);
    $this.closest('.list-card').css('background-color', $this.css('background-color'));
  });
}).call(this);