const express = require('express');
const router = express.Router();

function testMiddleware(req, res, next){
    console.log('첫번째 미들웨어');
    next();
}
function testMiddleware2(req, res, next){
    console.log('두번째 미들웨어');
    next();
}

router.get('/', testMiddleware, testMiddleware2, (req, res) =>{
    res.send('admin 페이지');
});

router.get('/products',(req, res) =>{
    res.render('admin/products.html',
        { nalzza : "날짜"} 
    );
}); //localhost:3000/admin/products

router.get('/products/write', (req,res)=>{
    res.render('admin/write.html');
}); //localhost:3000/admin/products/write

router.post('/products/write',(req, res)=>{
    res.send(req.body); //post방식으로 받기
}); //{"name":"123","price":"123","description":"32"}

module.exports = router;