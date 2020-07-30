# Punto Origen OPEN Framework : ES6 Classes

# API Reference
Console: A class to help display information in the console.<br/>Note: You need to pass all arguments as an Object with keys.


* [Console](#module_Console)
    * [Console](#exp_module_Console--Console) ⏏
        * [new Console(config)](#new_module_Console--Console_new)
        * [.setSilent(value)](#module_Console--Console+setSilent)
        * [.setPrefix([prefix], [color])](#module_Console--Console+setPrefix)
        * [.clear()](#module_Console--Console+clear)
        * [.out(message, [data], [color])](#module_Console--Console+out)
        * [.outT(message, [data], [color])](#module_Console--Console+outT)
        * [.title(title, [color], [titleColor], [config])](#module_Console--Console+title)
        * [.table(title, data, [struct_sort], [color])](#module_Console--Console+table)

<a name="exp_module_Console--Console"></a>

### Console ⏏
**Kind**: Exported class  
<a name="new_module_Console--Console_new"></a>

#### new Console(config)
Sets initial configuration


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>object</code> |  | (optional) defines initial configuration |
| [config.silent] | <code>boolean</code> | <code>false</code> | Starts hiding all output |
| [config.prefix] | <code>string</code> |  | Prefix for messages shown with methods. |

<a name="module_Console--Console+setSilent"></a>

#### Console.setSilent(value)
Sets visibility output

**Kind**: instance method of [<code>Console</code>](#exp_module_Console--Console)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | if true, hides all output |

<a name="module_Console--Console+setPrefix"></a>

#### Console.setPrefix([prefix], [color])
Sets output prefix

**Kind**: instance method of [<code>Console</code>](#exp_module_Console--Console)  

| Param | Type | Description |
| --- | --- | --- |
| [prefix] | <code>String</code> | prefix |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |

<a name="module_Console--Console+clear"></a>

#### Console.clear()
Clears the console screen

**Kind**: instance method of [<code>Console</code>](#exp_module_Console--Console)  
<a name="module_Console--Console+out"></a>

#### Console.out(message, [data], [color])
Output a message to the console screen, with an optional var with data

**Kind**: instance method of [<code>Console</code>](#exp_module_Console--Console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| [data] | <code>Object</code> | var dump to include in output |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |

<a name="module_Console--Console+outT"></a>

#### Console.outT(message, [data], [color])
Output a message to the console screen with timestamp, and an optional var with data

**Kind**: instance method of [<code>Console</code>](#exp_module_Console--Console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message to output |
| [data] | <code>Object</code> | var dump to include in output |
| [color] | <code>String</code> | black,red,green,yellow,blue,purple,cyan,white |

<a name="module_Console--Console+title"></a>

#### Console.title(title, [color], [titleColor], [config])
Displays the given text as a title

**Kind**: instance method of [<code>Console</code>](#exp_module_Console--Console)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| title | <code>String</code> |  | title to display |
| [color] | <code>String</code> | <code>white</code> | color for box borders. |
| [titleColor] | <code>String</code> |  | color for title. If undefined, uses the box color. |
| [config] | <code>Object</code> |  | config overwrite params for boxen. |
| [config.align] | <code>String</code> | <code>center</code> | aligns the title by its value: left,center,right |

<a name="module_Console--Console+table"></a>

#### Console.table(title, data, [struct_sort], [color])
Shows data array as table in the console

**Kind**: instance method of [<code>Console</code>](#exp_module_Console--Console)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | title for table |
| data | <code>Array</code> | array of objects for building the table. |
| [struct_sort] | <code>String</code> | sort data before displaying. Supports: field asc/desc. |
| [color] | <code>String</code> | color for table. |


* * *

&copy; 2020 Pablo Schaffner &lt;pablo@puntorigen.com&gt;.
Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).