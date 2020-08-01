# Punto Origen OPEN Framework : ES6 Classes
<sup>Note: you need to pass all arguments as an Object with keys.</sup>

# API Reference
Open_console: A class to help display information in the console.


* [open_console](#module_open_console)
    * [.setSilent(value)](#module_open_console+setSilent)
    * [.time(id)](#module_open_console+time)
    * [.timeEnd(id)](#module_open_console+timeEnd)
    * [.setPrefix([prefix], [color])](#module_open_console+setPrefix)
    * [.clear()](#module_open_console+clear)
    * [.out(message, [data], [color], [prefix])](#module_open_console+out)
    * [.outT(message, [data], [color], [prefix])](#module_open_console+outT)
    * [.title(title, [color], [titleColor], [config])](#module_open_console+title)
    * [.table(title, data, [struct_sort], [color])](#module_open_console+table)

<a name="module_open_console+setSilent"></a>

### open_console.setSilent(value)
Sets visibility output

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | if true, hides all output |

<a name="module_open_console+time"></a>

### open_console.time(id)
Calls timer start

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | key ID to measure |

<a name="module_open_console+timeEnd"></a>

### open_console.timeEnd(id)
Calls timer end

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | key ID to measure and show timming for. |

<a name="module_open_console+setPrefix"></a>

### open_console.setPrefix([prefix], [color])
Sets output prefix

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Description |
| --- | --- | --- |
| [prefix] | <code>String</code> | prefix |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |

<a name="module_open_console+clear"></a>

### open_console.clear()
Clears the console screen

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  
<a name="module_open_console+out"></a>

### open_console.out(message, [data], [color], [prefix])
Output a message to the console screen, with an optional var with data

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| [data] | <code>Object</code> | var dump to include in output |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |
| [prefix] | <code>String</code> | use this prefix instead of the configured one. To use color, use format 'prefix,color' |

<a name="module_open_console+outT"></a>

### open_console.outT(message, [data], [color], [prefix])
Output a message to the console screen with timestamp, and an optional var with data

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| [data] | <code>Object</code> | var dump to include in output |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |
| [prefix] | <code>String</code> | use this prefix instead of the configured one. To use color, use format 'prefix,color' |

<a name="module_open_console+title"></a>

### open_console.title(title, [color], [titleColor], [config])
Displays the given text as a title

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| title | <code>String</code> |  | title to display |
| [color] | <code>String</code> | <code>white</code> | color for box borders. |
| [titleColor] | <code>String</code> |  | color for title. If undefined, uses the box color. |
| [config] | <code>Object</code> |  | config overwrite params for boxen. |
| [config.align] | <code>String</code> | <code>center</code> | aligns the title by its value: left,center,right |

<a name="module_open_console+table"></a>

### open_console.table(title, data, [struct_sort], [color])
Shows data array as table in the console

**Kind**: instance method of [<code>open\_console</code>](#module_open_console)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | title for table |
| data | <code>Array</code> | array of objects for building the table. |
| [struct_sort] | <code>String</code> | sort data before displaying. Supports: field asc/desc. |
| [color] | <code>String</code> | color for table. |


* * *

&copy; 2020 Pablo Schaffner &lt;pablo@puntorigen.com&gt;.
Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).