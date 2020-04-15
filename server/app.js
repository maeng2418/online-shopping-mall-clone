var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser'); // Body 데이터를 분석(parse)해서 req.body로 출력해주는 것

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// aplication/json
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/uploads', express.static('uploads')); // 업로드 폴더에 있는 정적자료를 가져오기 위함.
app.use('/api/product', productRouter);

module.exports = app;
