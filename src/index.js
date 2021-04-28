/**
* Open_console: A class to help display information in the console.
* @name 	open_console
* @module 	open_console
**/
export default class open_console {

	constructor({ silent=false, prefix='', config={} }={}) {
		let def_config = {
			silent:silent,
			prefix:prefix,
			colors:true,
			console: {
				log:console.log,
				error:console.error,
				time:console.time,
				timeEnd:console.timeEnd,
				default:true
			}
		};
		this.config = {...def_config,...config};
		this.time_table = {};
		if (this.config.prefix!='') {
			this.config.prefix = `[${this.config.prefix}] `;
		}
	}

	/**
	* Sets visibility output
	* @param 		{Boolean}	value 	- if true, hides all output
	*/
	setSilent({ value=this.throwIfMissing('value') }={}) {
		this.config.silent = value;
	}

	/**
	* Calls timer start
	* @param 		{String}	id 	- key ID to measure
	*/
	time({ id=this.throwIfMissing('id') }={}) {
		//let tmp = new Date().getTime() - this.x_flags.watchdog.start.getTime();
		this.time_table[id]=new Date();
	}

	/**
	* Calls timer end
	* @param 		{String}	id 			- key ID to measure and show timming for.
	* @param 		{Object}	[data]		- var dump to include in output
	* @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
	* @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
	*/
	timeEnd({ id=this.throwIfMissing('id'), color='white', data, prefix, time=false }={}) {
		if (id in this.time_table) {
			let ms = new Date().getTime() - this.time_table[id].getTime();
			let message = `time for '${id}': ${ms}ms`;
			// output
			if (this.config.colors && data && color) {
				(time)?this.outT({ message, data, color, prefix }):this.out({ message, data, color, prefix });
			} else if (data) {
				(time)?this.outT({ message, data, prefix }):this.out({ message, data, prefix });
			} else if (this.config.colors && color) {
				(time)?this.outT({ message, color, prefix }):this.out({ message, color, prefix });
			} else {
				(time)?this.outT({ message, prefix }):this.out({ message, prefix });
			}
			delete this.time_table[id];
		} else {
			(time)?this.outT({ message:`error: time() hasn't being called for ${id}` }):this.out({ message:`error: time() hasn't being called for ${id}` });
		}
		
	}

	/**
	* Sets output prefix
	* @param 		{String}	[prefix]	- prefix
	* @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
	*/
	setPrefix({ prefix,color }={}) {
		if (prefix) this.config.prefix=prefix;
		if (color && this.config.prefix!='' && this.config.colors) {
			let txt = `[${this.config.prefix}] `;
			let colors = require('colors/safe');
			this.config.prefix = colors[color](txt);
		} else {
			this.config.prefix = `[${this.config.prefix}] `;
		}
	}

	/**
	* Clears the console screen
	*/
	clear() {
		if (!this.config.silent && this.config.console.default) {
			let clearConsole = require('clear-any-console');
			clearConsole();
		}
	}

	/**
	* Outputs an ora spinner with the given message, used prefix and color.
	* @param 		{String}	message		- message to output
	* @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
	* @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
	* @return 		{Object}				- Object similar to ora object with an additional text(x) method
	*/
	spinner({ message=this.throwIfMissing('message'),color='white', prefix='' }={}) {
		let ora = require('ora');
		let msg = message;
		let used_prefix = this.config.prefix;
		if (prefix!='') {
			// use temporal given prefix
			if (prefix.split(',').length>1) {
				let pref = prefix.split(',');
				let txt = `[${pref[0]}] `;
				used_prefix = txt;
			} else {
				let txt = `[${prefix}] `;
				used_prefix = txt;
			}
		}
		let resp = ora({text:message, color, prefixText:used_prefix}).start();
		return {
			start: (x)=>{ resp.start(x); },
			text: (x)=>{ resp.text = x; },
			succeed: (x)=>{ resp.succeed(x); },
			fail: (x)=>{ resp.fail(x); },
			warn: (x)=>{ resp.warn(x); },
			info: (x)=>{ resp.info(x); },
			stop: ()=>{ resp.stop(); }
		};
	}

	/**
	* Returns an instance of cli-progress with the given total amount, format, and color.
	* @param 		{String}	format			- format of progress message. Example: 'Progress {bar} - {percentage} %'
	* @param 		{Object}	[config]		- options overwrite for cli-progress multibar config
	* @param 		{String}	[prefix]		- use this prefix instead of the configured one. To use color, use format 'prefix,color'
	* @param 		{Function}	[formatData]	- function(data) expects a return of a modified data instance. Inside you can control the format presentation and vars used inside the format argument. You also have access to special keys (progress,value,total,bar,eta,percentage,...all your data keys) and helper functions (data.funcs.colors and data.funcs.symbols).
	* @return 		{Object}					- Object similar to cli-progress object with methods to create,update,remove progress bars
	*/
	progress({ format=this.throwIfMissing('format'), formatData, prefix='', config={} }={}) {
		let progress = require('cli-progress');
		let extract = require('extractjs')();
		let parent = this;
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
		let multibar = new progress.MultiBar({...{ 
			clearOnComplete:false, 
			hideCursor:false,
			barCompleteChar: '\u2588',
			barIncompleteChar: '\u2591',
			barsize: 20,
			format: function(options, params, payload) {
				//const bar = options.barCompleteString.substr(0, Math.round(params.progress*options.barsize));
				let ndata = { funcs:{ colors:require('colors/safe'),
									  symbols:require('log-symbols') 
									} 
							};
				let { BarFormat,TimeFormat } = require('cli-progress').Format;
				ndata.percentage =  Math.floor(params.progress*100) + '';
				ndata.bar = BarFormat(params.progress, options);
				ndata.eta = TimeFormat(params.eta,options,1);
				ndata.value = params.value;
				ndata.total = params.total;
				ndata.progress = params.progress;
				ndata._format = format;
				ndata = formatData(ndata);
				// test changes
				if (ndata._format!=format) {
					// format changed!
				}
				//prefix
				let used_prefix = parent.config.prefix;
				if (prefix!='') {
					// use temporal given prefix
					if (prefix.split(',').length>1) {
						let pref = prefix.split(',');
						let txt = `[${pref[0]}] `;
						used_prefix = txt;
					} else {
						let txt = `[${prefix}] `;
						used_prefix = txt;
					}
				}
				let resp = '';
				if (used_prefix!='') resp += used_prefix;
				//create resp from defined format
				delete ndata.funcs;
				let pattern = extract(ndata._format);
				ndata = {...ndata,...payload};
				resp += pattern.interpolate(ndata);
				return resp;
			}
		},...config}, progress.Presets.rect);
		return {
			create: ({total,data={}}={})=>{ 
				let x = multibar.create(total,0,data);
				return {
					update:({value,data}={})=>{
						return x.update(value,data);
					},
					total:({total}={})=>{
						x.setTotal(total);
					},
					remove:()=>{ multibar.remove(x); },
					raw:()=>x
				}
			},
			raw: ()=>multibar,
			stop: ()=>{ multibar.stop(); }
		};
	}

