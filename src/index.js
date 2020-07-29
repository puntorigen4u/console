// Commonly used console helper methods.
export default class Console {

	constructor({ config }={}) {
		let def_config = {
			silent:false,
			prefix:''
		};
		this.config = {...config, ...def_config};
	}

	/**
	* setSilent 	sets visibility output
	* @param 		{Boolean}	value	(required) If true, hides all output
	*/
	setSilent({ value=this.throwIfMissing('value') }={}) {
		this.config.silent = value;
	}

	/**
	* setPrefix 	sets output prefix
	* @param 		{Boolean}	prefix	optional prefix
	* @param 		{String}	color	optional: black,red,green,yellow,blue,purple,cyan,white
	*/
	setPrefix({ prefix,color }={}) {
		if (prefix) this.config.prefix=prefix;
		if (color) {
			let txt = `[${this.config.prefix}] `;
			let colors = require('colors/safe');
			this.config.prefix = colors[color](txt);
		} else {
			this.config.prefix = `[${this.config.prefix}] `;
		}
	}

	clear() {
		let clearConsole = require('clear-any-console');
		clearConsole();
	}

	out({ message=this.throwIfMissing('message'),data,color }={}) {
		let msg = message, colors = require('colors/safe');
		if (!this.config.silent) {
			if (color && msg!='') {
				if (color in colors) {
					console.log(this.config.prefix + colors[color](msg));
				} else {
					console.log(this.config.prefix + msg);
				}
			} else if (msg.indexOf('error:')!=-1) {
				console.error(this.config.prefix + colors.red(msg));
			}
			// data output
			if (data) {
				console.log('console.out():var=',data);
			}
		}
	}

	outT({ message=this.throwIfMissing('message'),data,color }={}) {
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
			if (data && color) {
				this.out({ message:timeStamp, data:data, color:color });
			} else if (data) {
				this.out({ message:timeStamp, data:data });
			} else if (color) {
				this.out({ message:timeStamp, color:color });
			} else {
				this.out({ message:timeStamp });
			}
		}
	}

	/**
	* table 		shows data array as table in the console
	* @param 		{String}	title			title for table
	* @param 		{Array}		data			array of objects for building the table.
	* @param 		{String}	struct_sort		(optional) sort data before displaying. Supports: field asc/desc.
	* @param 		{String}	color			(optional) color for table.
	*/
	table({ title=this.throwIfMissing('title'),data=this.throwIfMissing('data'),struct_sort,color }={}) {
		let info = data, colors = require('colors/safe');;
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
		if (color) {
			console.log(colors[color](table.render()));
		} else {
			console.log(table.toString());
		}
	}

	// ********************
	// private methods
	// ********************

	throwIfMissing(name) {
        throw new Error('Missing '+name+' parameter!');
    }

}