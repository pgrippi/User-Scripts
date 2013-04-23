// ==UserScript==
// @name Trello Card Colorizer
// @namespace http://petergrippi.com/
// @description adds color to cards
// @match https://trello.com/board/*
// @version 1.1
// ==/UserScript==
(function () {
  "use strict";

  function load(url, onLoad) {
    var tag = document.createElement("script");
    tag.setAttribute("src", url);
    if (typeof (onLoad) === 'function') {
      tag.addEventListener('load', onLoad);
    }
    document.body.appendChild(tag);
  }

  function execute(functionOrCode) {
    var code, tag = document.createElement("script");

    if (typeof (functionOrCode) === "function") {
      code = "(" + functionOrCode + ")()";
    } else {
      code = functionOrCode;
    }
    tag.textContent = code;
    document.body.appendChild(tag);
  }

  function loadAndExecute(url, functionOrCode) {
    return load(url, function () { return execute(functionOrCode); });
  }

  loadAndExecute('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
    var jQuery = window.jQuery.noConflict(true);
    var $ = jQuery;

    var colorizer = function() {
      $('.card-label').each(function(){
        var $this = $(this), data = $this.data();
        if (!data.colorized) {
          $this.closest('.list-card').css('background-color', $this.css('background-color'));
          $this.data('colorized', true);
        }
      });
    };

    $(function() { colorizer(); });
    setInterval(colorizer, 5000);
  });
}(this));
