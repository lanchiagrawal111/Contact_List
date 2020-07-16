const express=require('express');
const path=require('path');
const app=express();
const port=8000;


//require mongoose
const db=require('./config/mongoose');
//require collection
const Contact=require('./models/contact');

//To set template engine is ejs
app.set('view engine','ejs');

//To join path, __dirname give current directory then /views join into it.
//console.log(path.join(__dirname,'views'));

// set views,the path provided.
app.set('views',path.join(__dirname,'views'));

//encoded forn data that is submitted,before pushing it into array first encode it
app.use(express.urlencoded());



// To include static files, like css js or images use express.static( ) function
app.use(express.static('assests'));

//List of contact
/*
var contactList=[
{
  name:"Lanchi",
  phone:8279353979
},
{
  name:"Pooja",
  phone:9045022822
},
{
  name:"Gomsi",
  phone:7906565898
},
{
  name:"Kana",
  phone:639665010
}
];
*/




// used to give response on specified request
app.get('/',function (req,res) {
  //  res.send('Cool it is running');
  //  res.send('<h1> Wow,Also Detecting html </h1>');
      Contact.find({},function (err,contacts){
        if(err){
          console.log('Error in fetching contacts from database');
          return;
        }
        res.render('home',{
        title:"Contact List",
        contact_list:contacts
       });
     });
});

// post request when user send data from browser to server
/*app.post('/create-contact',function (req,res) {
      console.log(req.body);
      // Push conatct Only if it does not exist
      let phone=req.body.phone;
      let contactIndex=contactList.findIndex((contact)=>contact.phone==phone);
       if(contactIndex==-1)
      contactList.push(req.body);
       else
        console.log("Sorry This number already exist");
      return res.redirect('back');
  
});*/
// push conatct in database
app.post('/create-contact',function (req,res) {
       Contact.create({
         name:req.body.name,
         phone:req.body.phone
       },function (err,newContact) {
            if(err){
              console.log('Error in creating a database');
              return;
            }
            console.log('*******',newContact);
            return res.redirect('back');
       });
});
app.get('/delete-contact',function(req,res) {
          //console.log(req.query);
          // get the id from query in the url
          let id=req.query.id;
          /*
          let contactIndex=contactList.findIndex((contact)=>contact.phone==phone);
              //console.log(contact);
              //console.log(contactIndex);
              if(contactIndex!=-1)
               contactList.splice(contactIndex,1);
              return res.redirect('back');
            */  
           // find the contact in the database using id and delete it.contact 
           Contact.findByIdAndDelete(id,function(err) {
             if(err){
               console.log('Error in deleting the object from database');
               return;
             }

             return res.redirect('back');
             
           });
          });
          
         






// listen on port no 8000
app.listen(port,(err)=> {   
    if(err){
      return console.log('Error in running the server',err);
    }
     console.log('Yup ,My Express Server is running on port:',port);
});
