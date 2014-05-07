(function(){

/*jslint browser: true */
"use strict";

var gui = require("nw.gui"),
	fs = require("fs");

// Get the main window
var mainWindow = gui.Window.get();
mainWindow.showDevTools();

// Load TiddlyWiki

var $tw = {};

// First part of boot process
require("../../../../../../../../TiddlyWiki5/boot/bootprefix.js").bootprefix($tw);

console.log("working direcory",process.cwd())

// Set command line
$tw.boot = $tw.boot || {};
$tw.boot.argv = ["./wiki"];

// Disable rendering
$tw.boot.disabledStartupModules = ["render"];

// Main part of boot process
require("../../../../../../../../TiddlyWiki5/boot/boot.js").TiddlyWiki($tw);

// Add some tiddlers
$tw.wiki.addTiddler({title: "TiddlerOne", text: "Text of tiddler one, incorporating the {{TiddlerTwo}}", tags: ["alpha", "beta"]});
$tw.wiki.addTiddler({title: "TiddlerTwo", text: "Text of tiddler two"});

// Render a tiddler as HTML
var html = $tw.wiki.renderTiddler("text/html","TiddlerOne",{document: $tw.document});
console.log(html);

html = $tw.wiki.renderTiddler("text/html","HelloThere",{document: $tw.document});
console.log(html);

// Require and call a module
// (We can't use require() because this module (main.js) is external to TW)
var u = $tw.modules.execute("$:/core/modules/utils/utils.js");
console.log(u.htmlEncode("<yes it works!>"));

})();
