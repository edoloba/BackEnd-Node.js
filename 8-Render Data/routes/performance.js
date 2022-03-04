const express =  require('express')
const os = require('os')
const router = express.Router()

router.get('/', (req, res)=>{
    let info = {
        time: new Date(),
        freemem: os.freemem,
        cpus: os.cpus(),
        node_version: process.version,
        os_version: os.version()
    }
    res.render('content/performance', info)
})


module.exports = router