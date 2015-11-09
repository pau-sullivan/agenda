

var contactController = require('../app/controllers/contact');
// expose the routes to our app with module.exports
module.exports = function(app, router) {
    
    router.route('/contacts')
      .post(contactController.postContacts)
      .get(contactController.getContacts);

    router.route('/contacts/:contact_id')
       .get(contactController.getContact)
       .put(contactController.putContact)
       .delete(contactController.deleteContact);


    // Register all our routes with /api
    app.use('/api', router);


    var path = require('path');

    // application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile(path.resolve('./public/index.html'));
        //res.sendFile(__dirname + '/public/index.html');
    });

    //var webRoutes=require(path.resolve(__dirname + '/public'));
    app.get('*',function(req,res){

        var dir= __dirname.toString().replace('app','');
        res.sendFile(dir + '/public/' + req.url);
    });
};