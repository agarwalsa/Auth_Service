const express = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();
const prepareandstartserver = () => {
    app.listen(PORT,()=>{
        console.log(`server started on port : ${PORT}`);
    })
}
prepareandstartserver();