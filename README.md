# Creador OPEN Framework : ES6 Classes

# API Reference
A module for helping display information in the console


* [console](#module_console)
    * [.setSilent(value)](#module_console+setSilent)
    * [.setPrefix(prefix, color)](#module_console+setPrefix)
    * [.clear()](#module_console+clear)
    * [.out(message, data, color)](#module_console+out)
    * [.outT(message, data, color)](#module_console+outT)
    * [.title(title, color, titleColor, config)](#module_console+title)
    * [.table(title, data, struct_sort, color)](#module_console+table)

<a name="module_console+setSilent"></a>

### console.setSilent(value)
setSilent 	sets visibility output

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | (required) If true, hides all output |

<a name="module_console+setPrefix"></a>

### console.setPrefix(prefix, color)
setPrefix 	sets output prefix

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>Boolean</code> | optional prefix |
| color | <code>String</code> | optional: black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console+clear"></a>

### console.clear()
clear 		clears the console screen

**Kind**: instance method of [<code>console</code>](#module_console)  
<a name="module_console+out"></a>

### console.out(message, data, color)
out 			output the argument to the console screen

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| data | <code>Object</code> | optional: var dump to include in output |
| color | <code>String</code> | optional: black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console+outT"></a>

### console.outT(message, data, color)
outT 			output the argument to the console screen with timestamp

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| data | <code>Object</code> | optional: var dump to include in output |
| color | <code>String</code> | optional: black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console+title"></a>

### console.title(title, color, titleColor, config)
title 		displays the given text as a title

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | title to display |
| color | <code>String</code> | (optional) color for box borders. |
| titleColor | <code>String</code> | (optional) color for title. If undefined, uses the box color. |
| config | <code>Object</code> | (optional) config overwrite params for boxen. |

<a name="module_console+table"></a>

### console.table(title, data, struct_sort, color)
table 		shows data array as table in the console

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | title for table |
| data | <code>Array</code> | array of objects for building the table. |
| struct_sort | <code>String</code> | (optional) sort data before displaying. Supports: field asc/desc. |
| color | <code>String</code> | (optional) color for table. |


* * *

&copy; 2020 Pablo Schaffner &lt;pablo@puntorigen.com&gt;.
Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).