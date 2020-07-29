# Creador OPEN Framework : ES6 Classes

# API Reference
A class to help display information in the console


* [console](#module_console)
    * [.setSilent(value)](#module_console+setSilent)
    * [.setPrefix([prefix], [color])](#module_console+setPrefix)
    * [.clear()](#module_console+clear)
    * [.out(message, [data], [color])](#module_console+out)
    * [.outT(message, [data], [color])](#module_console+outT)
    * [.title(title, [color], [titleColor], [config])](#module_console+title)
    * [.table(title, data, [struct_sort], [color])](#module_console+table)

<a name="module_console+setSilent"></a>

### console.setSilent(value)
Sets visibility output

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | (required) If true, hides all output |

<a name="module_console+setPrefix"></a>

### console.setPrefix([prefix], [color])
Sets output prefix

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| [prefix] | <code>String</code> | prefix |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console+clear"></a>

### console.clear()
Clears the console screen

**Kind**: instance method of [<code>console</code>](#module_console)  
<a name="module_console+out"></a>

### console.out(message, [data], [color])
Output a message to the console screen, with an optional var with data

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| [data] | <code>Object</code> | var dump to include in output |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console+outT"></a>

### console.outT(message, [data], [color])
Output a message to the console screen with timestamp, and an optional var with data

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| [data] | <code>Object</code> | var dump to include in output |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |

<a name="module_console+title"></a>

### console.title(title, [color], [titleColor], [config])
Displays the given text as a title

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| title | <code>String</code> |  | title to display |
| [color] | <code>String</code> | <code>white</code> | color for box borders. |
| [titleColor] | <code>String</code> |  | color for title. If undefined, uses the box color. |
| [config] | <code>Object</code> |  | config overwrite params for boxen. |
| [config.align] | <code>String</code> | <code>center</code> | aligns the title by its value: left,center,right |

<a name="module_console+table"></a>

### console.table(title, data, [struct_sort], [color])
Shows data array as table in the console

**Kind**: instance method of [<code>console</code>](#module_console)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | title for table |
| data | <code>Array</code> | array of objects for building the table. |
| [struct_sort] | <code>String</code> | sort data before displaying. Supports: field asc/desc. |
| [color] | <code>String</code> | color for table. |


* * *

&copy; 2020 Pablo Schaffner &lt;pablo@puntorigen.com&gt;.
Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).