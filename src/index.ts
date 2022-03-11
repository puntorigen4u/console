/**
* x_console: A class to help display or interact with information in the console.
* @name 	x_console
* @module 	x_console
**/
export interface Config {
    silent:boolean|void,
    prefix:string,
    colors:boolean,
    console:{
        log:any,
        error:any,
        time:any,
        timeEnd:any,
        default:boolean
    }
}
export type Colors = 'black'|'red'|'green'|'yellow'|'blue'|'purple'|'cyan'|'white';

export interface colorTokens {
    '*'?:Colors,
    '|'?:Colors,
    '@'?:Colors,
    '#'?:Colors,
    '$'?:Colors,
    '='?:Colors,
    '!'?:Colors
}

export default class open_console {
    config:Config;
    time_table:any;
	colorTokens_:colorTokens={};

	constructor(arg:{silent?:boolean, prefix:string, config:object}={prefix:'',config:{}}) {

		let def_config:Config = {
			silent:arg.silent,
			prefix:arg.prefix,
			colors:true,
			console: {
				log:console.log,
				error:console.error,
				time:console.time,
				timeEnd:console.timeEnd,
				default:true
			}
		};
		this.config = {...def_config,...arg.config};
		this.time_table = {};
		if (this.config.prefix!='') {
			this.config.prefix = `[${this.config.prefix}] `;
		}
	}

	/**
	* Sets visibility output
	* @param 		{Boolean}	value 	- if true, hides all output
	*/
	setSilent(arg:{value:boolean}) {
		this.config.silent = arg.value;
	}

	/**
	* Calls timer start
	* @param 		{String}	id 	- key ID to measure
	*/
	time(arg:{id:string}) {
		//let tmp = new Date().getTime() - this.x_flags.watchdog.start.getTime();
		this.time_table[arg.id]=new Date();
	}

	/**
	* Calls timer end
	* @param 		{String}	id 			- key ID to measure and show timming for.
	* @param 		{Object}	[data]		- var dump to include in output
	* @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
	* @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
	*/
    

	timeEnd(arg:{id:string, color:Colors, data?:any, prefix?:string, time?:boolean}={id:'',color:'white',time:false }) {
		if (arg.id in this.time_table) {
			let ms = new Date().getTime() - this.time_table[arg.id].getTime();
			let message = `time for '${arg.id}': ${ms}ms`;
			// output
			if (this.config.colors && arg.data && arg.color) {
				(arg.time)?this.outT({message, data:arg.data, color:arg.color, prefix:arg.prefix}):this.out({message, data:arg.data, color:arg.color, prefix:arg.prefix});
			} else if (arg.data) {
				(arg.time)?this.outT({message, prefix:arg.prefix, color:null, data:arg.data}):this.out({message, data:arg.data, prefix:arg.prefix});
			} else if (this.config.colors && arg.color) {
				(arg.time)?this.outT({message, color:arg.color, prefix:arg.prefix}):this.out({message, color:arg.color, prefix:arg.prefix});
			} else {
				(arg.time)?this.outT({message, prefix:arg.prefix}):this.out({message, prefix:arg.prefix});
			}
			delete this.time_table[arg.id];
		} else {
			(arg.time)?this.outT({message:`error: time() hasn't being called for ${arg.id}`}):this.out({message:`error: time() hasn't being called for ${arg.id}`});
		}
		
	}

