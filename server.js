var express = require('express');
var app = express();
var engines = require('consolidate');
const db = require('./router/DB/DBConnect.js');
var signinRouter = require('./router/Account/sign');
var session = require('express-session');
var filestore = require('session-file-store')(session);

// body-parser은 최신 express패키지 안에 포함되어있음.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret : '1lkfn1jaosel',
    resave : false,
    saveUninitialized : true,
    store : new filestore()
}));

app.use(express.static('public')); // public 폴더 안에 있는 파일들 정적으로 제공
app.use('/', signinRouter); // 계정관련 페이지 라우터 설정

app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.listen(3000, ()=>{
    console.log("server start port 3000");
})