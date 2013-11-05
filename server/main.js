var express = require('express');
var app = express();

require('./configuration.js')(app, express);
require('./router.js')(app);

if (!module.parent){
    app.listen(80);
    console.log('Express started on port 80');
}