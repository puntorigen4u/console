/**
* Open_console: A class to help display information in the console.
* @name 	open_console
* @module 	open_console
**/
interface Config {
    silent: boolean | void;
    prefix: string;
    colors: boolean;
    console: {
        log: any;
        error: any;
        time: any;
        timeEnd: any;
        default: boolean;
    };
}
declare type Colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
export default class open_console {
    config: Config;
    time_table: any;
    constructor(arg?: {
        silent?: boolean;
        prefix: string;
        config: object;
    });
    /**
    * Sets visibility output
    * @param 		{Boolean}	value 	- if true, hides all output
    */
    setSilent(arg: {
        value: boolean;
    }): void;
    /**
    * Calls timer start
    * @param 		{String}	id 	- key ID to measure
    */
    time(arg: {
        id: string;
    }): void;
    /**
    * Calls timer end
    * @param 		{String}	id 			- key ID to measure and show timming for.
    * @param 		{Object}	[data]		- var dump to include in output
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    */
    timeEnd(arg?: {
        id: string;
        color: Colors;
        data?: any;
        prefix?: string;
        time?: boolean;
    }): void;
    /**
    * Sets output prefix
    * @param 		{String}	[prefix]	- prefix
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    */
    setPrefix(arg: {
        prefix?: string;
        color?: Colors;
    }): void;
    /**
    * Clears the console screen
    */
    clear(): void;
    /**
    * Outputs an ora spinner with the given message, used prefix and color.
    * @param 		{String}	message		- message to output
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    * @return 		{Object}				- Object similar to ora object with an additional text(x) method
    */
    spinner(arg?: {
        message: string;
        color?: Colors;
        prefix?: string;
    }): {
        start: (x: any) => void;
        text: (x: any) => void;
        succeed: (x: any) => void;
        fail: (x: any) => void;
        warn: (x: any) => void;
        info: (x: any) => void;
        stop: () => void;
    };
    /**
    * Returns an instance of cli-progress with the given total amount, format, and color.
    * @param 		{String}	format			- format of progress message. Example: 'Progress {bar} - {percentage} %'
    * @param 		{Object}	[config]		- options overwrite for cli-progress multibar config
    * @param 		{String}	[prefix]		- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    * @param 		{Function}	[formatData]	- function(data) expects a return of a modified data instance. Inside you can control the format presentation and vars used inside the format argument. You also have access to special keys (progress,value,total,bar,eta,percentage,...all your data keys) and helper functions (data.funcs.colors and data.funcs.symbols).
    * @return 		{Object}					- Object similar to cli-progress object with methods to create,update,remove progress bars
    */
    progress(arg?: {
        format: string;
        formatData: any;
        prefix?: string;
        config?: Object;
    }): {
        create: (total: any, data: any) => {
            update: (value: any, data: any) => any;
            total: (total: any) => void;
            remove: () => void;
            raw: () => any;
        };
        raw: () => any;
        stop: () => void;
    };
    /**
    * Output a message to the console screen, with an optional var with data
    * @param 		{String}	message		- message to output
    * @param 		{Object}	[data]		- var dump to include in output
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    */
    out(arg?: {
        message: string;
        color?: Colors;
        prefix?: string;
        data?: any;
    }): void;
    /**
    * Output a message to the console screen with timestamp, and an optional var with data
    * @param 		{String}	message		- message to output
    * @param 		{Object}	[data]		- var dump to include in output
    * @param 		{String}	[color]		- black,red,green,yellow,blue,purple,cyan,white
    * @param 		{String}	[prefix]	- use this prefix instead of the configured one. To use color, use format 'prefix,color'
    */
    outT(arg?: {
        message: string;
        prefix?: string;
        color?: Colors;
        data?: any;
    }): void;
    /**
    * Displays the given text as a title
    * @param 		{String}	title			- title to display
    * @param 		{String}	[color=white]	- color for box borders.
    * @param 		{String}	[titleColor]	- color for title. If undefined, uses the box color.
    * @param 		{Object}	[config]				- config overwrite params for boxen.
    * @param 		{String} 	[config.align=center]	- aligns the title by its value: left,center,right
    */
    title(arg?: {
        title: string;
        color: Colors;
        config: Object;
        titleColor?: Colors;
    }): void;
    /**
    * Shows data array as table in the console
    * @param 		{String}	title			title for table
    * @param 		{Array}		data			array of objects for building the table.
    * @param 		{String}	[struct_sort]	sort data before displaying. Supports: field asc/desc.
    * @param 		{String}	[color]			color for table.
    */
    table(arg?: {
        title: string;
        data: any;
        color?: Colors;
        struct_sort?: string;
    }): void;
    throwIfMissing(name: any): void;
}
export {};
//# sourceMappingURL=index.d.ts.map