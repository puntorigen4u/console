const console_ = require('../lib/index');

(async () => {
    // testing code here
    //let display = new console_({ silent:false, config:{ colors:false } });
    let display = new console_({ silent:false });
    //
    display.clear();
    display.time({ id: 'from start' });
    display.title({ title:'Concepto DSL: compile pix/vue.dsl', color:'green' });
    display.setPrefix({ prefix:'conceptojs', color:'yellow' });
    display.outT({ message:'Hola solo' });
    display.outT({ message:'Hola con color', color:'cyan' });
    display.outT({ message:'Hola con color y data', color:'cyan', data:{ nom:'Pablo' } });
    display.outT({ message:'error:testing' });
    let info = [
    	{ firstName:'John', 	lastName:'Doe', 	age:20 },
    	{ firstName:'Richard', 	lastName:'Pi', 		age:37 },
    	{ firstName:'Little', 	lastName:'John', 	age:12 },
    ];
    display.table({ title:'Testing table', data:info, color:'cyan', struct_sort:'age asc' });
    display.timeEnd({ id: 'from start' });

})().catch(err => {
    console.error(err);
});
