// This is to just configure a Bcrypt Variable


module.exports  = {
    saltRounds: 9, 
    issuer: 'Athena-testing', 
    signOptions: {
        issuer:  "Athena-testing",
        expiresIn:  "24h",
        algorithm:  "RS512"
    },
    verifyOptions: {
        issuer:  "Athena-testing",
        expiresIn:  "24h",
        algorithm:  ["RS512"]
       }
}