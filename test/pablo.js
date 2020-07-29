const Console = require('../lib/index');

(async () => {
    // testing code here
    let display = new Console();
    //
    display.clear();
    display.setPrefix({ prefix:'conceptojs', color:'yellow' });
    display.outT({ message:'Hola', color:'cyan', data:{ nom:'Pablo' } });
    display.outT({ message:'error:testing' });

})().catch(err => {
    console.error(err);
});
