/**
 * Created by jean-jacquesebanga on 2015-08-03.
 */
var     express = require('express'),
    app     = express (),
    http    = require('http').createServer(app);



app.use(express.static('/lib'));
app.use(express.static('lib/media/'));
app.use(express.static('lib/map/'));
app.use(express.static('../lib/js/ebk'));
app.use(express.static('../lib/js/jquery'));
app.use(express.static('../lib/js/threejs'));
app.use(express.static('../lib/js/caman'));
app.use(express.static('../lib/js/threejs_controls'));
app.use(express.static(__dirname + '/lib'));




app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
   // console.log(__dirname+'/index.html');
    console.log(__dirname + '/lib');
});

http.listen(3000, function () {
    console.log('server running...');
});