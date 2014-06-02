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

// Require and call a TiddlyWiki core module
// (We can't use require() because this module (main.js) is external to TW)
var u = $tw.modules.execute("$:/core/modules/utils/utils.js");
console.log(u.htmlEncode("<yes it works!>"));

// Require and call a module from one of our integral plugins
var d = $tw.modules.execute("$:/plugins/tiddlywiki/dummyplugin/dummy.js");
console.log(d.helloThere());

// Output an unencrypted TW HTML file
var fs = require("fs");
fs.writeFileSync("../../../../../index.html",$tw.wiki.renderTiddler("text/plain","$:/core/save/all"),"utf8");

// Output an encrypted TW HTML file 
$tw.crypto.setPassword("password");
$tw.wiki.addTiddler(new $tw.Tiddler({title: "$:/isEncrypted", text: "yes"}));
console.log("encryption status",$tw.wiki.getTiddlerText("$:/isEncrypted"));
fs.writeFileSync("../../../../../encrypted.html",$tw.wiki.renderTiddler("text/plain","$:/core/save/all"),"utf8");
$tw.crypto.setPassword(null);
$tw.wiki.addTiddler(new $tw.Tiddler({title: "$:/isEncrypted", text: "no"}));

// Render a tiddler to the DOM and refresh subsequent changes
var PAGE_TEMPLATE_TITLE = "HelloThere";

var pageWidgetNode = $tw.wiki.makeTranscludeWidget(PAGE_TEMPLATE_TITLE,{document: document});
	
var pageContainer = document.getElementById("tiddlerContent");

pageWidgetNode.render(pageContainer,null);

$tw.wiki.addEventListener("change",function(changes) {
	pageWidgetNode.refresh(changes,pageContainer,null);
});

window.setTimeout(function() {
	$tw.wiki.addTiddler({title: "ExtraMessage", text: "Inserted via a 5s timer"});
},5 * 1000);

})();
