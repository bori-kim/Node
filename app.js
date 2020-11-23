const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

const admin = require('./routes/admin');

const app = express();
const port = 3000;

nunjucks.configure('template', {
    autoescape : true ,
    express : app
});//app에서 사용하는 html는 template폴더에서 찾기

//미들웨어 셋팅
app.use( logger('dev'));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended:false } ) );

app.use('/uploads', express.static('uploads')); //정적 파일 업로드
//폴더안에 있는 파일들을 한번에 사용하기(img, js, css 등)
//앞이 url, 뒤가 폴더명

app.use((req, res, next) => {
    app.locals.isLogin = true;
    app.locals.req_path = req.path; // 현재 url을 보내줌
    next();
});//isLogin이라는 전역변수를 생성
   




app.get('/', (req,res) => {
    res.send('express start');
});

function topMiddleware(req, res, next){
    console.log('최우선 미들웨어');
    next();
}; // 매개변수에 next함수가 있으면 미들웨어 사용

app.use('/admin', topMiddleware, admin);
// 주소/admin에서는 admin 상수 사용

app.use( (req, res, _ ) =>{
    res.status(400).render('common/404.html');
});//페이지를 못찾을 시 404.html 켜기
//사용하지 않을 매개변수는 _ 로 표시(원래 next)

app.use((err, req, res, _ )=>{
    res.status(500).render('common/500.html');
});//페이지 에러시 500.html 켜기

app.listen( port, () => {
    console.log('Express listening on port', port);
}); //콘솔에 접속 알림