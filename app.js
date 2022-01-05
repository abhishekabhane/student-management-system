//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.connect("mongodb+srv://admin-abhishek:@Bhi2001@cluster0.axydn.mongodb.net/StudentmanagementDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/AttendenceDB');

const studentSchema = {
    email: String,
    name: String,
    class: String,
    rollNo: String,
    dob: String,
    password: String,
    phone: String
};

const staffSchema = {
    email1: String,
    name: String,
    class: String,
    phone: String,
    password1: String
};

const Student = mongoose.model("Student", studentSchema);
const Staff = mongoose.model("Staff", staffSchema);

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/signin", function(req, res) {
    res.render("signin");
});

app.get("/details", function(req, res) {
    res.render("details");
});

app.get("/studenttable", async(req, res) => {
    // Student.find({}, function(err, student) {
    //     if (!err) {
    //         res.render("student", { student: student });
    //     }
    // });
    const students = await Student.find({});
    res.render("studenttable", { students });
});

app.get('/update/:key', (req, res) => {
    Student.find({ _id: ObjectId(req.params.key) }, function(err, result) {
        if (err) {
            console.log(err)
        } else if (result.length < 1) {
            res.send('404 error');
        } else {
            res.render('update.ejs', { students: result });
        }
    });
});

app.post("/details", function(req, res) {
    const student = new Student({
        email: req.body.email,
        name: req.body.name,
        rollNo: req.body.rollNo,
        class: req.body.class,
        password: req.body.password,
        dob: req.body.dob,
        phone: req.body.phone
    });
    student.save(function(err) {
        if (!err) {
            res.redirect("/");
            console.log(student);
        } else {
            console.log(err);
        }
    });
});

app.post("/register", function(req, res) {
    const staff = new Staff({
        email1: req.body.email1,
        name: req.body.name1,
        class: req.body.class1,
        password1: req.body.password1,
        phone: req.body.phone1
    });
    staff.save(function(err) {
        if (!err) {
            res.redirect("/signin");
            console.log(staff);
        } else {
            console.log(err);
        }
    });
});

app.post("/signin", function(req, res) {
    const username = req.body.email1;
    const password = req.body.password1;

    Staff.findOne({ email1: username }, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password1 === password) {
                    res.redirect("/studenttable");
                } else {
                    if (foundUser.password1 != password) {
                        res.send("wrong password");
                    }
                }
            } else {
                if (!foundUser) {
                    res.redirect("/register");
                }
            }
        }
    });
});

app.post("/search", function(req, res) {
    const name = req.body.searchname;

    Student.find({ name: name }, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                // res.render("studenttable", { students: foundUser }); // This studenttable can be used if you want to filter it on the same page
                res.render("search", { students: foundUser }); // This search can be used if u want another page to be displayed for the sorted data
            } else {
                if (!foundUser) {
                    console.log("No user");
                    res.redirect("/details");
                }
            }
        }
    });
});

app.post("/delete", function(req, res) {
    const deleteItemId = req.body.deleteitem;

    Student.findByIdAndRemove(deleteItemId, function(err) {
        if (!err) {
            console.log("successfully deleted checked item.");
            res.redirect("/studenttable");
        }
    });
});

app.post('/update', function(req, res) {
    Student.updateOne({ _id: req.body._id }, {
        email: req.body.email2,
        name: req.body.name2,
        rollNo: req.body.rollNo2,
        class: req.body.class2,
        dob: req.body.dob2,
        phone: req.body.phone2
    }, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data);
            res.redirect('/studenttable');
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log("server has been started.");
});