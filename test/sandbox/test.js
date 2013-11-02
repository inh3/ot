var inspect = require('util').inspect;
var Client = require('mariasql');

var c = new Client();
c.connect({
    host: '192.168.1.122',
    user: 'ot',
    password: 'open.care!',
    db: 'ot'
});

c.on('connect', function() {
    console.log('Client connected');
})
    .on('error', function(err) {
        console.log('Client error: ' + err);
    })
    .on('close', function(hadError) {
        console.log('Client closed');
    });

c.query('SHOW DATABASES')
    .on('result', function(res) {
        res.on('row', function(row) {
            console.log('Result row: ' + inspect(row));
        })
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function(info) {
                console.log('Result finished successfully');
            });
    })
    .on('end', function() {
        console.log('Done with all results');
    });

c.end();