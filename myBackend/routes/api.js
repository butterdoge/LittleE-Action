const mysql=require("mysql")
const config=require("../config");
// const formidable = require('express-formidable')
var express = require('express');
var router = express.Router();
router.use(express.json());
// router.use(formidable())
router.use(express.urlencoded({ extended: true }))
router.get('/all', function(req, res, next) {
    var connection = mysql.createConnection(config.options); 
    connection.connect(function(err) { console.log('数据库连接成功！') }); 
    connection.query('select * from bus', function (error, results, fields) {
        if (error) throw error;
         console.log(results);
         console.log(fields);
         res.json(results)
         res.end();
    });
    // res.render('index', { title: '数据库连接成功' });
    connection.end();
  });

router.post('/insert',function(req,res,next){
  var connection = mysql.createConnection(config.options); 
  connection.connect(function(err) { console.log('数据库连接成功！') }); 
  var payload=req.body;
  console.log(payload)
  // var name=payload.name;
  // var roadmap=payload.roadmap;
  var city=payload.city;
  var school=payload.school;
  var name=payload.name;
  var score=payload.score;
  var time=payload.time;
  var amount=payload.amount;
  var contact=payload.contact;
  connection.query('insert into quiz(score,userName,userTime,city,school,amount,contact) values(?,?,?,?,?,?,?)',[score,name,time,city,school,amount,contact],function (error, results, fields) {
      if (error) throw error;
       console.log(results);
       console.log(fields);
       res.json(results);
  });
  //接下来插入到另一个数据库。
  // var roads=roadmap.split('>');
  // console.log(roads);
  // var query2="insert into bus2(Stopp,Route,Position) values(?,?,?)"
  // for(let i=0;i<roads.length;i++){
  //   connection.query(query2,[roads[i],name,i+1],function(error,results,fields){
  //     if (error) throw error;
  //     // res.json(results)
  //   })
  connection.end();
  // res.json(req.body);
  // req.end();
})

router.delete('/delete',function(req,res,next){
  var id=req.query.id;
  console.log(`删除id为${id}`)
  var sql='delete from bus where id=?'
  var connection = mysql.createConnection(config.options); 
  connection.connect(function(err) { console.log('数据库连接成功！') });
  connection.query(sql,[id],function(err,result){
    if(err)throw error;
    res.send('删除成功')
  })
  connection.end();
})

router.get('/how',function(req,res,next){
  var begin=req.query.begin;
  var end=req.query.end;
  var connection = mysql.createConnection(config.options); 
  connection.connect(function(err) { console.log('数据库连接成功！') }); 
  let sql='CALL how(?,?)';
  connection.query(sql,[begin,end],(err,result,fields)=>{
    if(err)throw error;
    res.json(result[0]);
    res.end();
  })
  connection.end();
})

module.exports=router;