

// REQUEST HANDLER FOR THE LOG IN 
const logIn = (req, res) => {
    if(req.session.user){
        res.redirect('/admin')
    }else {
        res.render('login')
    }
    
};

const logInPost = (req, res) => {
    // write te code to check if  sent data [username, password]
    // matches the following ['admin', admin]
    // if matches res.json('done');
    // else res.json('error')
    if(req.body.username === 'admin' && req.body.password === 'admin'){
        // fill session with some data
        req.session.user = {
            username: 'admin'
        }
        // console.log(res.json());
        console.log('done');
        res.json('done');
    } else {
        console.log('error');
        res.json('error')
    }
}

module.exports = {
    logIn, 
    logInPost
}