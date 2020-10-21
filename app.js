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
});

//미들웨어 셋팅
app.use( logger('dev'));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended:false } ) );

app.use('/uploads', express.static('uploads')); //정적 파일 업로드
//폴더안에 있는 파일들을 한번에 사용하기(img, js, css 등)
//앞이 url, 뒤가 폴더명

app.get('/', (req,res) => {
    res.send('express start');
});
function topMiddleware(req, res, next){
    console.log('최우선 미들웨어');
    next();
}

app.use('/admin', topMiddleware, admin);

app.listen( port, () => {
    console.log('Express listening on port', port);
});