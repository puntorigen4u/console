(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.open_console = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var open_console = /** @class */ (function () {
        function open_console(arg) {
            if (arg === void 0) { arg = { prefix: '', config: {} }; }
            var def_config = {
                silent: arg.silent,
                prefix: arg.prefix,
                colors: true,
                console: {
                    log: console.log,
                    error: console.error,
                    time: console.time,
                    timeEnd: console.timeEnd,
                    "default": true
                }
            };
            this.config = __assign(__assign({}, def_config), arg.config);
            this.time_table = {};
            if (this.config.prefix != '') {
                this.config.prefix = "[".concat(this.config.prefix, "] ");
            }
        }
        /**
        * Sets visibility output
        * @param 		{Boolean}	value 	- if true, hides all output
        */
        open_console.prototype.setSilent = function (arg) {
            this.config.silent = arg.value;
        };
        /**
        * Calls timer start
        * @param 		{String}	id 	- key ID to measure
        */
        open_console.prototype.time = function (arg) {
            //let tmp = new Date().getTime() - this.x_flags.watchdog.start.getTime();
            this.time_table[arg.id] = new Date();
        };
        /**
        * Calls timer end
        * @param 		{String}	id 			- key ID to measure and show timming for.
        * @param 		{Object}	[data]		- var dump to include in output
        * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
        * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
        */
        open_console.prototype.timeEnd = function (arg) {
            if (arg === void 0) { arg = { id: '', color: 'white', time: false }; }
            if (arg.id in this.time_table) {
                var ms = new Date().getTime() - this.time_table[arg.id].getTime();
                var message = "time for '".concat(arg.id, "': ").concat(ms, "ms");
                // output
                if (this.config.colors && arg.data && arg.color) {
                    (arg.time) ? this.outT({ message: message, data: arg.data, color: arg.color, prefix: arg.prefix }) : this.out({ message: message, data: arg.data, color: arg.color, prefix: arg.prefix });
                }
                else if (arg.data) {
                    (arg.time) ? this.outT({ message: message, prefix: arg.prefix, color: null, data: arg.data }) : this.out({ message: message, data: arg.data, prefix: arg.prefix });
                }
                else if (this.config.colors && arg.color) {
                    (arg.time) ? this.outT({ message: message, color: arg.color, prefix: arg.prefix }) : this.out({ message: message, color: arg.color, prefix: arg.prefix });
                }
                else {
                    (arg.time) ? this.outT({ message: message, prefix: arg.prefix }) : this.out({ message: message, prefix: arg.prefix });
                }
                delete this.time_table[arg.id];
            }
            else {
                (arg.time) ? this.outT({ message: "error: time() hasn't being called for ".concat(arg.id) }) : this.out({ message: "error: time() hasn't being called for ".concat(arg.id) });
            }
        };
        /**
        * Sets output prefix
        * @param 		{String}	[prefix]	- prefix
        * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
        */
        open_console.prototype.setPrefix = function (arg) {
            if (arg.prefix)
                this.config.prefix = arg.prefix;
            if (arg.color && this.config.prefix != '' && this.config.colors) {
                var txt = "[".concat(this.config.prefix, "] ");
                var colors = require('colors/safe');
                this.config.prefix = colors[arg.color](txt);
            }
            else {
                this.config.prefix = "[".concat(this.config.prefix, "] ");
            }
        };
        /**
        * Clears the console screen
        */
        open_console.prototype.clear = function () {
            if (!this.config.silent && this.config.console["default"]) {
                var clearConsole = require('clear-any-console');
                clearConsole();
            }
        };
        /**
        * Outputs an ora spinner with the given message, used prefix and color.
        * @param 		{String}	message		- message to output
        * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
        * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
        * @return 		{Object}				- Object similar to ora object with an additional text(x) method
        */
        open_console.prototype.spinner = function (arg) {
            if (arg === void 0) { arg = { message: '', color: 'white', prefix: '' }; }
            var ora = require('ora');
            arg.message;
            var used_prefix = this.config.prefix;
            if (arg.prefix && arg.prefix != '') {
                // use temporal given prefix
                if (arg.prefix.split(',').length > 1) {
                    var pref = arg.prefix.split(',');
                    var txt = "[".concat(pref[0], "] ");
                    used_prefix = txt;
                }
                else {
                    var txt = "[".concat(arg.prefix, "] ");
                    used_prefix = txt;
                }
            }
            var resp = ora({ text: arg.message, color: arg.color, prefixText: used_prefix }).start();
            return {
                start: function (x) { resp.start(x); },
                text: function (x) { resp.text = x; },
                succeed: function (x) { resp.succeed(x); },
                fail: function (x) { resp.fail(x); },
                warn: function (x) { resp.warn(x); },
                info: function (x) { resp.info(x); },
                stop: function () { resp.stop(); }
            };
        };
        /**
        * Returns an instance of cli-progress with the given total amount, format, and color.
        * @param 		{String}	format			- format of progress message. Example: 'Progress {bar} - {percentage} %'
        * @param 		{Object}	[config]		- options overwrite for cli-progress multibar config
        * @param 		{String}	[prefix]		- use this prefix instead of the configured one. To use color, use format 'prefix,color'
        * @param 		{Function}	[formatData]	- function(data) expects a return of a modified data instance. Inside you can control the format presentation and vars used inside the format argument. You also have access to special keys (progress,value,total,bar,eta,percentage,...all your data keys) and helper functions (data.funcs.colors and data.funcs.symbols).
        * @return 		{Object}					- Object similar to cli-progress object with methods to create,update,remove progress bars
        */
        open_console.prototype.progress = function (arg) {
            if (arg === void 0) { arg = { format: null, formatData: null, prefix: '', config: {} }; }
            var progress = require('cli-progress');
            var extract = require('extractjs')();
            var parent = this;
            // usage 
            /*
            let progresos = x_console.progress(format=`{bar} {pantalla}`, formatData=function(data){
                //inherited fields: bar,percentage,eta,value,funcs (colors(func),symbols)
                if (data.percentage<30) {
                    data.bar = data.funcs.colors.magenta(data.bar);
                } else if (data.percentage<60) {
                    data.bar = data.funcs.colors.yellow(data.bar);
                } else {
                    data.bar = data.funcs.colors.green(data.bar);
                }
                //sub test, changes the format of the progress dynamically
                if (data.sub) {
                    data._format = `{bar} {pantalla} -> {sub}`;
                }
                return data;
            });
            // let uno = progresos.create(100,{ pantalla:'uno' })
            // uno.update(3);
            */
            var multibar = new progress.MultiBar(__assign({
                clearOnComplete: false,
                hideCursor: false,
                barCompleteChar: '\u2588',
                barIncompleteChar: '\u2591',
                barsize: 20,
                format: function (options, params, payload) {
                    //const bar = options.barCompleteString.substr(0, Math.round(params.progress*options.barsize));
                    var ndata = { funcs: { colors: require('colors/safe'),
                            symbols: require('log-symbols')
                        }
                    };
                    var _a = require('cli-progress').Format, BarFormat = _a.BarFormat, TimeFormat = _a.TimeFormat;
                    var stopTime = params.stopTime || Date.now();
                    var elapsedTime = Math.round((stopTime - params.startTime) / 1000);
                    ndata.percentage = Math.floor(params.progress * 100) + '';
                    ndata.bar = BarFormat(params.progress, options);
                    ndata.eta = TimeFormat(params.eta, options, 1);
                    ndata.value = params.value;
                    ndata.total = params.total;
                    ndata.progress = params.progress;
                    ndata.duration = TimeFormat(elapsedTime, options, 1);
                    ndata._format = arg.format;
                    ndata = __assign(__assign({}, payload), ndata);
                    ndata = arg.formatData(ndata);
                    delete ndata.funcs;
                    // test changes
                    if (ndata._format != arg.format) ;
                    //prefix
                    var used_prefix = parent.config.prefix;
                    if (arg.prefix && arg.prefix != '') {
                        // use temporal given prefix
                        if (arg.prefix.split(',').length > 1) {
                            var pref = arg.prefix.split(',');
                            var txt = "[".concat(pref[0], "] ");
                            used_prefix = txt;
                        }
                        else {
                            var txt = "[".concat(arg.prefix, "] ");
                            used_prefix = txt;
                        }
                    }
                    var resp = '';
                    if (used_prefix != '')
                        resp += used_prefix;
                    //create resp from defined format
                    var pattern = extract(ndata._format);
                    resp += pattern.interpolate(ndata);
                    return resp;
                }
            }, arg.config), progress.Presets.rect);
            return {
                create: function (total, data) {
                    var x = multibar.create(total, 0, data);
                    return {
                        update: function (value, data) {
                            return x.update(value, data);
                        },
                        total: function (total) {
                            x.setTotal(total);
                        },
                        remove: function () { multibar.remove(x); },
                        raw: function () { return x; }
                    };
                },
                raw: function () { return multibar; },
                stop: function () { multibar.stop(); }
            };
        };
        /**
        * Output a message to the console screen, with an optional var with data
        * @param 		{String}	message		- message to output
        * @param 		{Object}	[data]		- var dump to include in output
        * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
        * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
        */
        open_console.prototype.out = function (arg) {
            if (arg === void 0) { arg = { message: null, color: 'white', prefix: '', data: null }; }
            var msg = arg.message, colors = require('colors/safe');
            var used_prefix = this.config.prefix;
            if (arg.prefix && arg.prefix != '') {
                // use temporal given prefix
                if (arg.prefix.split(',').length > 1) {
                    var pref = arg.prefix.split(',');
                    var txt = "[".concat(pref[0], "] ");
                    var colors_1 = require('colors/safe');
                    if (pref[1] in colors_1) {
                        used_prefix = colors_1[pref[1]](txt);
                    }
                    else {
                        used_prefix = txt;
                    }
                }
                else {
                    var txt = "[".concat(arg.prefix, "] ");
                    used_prefix = txt;
                }
            }
            //
            if (!this.config.silent) {
                if (this.config.colors && msg.indexOf('error:') != -1) {
                    this.config.console.error(used_prefix + colors.red(msg));
                }
                else if (msg != '') {
                    if (this.config.colors && arg.color in colors) {
                        this.config.console.log(used_prefix + colors[arg.color](msg));
                    }
                    else {
                        this.config.console.log(used_prefix + msg);
                    }
                }
                // data output
                if (arg.data) {
                    var util = require('util');
                    var edata = util.inspect(arg.data, false, null, true);
                    this.config.console.log('console.out():var=', edata);
                }
            }
        };
        /**
        * Output a message to the console screen with timestamp, and an optional var with data
        * @param 		{String}	message		- message to output
        * @param 		{Object}	[data]		- var dump to include in output
        * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
        * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
        */
        open_console.prototype.outT = function (arg) {
            if (arg === void 0) { arg = { message: null, prefix: '' }; }
            var msg = arg.message; require('colors/safe');
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
                var timeStamp = "[".concat(hr, ":").concat(min, ":").concat(sec, "]: ").concat(msg.trim());
                // output
                if (this.config.colors && arg.data && arg.color) {
                    this.out({ message: timeStamp, data: arg.data, color: arg.color, prefix: arg.prefix });
                }
                else if (arg.data) {
                    this.out({ message: timeStamp, data: arg.data, color: null, prefix: arg.prefix });
                }
                else if (this.config.colors && arg.color) {
                    this.out({ message: timeStamp, data: null, color: arg.color, prefix: arg.prefix });
                }
                else {
                    this.out({ message: timeStamp, data: null, color: null, prefix: arg.prefix });
                }
            }
        };
        /**
        * Displays the given text as a title
        * @param 		{String}	title			- title to display
        * @param 		{String}	[color=white]	- color for box borders.
        * @param 		{String}	[titleColor]	- color for title. If undefined, uses the box color.
        * @param 		{Object}	[config]				- config overwrite params for boxen.
        * @param 		{String} 	[config.align=center]	- aligns the title by its value: left,center,right
        */
        open_console.prototype.title = function (arg) {
            if (arg === void 0) { arg = { title: null, color: 'white', config: {} }; }
            if (!this.config.silent) {
                var box = require('boxen'), colors = require('colors/safe');
                var textc = (arg.titleColor) ? arg.titleColor : arg.color;
                var resp = box(colors[textc](arg.title), __assign({ borderColor: arg.color, align: 'center', padding: {
                        left: 2,
                        right: 2
                    }, borderStyle: {
                        topLeft: '*',
                        topRight: '*',
                        bottomLeft: '*',
                        bottomRight: '*',
                        horizontal: '*',
                        vertical: '*'
                    } }, arg.config));
                if (!this.config.colors) {
                    // remove colors from title if requested by config
                    var stripAnsi = require('strip-ansi');
                    resp = stripAnsi(resp);
                }
                this.config.console.log(resp);
            }
        };
        /**
        * Shows data array as table in the console
        * @param 		{String}	title			title for table
        * @param 		{Array}		data			array of objects for building the table.
        * @param 		{String}	[struct_sort]	sort data before displaying. Supports: field asc/desc.
        * @param 		{String}	[color]			color for table.
        */
        open_console.prototype.table = function (arg) {
            if (arg === void 0) { arg = { title: null, data: null }; }
            if (!this.config.silent) {
                var info = arg.data, colors = require('colors/safe');
                if (arg.struct_sort) {
                    var sortObjectsArray = require('sort-objects-array');
                    if (arg.struct_sort.split(' ').length > 1) {
                        // field desc, field asc
                        info = sortObjectsArray(arg.data, arg.struct_sort.split(' ')[0], arg.struct_sort.split(' ')[1]);
                    }
                    else {
                        info = sortObjectsArray(arg.data, arg.struct_sort);
                    }
                }
                var asciiTable = require('ascii-table');
                var table = new asciiTable(arg.title);
                // heading
                var cols = Object.keys(info[0]);
                table.setHeading(cols);
                // data
                for (var row in info) {
                    var jdata = [];
                    for (var col in cols) {
                        jdata.push(info[row][cols[col]]);
                    }
                    table.addRow(jdata).setJustify(true);
                }
                //
                if (this.config.colors && arg.color) {
                    this.config.console.log(colors[arg.color](table.render()));
                }
                else {
                    this.config.console.log(table.toString());
                }
            }
        };
        // ********************
        // private methods
        // ********************
        open_console.prototype.throwIfMissing = function (name) {
            throw new Error('Missing ' + name + ' parameter!');
        };
        return open_console;
    }());

    return open_console;

})));
