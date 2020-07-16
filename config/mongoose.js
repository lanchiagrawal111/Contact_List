const mongoose=require('mongoose');
//connect to the database
mongoose.connect("mongodb://localhost/contact_list_db", {
  useNewUrlParser: true,
});
//acquire the connection(to check if it is successful)
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'error connectng to db'));
//up and running then print message
db.once('open',function () {
    
    console.log('Successfully connected to database');
});

