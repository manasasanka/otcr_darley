
'use strict'

var express = require('express'),
    bodyParser= require('body-parser'),
    url = require('url'),
    mysql=require('mysql'),
    app = express();	//express object instantiated

//var mdb = require('mdb')
var adodb = require('node-adodb');
var conn = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');



//Serve static files
//app.use(express.static('app'));


//Parse application/json
app.use(bodyParser.json())	//bodyParser has build in middlewares thata interpret urls, json, etc! 	//json is a key-value pairs, a 'hash' in curly braces!
app.use(express.static("public"))

/*var pg = require('pg');
pg.defaults.ssl = true;
//pg.connect
//app.get('/db', function (request, response) {
	var str = "postgres://yzimshomxoavkr:cbWI1Z7M-vXcSxMg0aZPcK6zsA@ec2-54-225-103-29.compute-1.amazonaws.com:5432/d5015hg2jnkb1i"
    var connectionString = "pg://yzimshomxoavkr:cbWI1Z7M-vXcSxMg0aZPcK6zsA@ec2-54-225-103-29.compute-1.amazonaws.com/d5015hg2jnkb1i"
    pg.connect(connectionString, function(err,client,done){//process.env.str, function(err, client, done) {
    	if (err) {
    		console.log(err);
    	}
  		conn = client
    /*client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    //});*/
  //});
//})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*var db = mdb('DarleyDatabse.accdb');

db.tables(function(err, tables){
	console.log("HERE")
	tables.forEach(function(table){
		db.toCSV(table, function(err, csv) {
			console.log(table, csv);
		})
	})
}) */


//Perform queries using sql	


//TODO: SEARCH CONN QUERY
/*
connection
  .query('SELECT * FROM Users')
  .on('done', function (data){
    console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
  })
  .on('fail', function (data){
    // TODO 逻辑处理 
  });*/




//Post route for inserting a vendor to the database
app.post('/sendInsertVendor', function(req, res) {
	console.log("is doing something")
	var inputs = req.body
	console.log('Body: ', body)

	conn.execute('INSERT INTO vendors(Company name) VALUES ("'+inputs.companyName+'")')	//, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
	    .on('done', function (data){
	    	console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
	    	conn.execute('INSERT INTO contact information(First Name, Last Name, Phone Number, Email Address, Street Address, City, State, Company name)
 VALUES ("'+inputs.firstName+","+inputs.lastName+","+inputs.phone+","+inputs.email+","+inputs.address+","+inputs.city+","+inputs.state+","+inputs.companyName+'")')	//, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
		    .on('done', function (data){
			    console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
				res.send({
					success:true
				})
			})
	    })
	    .on('fail', function (data){
	    	console.log("Error inserting information")
	    	res.send(JSON.stringify({message:"Error inserting information", err:true}))
	    });
})

app.post('/sendInsertProduct', function(req, res){
	var inputs = req.body;
	conn.execute('INSERT INTO products (Product Name, Product Description, MSRP, Size of Product, Size of Packaging, Weight, Quantity, Uses/Application, Distribution Location, Company Name)
	VALUES ("'+inputs.productName+'")')	//, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
	    .on('done', function (data){
	    	console.log("Successful insert")
	    	res.send({
	    		success:true
	    	})
	    })
})

//app.listen(4000);

//delete a politcical rep query
/*app.post('/deletePoliticalRep', function(req,res){
	var body = req.body
	console.log('Body: ', body)
	//conn.connect();
	var stmt = "DELETE FROM politicalrepresentative WHERE name = ? AND state = ?";	//put values into database table, can also hardcode (firstname,lastname.....)
	var inserts = 
	[body.polname, body.state
	]
	var stmt = mysql.format(stmt, inserts)
	conn.query(stmt, function(err, result) {
		//connection.end();
		if (err){
			console.error("Error: ", err)
			return res.send({
				error:true,
				mesg:"Could not delete data from database"
			})
		}
		res.send({
			success:true
		})
	})
})



//search for a politcical rep entry
app.post('/searchPoliticalRepbyState', function(req,res){
	console.log("here in search")
	var body = req.body
	console.log('Body: ', body)
	var stmt = "SELECT * FROM politicalrepresentative WHERE state = ?";	//put values into database table, can also hardcode (firstname,lastname.....)
	var inserts = [ body.state ]
	var stmt = mysql.format(stmt, inserts)
	conn.query(stmt, function(err, result) {
		//connection.end();
		if (err){
			console.error("Error: ", err)
			return res.send({
				error:true,
				mesg:"Could not delete data from database"
			})
		}
		console.log(result)
		var ret = JSON.stringify(result);
		res.send(ret);
			//{success:true
		//})
	})
})

//update query
app.post('/updatePoliticalRep', function(req, res) {
	var body = req.body
	console.log('Body: ', body)
	//conn.connect();
	var stmt = "UPDATE politicalrepresentative SET name = ?, state = ?, termbegin = ?, termend = ?, partyaffiliation = ?, housename = ? WHERE name = ?";
	var inserts = 
	[body.polname,		
	body.state,
	body.termBegin,
	body.termEnd,
	body.partyAffiliation,
	body.houseName,
	body.polname
	]
	var stmt = mysql.format(stmt, inserts)
	conn.query(stmt, function(err, result) {
		//connection.end();
		if (err){
			console.error("Error: ", err)
			return res.send({
				error:true,
				mesg:"Could not udpate data in database"
			})
		}
		res.send({
			success:true
		})
	})
})



//app.get('/', function(req,res) {
//	res.render('shuffle/index');
//})

*/
var port = process.env.PORT || 8080;
//create basic express server
app.listen(port, function () {
	console.log('Listening on port' + port)
})