	/**
	* Sets output prefix
	* @param 		{String}	[prefix]	- prefix
	* @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
	*/
	setPrefix(arg:{ prefix?:string, color?:Colors }) {
		if (arg.prefix) this.config.prefix=arg.prefix;
		if (arg.color && this.config.prefix!='' && this.config.colors) {
			let txt = `[${this.config.prefix}] `;
			let colors = require('colors/safe');
			this.config.prefix = colors[arg.color](txt);
		} else {
			this.config.prefix = this.colorize(`[${this.config.prefix}] `);
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
	spinner(arg:{message:string,color?:Colors, prefix?:string}={message:'',color:'white',prefix:''}) {
		let ora = require('ora');
		let msg = arg.message;
		let used_prefix = this.config.prefix;
		if (arg.prefix && arg.prefix!='') {
			// use temporal given prefix
			if (arg.prefix.split(',').length>1) {
				let pref = arg.prefix.split(',');
				let txt = `[${pref[0]}] `;
				used_prefix = txt;
			} else {
				let txt = `[${arg.prefix}] `;
				used_prefix = txt;
			}
		}
		let resp = ora({text:arg.message, color:arg.color, prefixText:used_prefix}).start();
		return {
			start: (x)=>{ resp.start(this.colorize(x)); },
			text: (x)=>{ resp.text = this.colorize(x); },
			succeed: (x)=>{ resp.succeed(this.colorize(x)); },
			fail: (x)=>{ resp.fail(this.colorize(x)); },
			warn: (x)=>{ resp.warn(this.colorize(x)); },
			info: (x)=>{ resp.info(this.colorize(x)); },
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
	progress(arg:{format:string, formatData:any, prefix?:string, config?:Object}={ format:null, formatData:null, prefix:'',config:{}}) {
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
				let ndata:any = { funcs:{ colors:require('colors/safe'),
									  symbols:require('log-symbols') 
									} 
							};
				let { BarFormat,TimeFormat } = require('cli-progress').Format;
				const stopTime = params.stopTime || Date.now();
    			const elapsedTime = Math.round((stopTime - params.startTime)/1000);
				ndata.percentage =  Math.floor(params.progress*100) + '';
				ndata.bar = BarFormat(params.progress, options);
				ndata.eta = TimeFormat(params.eta,options,1);
				ndata.value = params.value;
				ndata.total = params.total;
				ndata.progress = params.progress;
				ndata.duration = TimeFormat(elapsedTime,options,1);
				ndata._format = arg.format;
				ndata = {...payload,...ndata};
				ndata = arg.formatData(ndata);
				delete ndata.funcs;
				// test changes
				if (ndata._format!=arg.format) {
					// format changed!
				}
				//prefix
				let used_prefix = parent.config.prefix;
				if (arg.prefix && arg.prefix!='') {
					// use temporal given prefix
					if (arg.prefix.split(',').length>1) {
						let pref = arg.prefix.split(',');
						let txt = `[${pref[0]}] `;
						used_prefix = txt;
					} else {
						let txt = `[${arg.prefix}] `;
						used_prefix = txt;
					}
				}
				let resp = '';
				if (used_prefix!='') resp += used_prefix;
				//create resp from defined format
				
				let pattern = extract(ndata._format);
				resp += pattern.interpolate(ndata);
				return resp;
			}
		},...arg.config}, progress.Presets.rect);
		return {
			create: (total,data)=>{ 
				let x = multibar.create(total,0,data);
				return {
					update:(value,data)=>{
						return x.update(value,data);
					},
					total:(total)=>{
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
	out(arg:{message:string,color?:Colors, prefix?:string, data?:any}={ message:null,color:'white',prefix:'',data:null}) {
		let msg = arg.message, colors = require('colors/safe');
		let used_prefix = this.config.prefix;
		if (arg.prefix && arg.prefix!='') {
			// use temporal given prefix
			if (arg.prefix.split(',').length>1) {
				let pref = arg.prefix.split(',');
				let txt = `[${pref[0]}] `;
				let colors = require('colors/safe');
				if (pref[1] in colors) {
					used_prefix = colors[pref[1]](txt);
				} else {
					used_prefix = txt;
				}
			} else {
				let txt = `[${arg.prefix}] `;
				used_prefix = txt;
			}
		}
		//
		if (!this.config.silent) {
			if (this.config.colors && msg.indexOf('error:')!=-1) {
				this.config.console.error(used_prefix + colors.red(msg));
			} else if (msg!='') {
				if (this.config.colors && arg.color in colors) {
					this.config.console.log(used_prefix + colors[arg.color](msg));
				} else {
					this.config.console.log(this.colorize(used_prefix + msg));
				}
			}
			// data output
			if (arg.data) {
				let util = require('util');
				let edata = util.inspect(arg.data, false,null,true);
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
	outT(arg:{message:string, prefix?:string,color?:Colors,data?:any}={message:null,prefix:''}) {
		let msg = arg.message, colors = require('colors/safe');
		if (!this.config.silent) {
			// timestamp prefix
			let d = new Date();
			let hr:string|number = d.getHours();
			if (hr < 10) {
			    hr = "0" + hr;
			}
			let min:string|number = d.getMinutes();
			if (min < 10) {
			    min = "0" + min;
			}
			let sec:string|number = d.getSeconds();
			if (sec < 10) {
			    sec = "0" + sec;
			}
			let timeStamp = this.colorize(`[${hr}:${min}:${sec}]: ${msg.trim()}`);
			// output
			if (this.config.colors && arg.data && arg.color) {
				this.out({message:timeStamp, data:arg.data, color:arg.color, prefix:arg.prefix});
			} else if (arg.data) {
				this.out({message:timeStamp, data:arg.data, color:null, prefix:arg.prefix});
			} else if (this.config.colors && arg.color) {
				this.out({message:timeStamp, data:null, color:arg.color, prefix:arg.prefix});
			} else {
				this.out({message:timeStamp, data:null, color:null, prefix:arg.prefix});
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

	title(arg:{title:string, color:Colors, config:Object, titleColor?:Colors}={ title:null, color:'white', config:{} }) {
		if (!this.config.silent) {
			const box = require('boxen'), colors = require('colors/safe');
			let textc = (arg.titleColor)?arg.titleColor:arg.color;
			let resp = box(colors[textc](arg.title),{
				borderColor:arg.color,
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
			,...arg.config});
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
	table(arg:{title:string,data:any,color?:Colors,struct_sort?:string}={ title:null,data:null }) {
		if (!this.config.silent) {
			let info = arg.data, colors = require('colors/safe');
			if (arg.struct_sort) {
				let sortObjectsArray = require('sort-objects-array');
				if (arg.struct_sort.split(' ').length>1) {
					// field desc, field asc
					info = sortObjectsArray(arg.data, arg.struct_sort.split(' ')[0], arg.struct_sort.split(' ')[1]);
				} else {
					info = sortObjectsArray(arg.data, arg.struct_sort);
				}
			}
			let asciiTable = require('ascii-table');
			let table = new asciiTable(arg.title);
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
			if (this.config.colors && arg.color) {
				this.config.console.log(colors[arg.color](table.render()));
			} else {
				this.config.console.log(table.toString());
			}
		}
	}

	setColorTokens(colorTokens:colorTokens) {
        this.colorTokens_ = colorTokens;
    }

    colorize(text:string) {
        /**
         * colorize(`this is a *red* example |car| with #blue#`,{ '*':'red', '|':'yellow', '#':'blue' })
         */
        const def = this.colorTokens_;
        let text_ = text;
        if (this.isObjEmpty(def)) return text_;
        const colors_ = require('colors/safe')
        const extractor = require('extractjs')()
        let tokens = Object.keys(def);
         for (let token of tokens) {
			 for (let x of [1,2,3,4,5]) {			 
				let ext_ = extractor(`${token}{text}${token}`,text_);
				if (ext_.text) {
					text_ = text_.replace(
						token+ext_.text+token,
						colors_[def[token]](ext_.text)
					)
				}
			}
        }
        return text_;
    }

	isObjEmpty(obj) {
        //fastest algorithm
        for (let x in obj) return false;
        return true;
    }

	// ********************
	// private methods
	// ********************

	throwIfMissing(name) {
        throw new Error('Missing '+name+' parameter!');
    }

}