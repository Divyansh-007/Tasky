module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/home');
    }

    return res.render('home',{
        title: 'Tasky'
    });
}