var express = require('express');
var app = express();
var _req = require('request')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cors = require('cors')
var _ = require('underscore');
var ethUtils = require('ethereumjs-util');
var path = require('path');

var sql = require('./connect');
var PR_STATE = {
	OPEN  : 1,
	CLOSED : 2,
	MERGED : 3,
	AWAITING_ADDRESS : 4,
	FULFILLED : 5
}

app.use(cors())

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


app.get('/auth/authorize', cookieParser(), function (req, res) {
	console.log('I am here');
	var code = req.query.code;
	var state = req.query.state;
	var token_url = "https://github.com/login/oauth/access_token";
	var form_data = {
		client_id : "79a74ecd4f74e041ef36",
		client_secret : "73fa94eb26724dcae9f28743396b4d248e28f350",
		code : code,
		state : state
	}

	_req.post({url : token_url,formData :form_data}, function(err, httpResponse, body) {
    console.log(body);
		var qs = body.split("&")[0];
		var accessToken = qs.split("=")[1];
		var options = {
			url : "https://api.github.com/user?access_token=" + accessToken,
			headers : {
				"User-Agent" : 'axxxx'
			}
		}
		_req.get(options , function(err, httpResponse, b) {
			var userProf = JSON.parse(b);
			console.log(userProf.login);
			res.cookie('login',userProf.login, { maxAge: 900000});
			res.cookie('accessToken',accessToken, { maxAge: 900000});
			//
			// res.writeHead(200, {'Set-Cookie' : 'login='+ userProf.login + ';accessToken='+accessToken});
			var s = '<script>window.location.href = "http://localhost:5000/"</script>'
			var x = '<html><head>' + s + '</head><body></body></html>'
			res.end(x);
		});

	});
});




app.post('/events/:repoID', jsonParser, function(request, response) {
	var body = request.body;
	var repoID = request.params.repoID;
	var repoOwner = request.body.repository.owner.id;
	//console.log("id, ow, ac", repoID, repoOwner, body.action, body.pull_request && body.pull_request.merged);
	if (!body.pull_request) {
		return response.json("This is non-sense");
	}
	console.log(body.pull_request.id, body.pull_request.title, body.action);
	switch (body.action) {

		case "opened":
		  var data = {
				id : body.pull_request.id,
				repo_id : parseInt(repoID),
				repo_owner_id : parseInt(repoOwner),
				state : PR_STATE.OPEN,
				contributor : body.pull_request.head.user.id,
				title : body.pull_request.title
			}
			sql.query("insert into pull_request SET ?", data, console.log);
			console.log(body.pull_request.id, body.pull_request.title, body.pull_request.head.user.login);
			break;
		case "closed":
			var data = {};
			var merged = body.pull_request.merged;
			data.id = parseInt(body.pull_request.id);
			if (merged) {
				data.state = PR_STATE.MERGED;
				data.contributor = body.pull_request.head.user.id;
			}
			else {
				data.state = PR_STATE.CLOSED;
				data.contributor = null;

			}
			sql.query("UPDATE ?? SET state=?, contributor=? where id=?", ['pull_request', data.state, data.contributor, data.id], console.log);
			break;
		default:
			console.log('xxx')
	}
	return "0k"
});

app.get('/PR/:repoID', function(request, response) {
	var repo = parseInt(request.params.repoID);
	sql.query("select pull_request.id, pull_request.contributor, pull_request.repo_id, pull_request.state, pull_request.contributor, pull_request.numTokens, pull_request.title, users.user_id, users.username, users.address from pull_request  LEFT join users on users.user_id=pull_request.contributor  where pull_request.repo_id=? and state NOT IN(2,5)", [repo], function(error, rows) {
		rows = _.reject(rows, function(PR) {
			return PR.state === PR_STATE.MERGED && PR.numTokens === 0;
		});

		response.json(rows);
	});
})

app.put('/PR/:PR_ID/tokens/:numTokens', function(request, response) {
	var PR_ID = parseInt(request.params.PR_ID);
	var numTokens = parseInt(request.params.numTokens);
	console.log(PR_ID, numTokens);
	sql.query("UPDATE pull_request set numTokens=? where id=?", [numTokens, PR_ID], function (error, rows) {
		console.log(error, rows);
		response.json('xxxx');
	})
})

app.put('/PR/:PR_ID/close', function(request, response) {
	var PR_ID = parseInt(request.params.PR_ID);

	console.log("I am here");
	sql.query("update pull_request set state=? where id=?",[PR_STATE.FULFILLED, PR_ID], function (error, rows) {
		console.log(error, rows);
		response.json('xxxx');
	});
});

app.get('/userAddress', function(request, response) {
	var login = request.query.login;
	sql.query("select address from users where username=?",[login], function(error, x) {
		response.json(x[0]);
	})
})



app.post('/userAddress', jsonParser, function(request, response) {

	var payoutAddress = request.body.payoutAddress;
	var username = request.body.username;
	var signature = request.body.signature;
	var msg = "You are setting the payout address to " + payoutAddress + " and your github login is " + username;
	console.log(payoutAddress, username, signature);
	var b = ethUtils.toBuffer(msg);

	var hashPersonalMessage = ethUtils.hashPersonalMessage(b);
	var sigDecoded = ethUtils.fromRpcSig(signature);
	var publicKey = ethUtils.ecrecover(hashPersonalMessage,
		sigDecoded.v,
		sigDecoded.r,
		sigDecoded.s);
	var signedAddress = ethUtils.bufferToHex(ethUtils.pubToAddress(publicKey));
	if(payoutAddress=== signedAddress) {
		sql.query("update users set address=? where username=?",[signedAddress, username], function(error, result) {
			response.json(result);
		});
	}
	else {
		return response.end("lol")
	}
});

app.listen(8000, function() {
  console.log('Server is listening on', 8000)
});
