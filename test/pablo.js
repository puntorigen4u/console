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
    // progress bar testing
    let progress = display.progress({ format:'{text} {bar} |{file} (time left {eta})',config:{ barsize:30 }, formatData:function(data) {
        if (data.percentage<30) {
            data.bar = data.funcs.colors.magenta(data.bar);
        } else if (data.percentage<60) {
            data.bar = data.funcs.colors.yellow(data.bar);
        } else {
            data.bar = data.funcs.colors.green(data.bar);
        }
        return data;
    }});
    let principal = progress.create({ total:10 });
    let principal2 = progress.create({ total:100 });
    let x=0;
    let repite = setInterval(function() {
        principal.update({ value:x, data:{
            text:'hola'+x,
            file:'test'
        } });
        principal2.update({ value:x*10, data:{
            text:'segundo'+(x*10),
            file:'test'
        } });
        if (x==11) {
            //principal.remove();
            //principal2.remove();
            clearInterval(repite);
            setTimeout(function() {
                progress.stop();
            },1000);
        } else {
            x+=1;
        }
    },200);
    //

})().catch(err => {
    console.error(err);
});
