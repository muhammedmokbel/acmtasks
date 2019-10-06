var express = require('express');
var exphbs = require('express-handlebars');
var path = require("path");
var app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
    res.render('home', {
        title: "Members App",
        members: members
    });
});
// our static data 
var members = [
    {
        id: 1,
        name: "mohamed",
        mobile: 123456789,
        email: "mohamed@gmail.com",
        committe: "technical"
    },
    {
        id: 2,
        name: "kahled",
        mobile: 123456789,
        email: "kahled@gmail.com",
        committe: "technical"
    },
    {
        id: 3,
        name: "karim",
        mobile: 123456789,
        email: "karim@gmail.com",
        committe: "technical"
    },
    {
        id: 4,
        name: "3baas",
        mobile: 123456789,
        email: "mohamed@gmail.com",
        committe: "technical"
    }
];
// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// get all members 
app.get("/api/members", function (req, res) {
    res.json(members);
});
// get single member 
app.get("/api/members/:id", function (req, res) {
    var found = members.some(function (member) { return member.id == parseInt(req.params.id); });
    if (found) {
        res.json(members.filter(function (member) { return member.id == parseInt(req.params.id); }));
    }
    else {
        res.status(400).json({ massge: "no memeber with id " + req.params.id });
    }
});
// Create a Member
app.post("/api/members", function (req, res) {
    var member = {
        id: Math.ceil(Math.random() * 100),
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        committe: req.body.committe
    };
    if (!member.name || !member.email || !member.mobile || !member.committe) {
        return res.status(400).json({ msg: "please fill all data ^_^" });
    }
    members.push(member);
    //    res.json(members)
    res.redirect('/');
});
// update member 
app.put("/api/members/:id", function (req, res) {
    var found = members.some(function (member) { return member.id == parseInt(req.params.id); });
    if (found) {
        var updates_1 = req.body;
        members.forEach(function (member) {
            if (member.id === parseInt(req.params.id)) {
                member.name = updates_1.name ? updates_1.name : member.name;
                member.email = updates_1.email ? updates_1.email : member.email;
                member.mobile = updates_1.mobile ? updates_1.mobile : member.mobile;
                member.committe = updates_1.committe ? updates_1.committe : member.committe;
                res.json({ msg: "the member up to date", member: member });
            }
        });
    }
    else {
        res.status(400).json({ massge: "no memeber with id " + req.params.id });
    }
});
// delete member 
app["delete"]("/api/members/:id", function (req, res) {
    var found = members.some(function (member) { return member.id == parseInt(req.params.id); });
    if (found) {
        res.json({ msg: "member deleted", members: members.filter(function (member) { return member.id !== parseInt(req.params.id); }) });
    }
    else {
        res.status(400).json({ massge: "no memeber with id " + req.params.id });
    }
});
// static folder 
app.use(express.static(path.join(__dirname, "htmls")));
var port = process.env.port || 5000;
app.listen(port, function () { return console.log(" our port is " + port); });
