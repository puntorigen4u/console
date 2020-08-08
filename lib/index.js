(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.open_console = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
  * Open_console: A class to help display information in the console.
  * @name 	open_console
  * @module 	open_console
  **/
  class open_console {
    constructor() {
      var {
        silent = false,
        prefix = '',
        config = {}
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var def_config = {
        silent: silent,
        prefix: prefix,
        colors: true,
        console: {
          log: console.log,
          error: console.error,
          time: console.time,
          timeEnd: console.timeEnd,
          default: true
        }
      };
      this.config = _objectSpread2(_objectSpread2({}, def_config), config);
      this.time_table = {};

      if (this.config.prefix != '') {
        this.config.prefix = "[".concat(this.config.prefix, "] ");
      }
    }
    /**
    * Sets visibility output
    * @param 		{Boolean}	value 	- if true, hides all output
    */


    setSilent() {
      var {
        value = this.throwIfMissing('value')
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.config.silent = value;
    }
    /**
    * Calls timer start
    * @param 		{String}	id 	- key ID to measure
    */


    time() {
      var {
        id = this.throwIfMissing('id')
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      //let tmp = new Date().getTime() - this.x_flags.watchdog.start.getTime();
      this.time_table[id] = new Date();
    }
    /**
    * Calls timer end
    * @param 		{String}	id 			- key ID to measure and show timming for.
    * @param 		{Object}	[data]		- var dump to include in output
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    */


    timeEnd() {
      var {
        id = this.throwIfMissing('id'),
        color = 'white',
        data,
        prefix,
        time = false
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (id in this.time_table) {
        var ms = new Date().getTime() - this.time_table[id].getTime();
        var message = "time for '".concat(id, "': ").concat(ms, "ms"); // output

        if (this.config.colors && data && color) {
          time ? this.outT({
            message,
            data,
            color,
            prefix
          }) : this.out({
            message,
            data,
            color,
            prefix
          });
        } else if (data) {
          time ? this.outT({
            message,
            data,
            prefix
          }) : this.out({
            message,
            data,
            prefix
          });
        } else if (this.config.colors && color) {
          time ? this.outT({
            message,
            color,
            prefix
          }) : this.out({
            message,
            color,
            prefix
          });
        } else {
          time ? this.outT({
            message,
            prefix
          }) : this.out({
            message,
            prefix
          });
        }
      } else {
        time ? this.outT({
          message: "error: time() hasn't being called for ".concat(id)
        }) : this.out({
          message: "error: time() hasn't being called for ".concat(id)
        });
      }

      delete this.time_table[id];
    }
    /**
    * Sets output prefix
    * @param 		{String}	[prefix]	- prefix
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    */


    setPrefix() {
      var {
        prefix,
        color
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (prefix) this.config.prefix = prefix;

      if (color && this.config.prefix != '' && this.config.colors) {
        var txt = "[".concat(this.config.prefix, "] ");

        var colors = require('colors/safe');

        this.config.prefix = colors[color](txt);
      } else {
        this.config.prefix = "[".concat(this.config.prefix, "] ");
      }
    }
    /**
    * Clears the console screen
    */


    clear() {
      if (!this.config.silent && this.config.console.default) {
        var clearConsole = require('clear-any-console');

        clearConsole();
      }
    }
    /**
    * Output a message to the console screen, with an optional var with data
    * @param 		{String}	message		- message to output
    * @param 		{Object}	[data]		- var dump to include in output
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    */


    out() {
      var {
        message = this.throwIfMissing('message'),
        data,
        color = 'white',
        prefix = ''
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var msg = message,
          colors = require('colors/safe');

      var used_prefix = this.config.prefix;

      if (prefix != '') {
        // use temporal given prefix
        if (prefix.split(',').length > 1) {
          var pref = prefix.split(',');
          var txt = "[".concat(pref[0], "] ");

          var _colors = require('colors/safe');

          if (pref[1] in _colors) {
            used_prefix = _colors[pref[1]](txt);
          } else {
            used_prefix = txt;
          }
        } else {
          var _txt = "[".concat(prefix, "] ");

          used_prefix = _txt;
        }
      } //


      if (!this.config.silent) {
        if (this.config.colors && msg.indexOf('error:') != -1) {
          this.config.console.error(used_prefix + colors.red(msg));
        } else if (msg != '') {
          if (this.config.colors && color in colors) {
            this.config.console.log(used_prefix + colors[color](msg));
          } else {
            this.config.console.log(used_prefix + msg);
          }
        } // data output


        if (data) {
          this.config.console.log('console.out():var=', data);
        }
      }
    }
    /**
    * Output a message to the console screen with timestamp, and an optional var with data
    * @param 		{String}	message		- message to output
    * @param 		{Object}	[data]		- var dump to include in output
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    */


    outT() {
      var {
        message = this.throwIfMissing('message'),
        data,
        color = 'white',
        prefix = ''
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var msg = message,
          colors = require('colors/safe');

      if (!this.config.silent) {
        // timestamp prefix
        var d = new Date();
        var hr = d.getHours();

        if (hr < 10) {
          hr = "0" + hr;
        }

        var min = d.getMinutes();

        if (min < 10) {
          min = "0" + min;
        }

        var sec = d.getSeconds();

        if (sec < 10) {
          sec = "0" + sec;
        }

        var timeStamp = "[".concat(hr, ":").concat(min, ":").concat(sec, "]: ").concat(msg.trim()); // output

        if (this.config.colors && data && color) {
          this.out({
            message: timeStamp,
            data: data,
            color: color,
            prefix: prefix
          });
        } else if (data) {
          this.out({
            message: timeStamp,
            data: data,
            prefix: prefix
          });
        } else if (this.config.colors && color) {
          this.out({
            message: timeStamp,
            color: color,
            prefix: prefix
          });
        } else {
          this.out({
            message: timeStamp,
            prefix: prefix
          });
        }
      }
    }
    /**
    * Displays the given text as a title
    * @param 		{String}	title			- title to display
    * @param 		{String}	[color=white]	- color for box borders.
    * @param 		{String}	[titleColor]	- color for title. If undefined, uses the box color.
    * @param 		{Object}	[config]				- config overwrite params for boxen.
    * @param 		{String} 	[config.align=center]	- aligns the title by its value: left,center,right
    */


    title() {
      var {
        title = this.throwIfMissing('title'),
        color,
        titleColor,
        config = {}
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.config.silent) {
        var box = require('boxen'),
            colors = require('colors/safe');

        var textc = titleColor ? titleColor : color;
        var resp = box(colors[textc](title), _objectSpread2({
          borderColor: color,
          align: 'center',
          padding: {
            left: 2,
            right: 2
          },
          borderStyle: {
            topLeft: '*',
            topRight: '*',
            bottomLeft: '*',
            bottomRight: '*',
            horizontal: '*',
            vertical: '*'
          }
        }, config));

        if (!this.config.colors) {
          // remove colors from title if requested by config
          var stripAnsi = require('strip-ansi');

          resp = stripAnsi(resp);
        }

        this.config.console.log(resp);
      }
    }
    /**
    * Shows data array as table in the console
    * @param 		{String}	title			title for table
    * @param 		{Array}		data			array of objects for building the table.
    * @param 		{String}	[struct_sort]	sort data before displaying. Supports: field asc/desc.
    * @param 		{String}	[color]			color for table.
    */


    table() {
      var {
        title = this.throwIfMissing('title'),
        data = this.throwIfMissing('data'),
        struct_sort,
        color
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.config.silent) {
        var info = data,
            colors = require('colors/safe');

        if (struct_sort) {
          var sortObjectsArray = require('sort-objects-array');

          if (struct_sort.split(' ').length > 1) {
            // field desc, field asc
            info = sortObjectsArray(data, struct_sort.split(' ')[0], struct_sort.split(' ')[1]);
          } else {
            info = sortObjectsArray(data, struct_sort);
          }
        }

        var asciiTable = require('ascii-table');

        var table = new asciiTable(title); // heading

        var cols = Object.keys(info[0]);
        table.setHeading(cols); // data

        for (var row in info) {
          var jdata = [];

          for (var col in cols) {
            jdata.push(info[row][cols[col]]);
          }

          table.addRow(jdata).setJustify(true);
        } //


        if (this.config.colors && color) {
          this.config.console.log(colors[color](table.render()));
        } else {
          this.config.console.log(table.toString());
        }
      }
    } // ********************
    // private methods
    // ********************


    throwIfMissing(name) {
      throw new Error('Missing ' + name + ' parameter!');
    }

  }

  return open_console;

})));
