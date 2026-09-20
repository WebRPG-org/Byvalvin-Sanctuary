// This plugin was compiled from sapphirescript (v1.0 Beta)
// sapphirescript by Nilo K. - Khas (arcthunder.blogspot.com/p/sapphire-script.html)

//=====================================================================================================================
// * KhasCore
//=====================================================================================================================

/// Core version
var Khas = Khas || {};
Khas.Core = {};
Khas.Core.version = 2.0;

/*:
 * 
 * @plugindesc [2.0] Required by Khas plugins.
 * 
 * @author Nilo K. (Khas - arcthunder.blogspot.com)
 * 
 * @help - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * [MV] Khas Core
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * By Nilo K. (Khas)
 *  * Version 2.0
 *  * Released on 04.08.2017
 * 
 *  * Social Media
 * Blog: arcthunder.blogspot.com
 * Patreon: patreon.com/khas
 * Facebook: facebook.com/khasarc
 * Twitter: twitter.com/arcthunder
 * Youtube: youtube.com/c/khasarc
 * 
 *  * Khas Scripts at RPG Maker Web forums (official support!)
 * forums.rpgmakerweb.com/index.php?/forum/132-khas-scripts
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Support my work
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * If you find my plugins useful and you would like to support my work, now
 * you can do it by becoming my patron! 
 * 
 * Please check my page at patreon.com/khas
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Terms of Use
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * If you want to use this plugin with a free RPG Maker game, you can do it for
 * free and there's no need to contact me. I only ask you to give credit to
 * "Khas" or "Khas Custom Scripts" somewhere in your game. You may include 
 * my blog url if you want.
 * 
 * This plugin is NOT FREE for COMMERCIAL use. If you want to use it on a
 * commercial title, please email me (see "Contact" on my blog). Alternatively, 
 * you may help me to achieve a Patreon goal to make all of them free for 
 * commercial use!
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Instructions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Just place this plugin before all the other Khas plugins. It requires no
 * configuration, as it only contains functionality required by other plugins.
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Log
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Version 2.0 (04.08.2017)
 * Plugin completely rewritten in sapphirescript
 * Added types for Khas Objects
 * Added include method to Array
 *
 *  * Version 1.2 (03.03.2017)
 * Added more REGEX expressions
 * Added more functionality to Game_Map
 * Added better Filter management
 * Added source code management
 * 
 *  * Version 1.1 (01.22.2017)
 * Fixed empty event/erase event bug.
 * 
 *  * Version 1.0 (01.20.2017)
 * First release!
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 */;


/// Khas regular expressions
Khas.REGEX_TAG = /\[([\w_\d]+)\]/;
Khas.REGEX_COMMAND = /\[([\w_\d]+)\s(-?[\w_\d]+)\]/;
Khas.REGEX_DOUBLE_COMMAND = /\[([\w_\d]+)\s(-?[\w_\d]+)\s(-?[\w_\d]+)\]/;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Array
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


  /// A method to remove values from an array
  Array.prototype.remove = function(value) {
    var index = this.indexOf(value);
    if (index != -1) {
      this.splice(index, 1);
    };
  };

  /// A method to check if values exist in an array
  Array.prototype.include = function(value) {
    return this.indexOf(value) > -1;
  };



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * String
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

/// Uses regular expressions to match strings for my commands

  String.prototype.khasTag = function() {
    return this.match(Khas.REGEX_TAG);
  };

  String.prototype.khasCommand = function() {
    return this.match(Khas.REGEX_COMMAND);
  };

  String.prototype.khasDoubleCommand = function() {
    return this.match(Khas.REGEX_DOUBLE_COMMAND);
  };



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Plugin Manager
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

/// This is basically copied from the PluginManager class, but allows to load code from other folders than 
/// js/plugins. Useful to load external libraries :D

  PluginManager.loadSource = function(name) {
    var url = "js/" + (name) + "";
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.async = false;
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
  };


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Scene Manager
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

