var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    path = require("path"),
    bodyParser = require("body-parser"),
	news = require("./news-tos");

app.set("view engine", "jade");
app.set("views", path.join(__dirname, "../views"));

app.use(bodyParser());
app.use("/public", express.static(path.join(__dirname, "../public")));

/*
 * RESTful API:
 * GET  /api/news-tos      - list all records
 * GET  /api/news-tos/:id  - retrieves record with id :id
 * POST /api/news-tos/:id  - creates new record if id doesn't exist or updates existing
 * 
 */

app.get("/api/news-tos", function(req, res) {
	news.findAll(function(err, data) {
		if (err) {
			res.send(500);
			return console.log(err);
		}
		return res.json(data);
	});
});

app.get("/api/news-tos/:id", function(req, res) {
	news.findById(req.params.id, function(err, data) {
		if (err) {
			res.send(500);
			return console.log(err);
		}
		return res.json(data);
	});
});

app.get("/api/add", function(req, res) {
	news.findEmpty(function(err, data) {
		if (err) {
			res.send(500);
			return console.log(err);
		}
		if (data === null) {
			return res.json({});
		}
		return res.json(data);
	});
});

app.post("/api/add", function(req, res) {
	news.update(req.body, function(err, inserted) {
		if (err) {
			res.send(500);
			return console.log(err);
		}
		return res.redirect("/");
	});
});

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/partials/show", function(req, res) {
	res.render("show");
});

app.get("/partials/list", function(req, res) {
	res.render("list");
});

app.get("/partials/add", function(req, res) {
	res.render("add");
});

app.get("/partials/noempty", function(req, res) {
	res.render("noempty");
});

app.get("/show/:id", function(req, res) {
	res.render("index");
});

app.get("/add", function(req, res) {
	res.render("index");
});

app.get("/noempty", function(req, res) {
	res.render("index");
});

server.listen(8000, function(){
	console.log("express server listening on port 8000");
});
