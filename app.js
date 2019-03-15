//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//https://lodash.com/
const _=require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
//import ไฟล bublic
app.use(express.static("public"));

let posts=[];

 //รับค่าผ่าน url home
app.get("/",function (req,res) {
 //response(ตอบสนอง) res.render("home",{key:value});
 res.render("home",{startContent:homeStartingContent,
postss:posts});
});

//รับค่าผ่าน url http://localhost:3000/contact
app.get("/contact",function(req,res){
 res.render("contact",{startContent:contactContent});
});

//รับค่าผ่าน url http://localhost:3000/about
app.get("/about",function(req,res){
res.render("about",{startContent:aboutContent});
});

//รับค่าผ่าน url http://localhost:3000/compose
app.get("/compose",function(req,res){
res.render("compose")
});

//รับค่าผ่าน form ส่วนใหญ่ข้อมูลจะเป็นความลับและมีขนาดใหญ่ (กดปุ่ม)
//1.import const bodyParser = require("body-parser");
//2.app.use(bodyParser.urlencoded({extended: true}));
//3.เรียกใช้ฟังกชันเพื่อดึงค่า let postTittle=req.body.postTittle;
//****postTittle เป็น ค่าที่ได้จาก name="postTittle" ในหน้า compose***
app.post("/compose",function(req,res){
// let postTittle=req.body.postTittle;
const post={
  tittle:req.body.postTittle,
  content:req.body.postBody
};
posts.push(post);
 res.redirect("/");
});

//https://expressjs.com/en/guide/routing.html (Route parameters)
//ส่งค่าและรับค่าแบบ params ทาง url
//http://localhost:3000/posts/hello
//const requestedTitle=req.params.postName;** รับค่า postName**
app.get("/posts/:postName",function(req,res){
  const requestedTitle=_.lowerCase( req.params.postName);

  //วนลูป foreach จากArray posts
  posts.forEach(function(postf) {
    const storedTitle=_.lowerCase( postf.tittle);
    if(storedTitle==requestedTitle){
     res.render("post",{
       tittle: postf.tittle,
      content: postf.content
    });
 
    }
  });
  
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