/// Provides a method to initialize my plugins after everything is set up

  SceneManager.khas_core_initialize = SceneManager.initialize;

  SceneManager.initialize = function() {
    this.khas_core_initialize();
    this.loadKhasPlugins();
  };

  SceneManager.loadKhasPlugins = function() {
  };



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Map
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


  Game_Map.prototype.khas_core_setup = Game_Map.prototype.setup;
  Game_Map.prototype.khas_core_setupEvents = Game_Map.prototype.setupEvents;

  /// Implement functions to be called by my plugins. It makes things easier
  Game_Map.prototype.setup = function(mapId) {
    this.khas_core_setup(mapId);
    if ($dataMap) {
      this.khasExtendSetup();
      this.khasScanNote($dataMap.note.split('\n'));
      this.khasScanTilesetNote(this.tileset().note.split('\n'));
      this.khasPostScan();
    };
  };

  /// Run a function (khasSetupMap) before setting up the events!
  Game_Map.prototype.setupEvents = function() {
    this.khasSetupMap();
    this.khas_core_setupEvents();
  };

  /// Scan the current map's note
  Game_Map.prototype.khasScanNote = function(lines) {
    for (var i = 0; i < lines.length; i++) {
      var command = lines[i];
      /// Check if the line is a [tag]
      if (khasTag = command.khasTag()) {
        this.callKhasTag(khasTag[1]);

      /// Check if the line is a [command value]
      } else if (khasCommand = command.khasCommand()) {
        this.callKhasCommand(khasCommand[1], khasCommand[2], null);

      /// Check if the line is a [doublecommand value1 value2]
      } else if (khasCommand = command.khasDoubleCommand()) {
        this.callKhasCommand(khasCommand[1], khasCommand[2], khasCommand[3]);
      };
    };
  };

  /// Scan the current tileset's note, works the same as the map's note scan
  Game_Map.prototype.khasScanTilesetNote = function(lines) {
    for (var i = 0; i < lines.length; i++) {
      var command = lines[i];
      if (khasTag = command.khasTag()) {
        this.callKhasTag(khasTag[1]);
      } else if (khasCommand = command.khasCommand()) {
        this.callKhasTilesetCommand(khasCommand[1], khasCommand[2], null);
      } else if (khasCommand = command.khasDoubleCommand()) {
        this.callKhasTilesetCommand(khasCommand[1], khasCommand[2], khasCommand[3]);
      };
    };
  };

  /// To be extended by my plugins - makes my life easier!
  /// Please check my plugins to see them in action
  Game_Map.prototype.khasSetupMap = function() {
  };

  Game_Map.prototype.khasExtendSetup = function() {
  };

  Game_Map.prototype.khasPostScan = function() {
  };

  Game_Map.prototype.callKhasTag = function(tag) {
  };

  Game_Map.prototype.callKhasCommand = function(command, value1, value2) {
  };

  Game_Map.prototype.callKhasTilesetTag = function(tag) {
  };

  Game_Map.prototype.callKhasTilesetCommand = function(command, value1, value2) {
  };


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game CharacterBase
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


  Game_CharacterBase.prototype.khasType = function() {
    return "character";
  };


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Player
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


  Game_Player.prototype.khasType = function() {
    return "player";
  };


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Event
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


  Game_Event.prototype.kc_setupPage = Game_Event.prototype.setupPage;

  Game_Event.prototype.khasType = function() {
    return "event";
  };

  /// Basically this is a similar to what I did with the Game_Map class
  Game_Event.prototype.setupPage = function() {
    this.kc_setupPage();
    this.khasExtendSetup();
    this.khasScanComments();
  };

  /// Again, similar to Game_Map, but with some differences
  Game_Event.prototype.khasScanComments = function() {
    /// If the current page is not null (very important to check this!)
    if (this.page()) {
      var list = this.list(), khasTag, khasCommand;
      /// If there's a list of commands to process
      if (list) {
        for (var i = 0; i < list.length; i++) {
          /// If the command's code is 108 or 408 (the code for comments)
          if (list[i] && (list[i].code == 108 || list[i].code == 408)) {
            /// parameters[0] is the comment's content
            var command = list[i].parameters[0];
            /// Check for [tag], [command value] or [command value1 value2]
            if (khasTag = command.khasTag()) {
              this.callKhasTag(khasTag[1]);
            } else if (khasCommand = command.khasCommand()) {
              this.callKhasCommand(khasCommand[1], khasCommand[2], null);
            } else if (khasCommand = command.khasDoubleCommand()) {
              this.callKhasCommand(khasCommand[1], khasCommand[2], khasCommand[3]);
            };
          };
        };
      };
    };
  };

  /// Check my plugins to see their usage
  Game_Event.prototype.khasExtendSetup = function() {
  };

  Game_Event.prototype.callKhasTag = function(tag) {
  };

  Game_Event.prototype.callKhasCommand = function(command, value1, value2) {
  };



//=====================================================================================================================
// * End of Plugin
//=====================================================================================================================