	/**
	* Output a message to the console screen, with an optional var with data
	* @param 		{String}	message		- message to output
	* @param 		{Object}	[data]		- var dump to include in output
	* @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
	* @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
	*/
	out({ message=this.throwIfMissing('message'),data,color='white', prefix='' }={}) {
		let msg = message, colors = require('colors/safe');
		let used_prefix = this.config.prefix;
		if (prefix!='') {
			// use temporal given prefix
			if (prefix.split(',').length>1) {
				let pref = prefix.split(',');
				let txt = `[${pref[0]}] `;
				let colors = require('colors/safe');
				if (pref[1] in colors) {
					used_prefix = colors[pref[1]](txt);
				} else {
					used_prefix = txt;
				}
			} else {
				let txt = `[${prefix}] `;
				used_prefix = txt;
			}
		}
		//
		if (!this.config.silent) {
			if (this.config.colors && msg.indexOf('error:')!=-1) {
				this.config.console.error(used_prefix + colors.red(msg));
			} else if (msg!='') {
				if (this.config.colors && color in colors) {
					this.config.console.log(used_prefix + colors[color](msg));
				} else {
					this.config.console.log(used_prefix + msg);
				}
			}
			// data output
			if (data) {
				let util = require('util');
				let edata = util.inspect(data, false,null,true);
				this.config.console.log('console.out():var=',edata);
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
	outT({ message=this.throwIfMissing('message'),data,color='white', prefix='' }={}) {
		let msg = message, colors = require('colors/safe');
		if (!this.config.silent) {
			// timestamp prefix
			let d = new Date();
			let hr = d.getHours();
			if (hr < 10) {
			    hr = "0" + hr;
			}
			let min = d.getMinutes();
			if (min < 10) {
			    min = "0" + min;
			}
			let sec = d.getSeconds();
			if (sec < 10) {
			    sec = "0" + sec;
			}
			let timeStamp = `[${hr}:${min}:${sec}]: ${msg.trim()}`;
			// output
			if (this.config.colors && data && color) {
				this.out({ message:timeStamp, data:data, color:color, prefix:prefix });
			} else if (data) {
				this.out({ message:timeStamp, data:data, prefix:prefix });
			} else if (this.config.colors && color) {
				this.out({ message:timeStamp, color:color, prefix:prefix });
			} else {
				this.out({ message:timeStamp, prefix:prefix });
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

	title({ title=this.throwIfMissing('title'), color='white', titleColor, config={} }={}) {
		if (!this.config.silent) {
			const box = require('boxen'), colors = require('colors/safe');
			let textc = (titleColor)?titleColor:color;
			let resp = box(colors[textc](title),{
				borderColor:color,
				align:'center',
				padding: {
		    		left:2,
		    		right:2
		    	},
		    	borderStyle: {
		    		topLeft: '*',
		    		topRight: '*',
		    		bottomLeft: '*',
		    		bottomRight: '*',
		    		horizontal: '*',
		    		vertical: '*'
		    	}
			,...config});
			if (!this.config.colors) {
				// remove colors from title if requested by config
				let stripAnsi = require('strip-ansi');
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
	table({ title=this.throwIfMissing('title'),data=this.throwIfMissing('data'),struct_sort,color }={}) {
		if (!this.config.silent) {
			let info = data, colors = require('colors/safe');
			if (struct_sort) {
				let sortObjectsArray = require('sort-objects-array');
				if (struct_sort.split(' ').length>1) {
					// field desc, field asc
					info = sortObjectsArray(data, struct_sort.split(' ')[0], struct_sort.split(' ')[1]);
				} else {
					info = sortObjectsArray(data, struct_sort);
				}
			}
			let asciiTable = require('ascii-table');
			let table = new asciiTable(title);
			// heading
			let cols = Object.keys(info[0]);
			table.setHeading(cols);
			// data
			for (let row in info) {
				let jdata = [];
				for (let col in cols) {
					jdata.push(info[row][cols[col]]);
				}
				table.addRow(jdata).setJustify(true);
	 		}
			//
			if (this.config.colors && color) {
				this.config.console.log(colors[color](table.render()));
			} else {
				this.config.console.log(table.toString());
			}
		}
	}

	// ********************
	// private methods
	// ********************

	throwIfMissing(name) {
        throw new Error('Missing '+name+' parameter!');
    }

}