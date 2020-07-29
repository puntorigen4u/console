# Creador OPEN Framework : ES6 Classes

# API Reference
A module for helping display information in the console


* [console](#module_console)
    * [module.exports](#exp_module_console--module.exports) ⏏
        * [new module.exports(config)](#new_module_console--module.exports_new)
        * [.setSilent(value)](#module_console--module.exports+setSilent)
        * [.setPrefix(prefix, color)](#module_console--module.exports+setPrefix)
        * [.clear()](#module_console--module.exports+clear)
        * [.out(message, data, color)](#module_console--module.exports+out)
        * [.outT(message, data, color)](#module_console--module.exports+outT)
        * [.title(title, color, titleColor, config)](#module_console--module.exports+title)
        * [.table(title, data, struct_sort, color)](#module_console--module.exports+table)

<a name="exp_module_console--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_console--module.exports_new"></a>

#### new module.exports(config)
Sets initial configuration


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>object</code> |  | (optional) defines initial configuration |
| [config.silent] | <code>boolean</code> | <code>false</code> | Starts hiding all output |
| [config.prefix] | <code>string</code> |  | Prefix for messages shown with methods. |

<a name="module_console--module.exports+setSilent"></a>

#### module.exports.setSilent(value)
setSilent 	sets visibility output

**Kind**: instance method of [<code>module.exports</code>](#exp_module_console--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | (required) If true, hides all output |

<a name="module_console--module.exports+setPrefix"></a>

#### module.exports.setPrefix(prefix, color)
setPrefix 	sets output prefix

**Kind**: instance method of [<code>module.exports</code>](#exp_module_console--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>Boolean</code> | optional prefix |
| color | <code>String</code> | optional: black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console--module.exports+clear"></a>

#### module.exports.clear()
clear 		clears the console screen

**Kind**: instance method of [<code>module.exports</code>](#exp_module_console--module.exports)  
<a name="module_console--module.exports+out"></a>

#### module.exports.out(message, data, color)
out 			output the argument to the console screen

**Kind**: instance method of [<code>module.exports</code>](#exp_module_console--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| data | <code>Object</code> | optional: var dump to include in output |
| color | <code>String</code> | optional: black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console--module.exports+outT"></a>

#### module.exports.outT(message, data, color)
outT 			output the argument to the console screen with timestamp

**Kind**: instance method of [<code>module.exports</code>](#exp_module_console--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| data | <code>Object</code> | optional: var dump to include in output |
| color | <code>String</code> | optional: black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console--module.exports+title"></a>

#### module.exports.title(title, color, titleColor, config)
title 		displays the given text as a title

**Kind**: instance method of [<code>module.exports</code>](#exp_module_console--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | title to display |
| color | <code>String</code> | (optional) color for box borders. |
| titleColor | <code>String</code> | (optional) color for title. If undefined, uses the box color. |
| config | <code>Object</code> | (optional) config overwrite params for boxen. |

<a name="module_console--module.exports+table"></a>

#### module.exports.table(title, data, struct_sort, color)
table 		shows data array as table in the console

**Kind**: instance method of [<code>module.exports</code>](#exp_module_console--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | title for table |
| data | <code>Array</code> | array of objects for building the table. |
| struct_sort | <code>String</code> | (optional) sort data before displaying. Supports: field asc/desc. |
| color | <code>String</code> | (optional) color for table. |


* * *

&copy; 2020 Pablo Schaffner &lt;pablo@puntorigen.com&gt;.
Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).