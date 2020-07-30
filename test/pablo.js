const console_ = require('../lib/index');

(async () => {
    // testing code here
    let display = new console_({ silent:false });
    //
    display.clear();
    display.title({ title:'Concepto DSL: compile pix/vue.dsl', color:'green' });
    display.setPrefix({ prefix:'conceptojs', color:'yellow' });
    display.outT({ message:'Hola', color:'cyan', data:{ nom:'Pablo' } });
    display.outT({ message:'error:testing' });
    let info = [
    	{ firstName:'John', 	lastName:'Doe', 	age:20 },
    	{ firstName:'Richard', 	lastName:'Pi', 		age:37 },
    	{ firstName:'Little', 	lastName:'John', 	age:12 },
    ];
    display.table({ title:'Testing table', data:info, color:'cyan', struct_sort:'age asc' });

})().catch(err => {
    console.error(err);
});
