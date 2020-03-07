// IMPORTS
    const express = require(`express`)
    const app = express()


// CONFIG
    // MIDDLEWARES
        app.use(express.static(__dirname + '/public')) // Using the public folder








// PORT CONFIG
    const PORT = process.env.PORT || 8090
    app.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })