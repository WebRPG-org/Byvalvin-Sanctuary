// =========================================
// Scene_Options_Help_Window
// =========================================

/*:
* @plugindesc This plugin will add a new window to the Options Scene
* @author Aloe Guvner
*
* @param HelpWindowX
* @desc X-position to start the help window (in pixels)
* Default 0
* @default 0
*
* @param HelpWindowY
* @desc Y-position to start the help window (in pixels)
* Default 0
* @default 0
*
* @param HelpWindowWidth
* @desc Width of the help window (in pixels)
* Default 300 (does not size dynamically based on text content)
* @default 300
*
* @param HelpWindowHeight
* @desc Height of the help window (in pixels)
* Leave blank to size the window dynamically based on text content
*
* @param TextLine1
* @desc First line of text to show in the new window
*
* @param TextLine2
* @desc Second line of text to show in the new window
*
* @param TextLine3
* @desc Third line of text to show in the new window
*
* @param TextLine4
* @desc Fourth line of text to show in the new window
*
* @param TextLine5
* @desc Fifth line of text to show in the new window
*
* @param TextLine6
* @desc Sixth line of text to show in the new window
*
* @param TextLine7
* @desc Seventh line of text to show in the new window
*
* @param OptionsCommandX
* @desc X position of the Options Command window
* Formulas or values accepted, leave blank for default
*
* @param OptionsCommandY
* @desc Y position of the Options Command window
* Formulas or values accepted, leave blank for default
*/

(function() {

var params = PluginManager.parameters("SceneOptionsHelpWindow");

var helpText = [];
for (var i=0; i < Object.keys(params).length; i++) {
if (params["TextLine" + (i+1)]) {
helpText.push(String(params["TextLine"+(i+1)]));
}
}

var optionsHelpX = String(params["HelpWindowX"]) || 0;
var optionsHelpY = String(params["HelpWindowY"]) || 0;
var optionsHelpWidth = String(params["HelpWindowWidth"]);
var optionsHelpHeight = String(params["HelpWindowHeight"]);
var optionsCommandX = String(params["OptionsCommandX"]);
var optionsCommandY = String(params["OptionsCommandY"]);


// =========================================
// Scene_Options
// =========================================

// Alias the create method of Scene_Options to also create the help window
var _Scene_Options_create = Scene_Options.prototype.create;
Scene_Options.prototype.create = function() {
_Scene_Options_create.call(this);
this.createOptionsHelpWindow();
};

Scene_Options.prototype.createOptionsHelpWindow = function() {
this._optionsHelpWindow = new Window_OptionsHelp(optionsHelpX, optionsHelpY);
this.addWindow(this._optionsHelpWindow);
}

// =========================================
// Window_OptionsHelp
// =========================================

function Window_OptionsHelp() {
this.initialize.apply(this, arguments);
}

Window_OptionsHelp.prototype = Object.create(Window_Base.prototype);
Window_OptionsHelp.prototype.constructor = Window_OptionsHelp;

Window_OptionsHelp.prototype.initialize = function(x, y) {
var width = this.windowWidth();
var height = this.windowHeight();
Window_Base.prototype.initialize.call(this, x, y, width, height);
this.refresh();
};

Window_OptionsHelp.prototype.windowWidth = function() {
//var width = this.maxWidth() + this.padding * 2;
//return optionsHelpWidth || Math.min(width, Graphics.boxWidth);
return optionsHelpWidth || 240;
};

Window_OptionsHelp.prototype.windowHeight = function() {
return optionsHelpHeight || this.fittingHeight(helpText.length);
};

Window_OptionsHelp.prototype.refresh = function() {
var x = this.textPadding();
var y = 0;
var width = this.contents.width - this.textPadding() * 2;
this.contents.clear();
for (var i = 0; i < helpText.length; i++) {
this.drawText(this.value(i), x, y + this.lineHeight() * i, width);
}
};

Window_OptionsHelp.prototype.value = function(i) {
return helpText[i];
};

Window_OptionsHelp.prototype.open = function() {
this.refresh();
Window_Base.prototype.open.call(this);
};

// =========================================
// Window_Options
// =========================================

var _Window_Options_updatePlacement = Window_Options.prototype.updatePlacement;
Window_Options.prototype.updatePlacement = function() {
_Window_Options_updatePlacement.call(this);
this.x = eval(optionsCommandX) || (Graphics.boxWidth - this.width) / 2;
this.y = eval(optionsCommandY) || (Graphics.boxHeight - this.height) / 2;
};

})();