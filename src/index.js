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
		} else {
			(time)?this.outT({ message:`error: time() hasn't being called for ${id}` }):this.out({ message:`error: time() hasn't being called for ${id}` });
		}
		delete this.time_table[id];
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
				this.config.console.log('console.out():var=',data);
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

	title({ title=this.throwIfMissing('title'), color, titleColor, config={} }={}) {
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