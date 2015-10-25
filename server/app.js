
/**
 * Module dependencies.
 */
var express   = require('express'),
    http      = require('http'),
    path      = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var app = express();
exports.startServer = function() {
app.set('port', process.env.PORT || 3000);
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, '../public/views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/bank', function(req,res){
  res.render('index', {
      // key : value
    });
});
app.get('/*');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Demo server listening on port ' + app.get('port'));
});

};
