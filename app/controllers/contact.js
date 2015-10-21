var Contact = require('../models/contact');


// Create endpoint /api/contacts for POSTS
exports.postContacts = function(req, res) {
    var contact = new Contact(req.body);
    
      //contact.name = req.body.name;
      //contact.lastName = req.body.lastName;
      //contact.birthday= req.body.quantity;
      //contact.email = req.body.email;

      // Save the beer and check for errors
      contact.save(function(err) {
        if (err)
          res.send(err);

        Contact.find(function(err,contacts){
          if(err)
              res.send(err);
          res.json(contacts);
        });
      });
  };
  
  exports.getContacts =function(req,res){
      Contact.find(function(err,contacts){
          if(err)
              res.send(err);
          res.json(contacts);
      });
  };
  
  exports.getContact= function(req,res){
      Contact.findById(req.params.contact_id,function(err,contact){
          if(err)
              res.send(err);
          res.json(contact);
      });
  };
  
  exports.deleteContact= function(req,res){
      Contact.remove({ _id: req.params.contact_id }, function(err) {
       if (err)
         res.send(err);

       Contact.find(function(err,contacts){
          if(err)
              res.send(err);
          res.json(contacts);
      });
     });
  };