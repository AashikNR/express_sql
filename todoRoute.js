let express = require('express');
let router = express.Router();
let fs = require('fs');
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});
con.connect(function(err) {
    if (err) throw err

});

router.get('/list', function(req, res){
    con.query("SELECT * FROM `todo_table` WHERE 1", function(err,result) {
        if(err) throw err
        let jsonData = JSON.parse(JSON.stringify(result));
        res.send(jsonData);
    });
});

router.post('/add', function(req, res){
        let value1 = req.body.user.value
        let sql = "INSERT INTO `todo_table`(`value`) VALUES ('"+ value1 +"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records added: " + result.affectedRows);
          let jsonData = JSON.parse(JSON.stringify(result));
          res.send(jsonData);
      });
});

router.put('/edit', function(req, res){
        let sql = "UPDATE todo_table SET value = '"+req.body.user.new+ "' WHERE value = '" +req.body.user.old+ "'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
          let jsonData = JSON.parse(JSON.stringify(result));
          res.send(jsonData);
      }); 
});

router.delete('/delete', function(req, res){   
        let id  =  req.body.user.id;
        let sql = "DELETE FROM `todo_table` WHERE id = " + id;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
          let jsonData = JSON.parse(JSON.stringify(result));
          res.send(jsonData);
        });
       
});

module.exports = router;