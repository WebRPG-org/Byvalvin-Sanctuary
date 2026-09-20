//=============================================================================
// Plugin Base.js
//=============================================================================

/*:

 *@plugindesc

 *@author Bananabelle

 *
 *@help Removes HP, MP, and Level from main menu status.

 */

 Window_Base.prototype.drawActorSimpleStatus2 = function(actor, x, y, width) {
     var lineHeight = this.lineHeight();
     var x2 = x + 180;
     var width2 = Math.min(200, width - 180 - this.textPadding());
     this.drawActorName(actor, x, y);
     this.drawActorIcons(actor, x, y + lineHeight * 2);
     this.drawActorClass(actor, x2, y);
 };
 Window_MenuStatus.prototype.drawItemStatus = function(index) {
     var actor = $gameParty.members()[index];
     var rect = this.itemRect(index);
     var x = rect.x + 162;
     var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
     var width = rect.width - x - this.textPadding();
     this.drawActorSimpleStatus2(actor, x, y, width);
 };
