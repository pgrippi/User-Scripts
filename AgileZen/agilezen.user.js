// ==UserScript==
// @name AgileZen Pipeline Reloader
// @namespace http://petergrippi.com/
// @description adds quick page reload to the agile zen pipeline page
// @include https://agilezen.com/project/*/board*
// ==/UserScript==
/*jslint browser: true, sub: false, white: false, maxerr: 50, indent: 2 */
(function (window) {
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

  loadAndExecute('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', function () {
    var $ = window.jQuery,
      paused = false,
      timer,
      secs = 300,
      container = $('<div id="reload">Reloading in <span>' + secs + '</span> seconds.</div>').appendTo(document.body),
      counter = container.find('span'),
      cb = $('<input type="checkbox" checked="checked"/>').prependTo(container),
      style = document.createElement('style');

    style.type = 'text/css';
    style.textContent = '#reload{width:300px;position:absolute;top:0;border:2px solid #000;border-top:none;font:13px/16px Tahoma, Arial, Verdana, sans-serif;background:#fff url(https://agilezen.com/content/images/app/header-bg.png) 0 0 repeat-x;color:#000;text-align:center;font-style:normal;display:none;margin:0;padding:6px;z-index:9999}#reload.disabled{color:#999;font-style:italic}#reload input{margin:0 4px 0 0}';
    document.getElementsByTagName('head')[0].appendChild(style);

    function unbindTimer() {
      window.clearInterval(timer);
    }

    function tick() {
      var inputCount = $(document.getElementsByTagName('textarea')).add(document.getElementsByTagName('select')).filter(':visible').length;
      if (inputCount > 0) {
        if (!paused) {
          paused = true;
          container.addClass('disabled');
        }
        return;
      }

      if (paused) {
        paused = false;
        container.removeClass('disabled');
      }

      secs -= 1;
      if (secs <= 0) {
        window.location.reload();
        unbindTimer();
        container.text('Reloading...');
        return;
      }
      counter.text(secs);
    }

    function bindTimer() {
      timer = window.setInterval(tick, 1000);
    }

    function relocate() {
      container.css({
        'left': ($(window).width() / 2) - (container.outerWidth(true) / 2)
      });
    }

    $(window).on('resize', relocate);
    relocate();

    cb.on('click', function () {
      if (cb.prop('checked')) {
        bindTimer();
        container.removeClass('disabled');
      } else {
        unbindTimer();
        container.addClass('disabled');
      }
      paused = false;
    });

    container.css({ 'top': (container.outerHeight() * -1) + 'px' }).show().animate({ 'top': 0 }, 600);
    bindTimer();
  });
}(this));
