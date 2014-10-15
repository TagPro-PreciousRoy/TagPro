// ==UserScript==
// @name          Bot
// @description   Bot
// @version       0.00001
// @author        Ulysses
// @namespace     http://www.reddit.com/user/Ulysses
// @include       http://maptest.newcompte.fr:*
// @license       2014
// ==/UserScript==

var source = "(" + Bot + ")()";
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = source;
document.body.appendChild(script);
