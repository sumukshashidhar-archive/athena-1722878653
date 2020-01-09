var middle = require('./controllers/bcrypt-hasher')


async function testAsync() {
    
    var toPrint = await middle.compareme('hello', '$2b$09$WGMmLCcabAt5t2ofKMCwbe.aIenSP/HUfvpOZR7nQyuyU3ZRNP6gC' )
    console.log(toPrint)
}

testAsync();