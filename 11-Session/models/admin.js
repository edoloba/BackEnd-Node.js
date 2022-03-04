const adminHome = (req, res) => {
    // checker for the session. If user exists then /admin
    if(req.session.user){
        res.render('admin')
    } else {
        res.redirect('/login')
    }
}

const logOut = (req, res) => {
    // destroy session means = remove all values(username password in this case) from the session
    req.session.destroy();
    res.redirect('/login')
}

const logOutBtn = (req, res) => {
        req.session.destroy()
        res.json('done')
}
module.exports = {
    adminHome,
    logOut,
    logOutBtn
}