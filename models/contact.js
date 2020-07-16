const mongoose=require('mongoose');
//create schema
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }    
});
//create collection
const Contact=mongoose.model('Contact',contactSchema);
// export 
module.exports=Contact;

