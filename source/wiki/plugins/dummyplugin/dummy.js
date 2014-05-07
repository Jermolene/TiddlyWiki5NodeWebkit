/*\
title: $:/plugins/tiddlywiki/dummyplugin/dummy.js
type: application/javascript
module-type: module

A simple hello world example

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.helloThere = function() {
	return "HelloThere!";
}

})();
