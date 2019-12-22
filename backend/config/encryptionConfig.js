// This is to just configure a Bcrypt Variable


module.exports  = {
    saltRounds: 9, 
    issuer: 'Athena-testing', 
    signOptions: {
        issuer:  "Athena Login Credentials",
        expiresIn:  "24h",
        algorithm:  "RS512"
    },
    verifyOptions: {
        issuer:  "Athena Login Credentials",
        expiresIn:  "24h",
        algorithm:  ["RS512"]
       }
}