// This is to just configure a Bcrypt Variable


module.exports  = {
<<<<<<< HEAD
    saltRounds: 3, 
    issuer: 'Athena-testing', 
    signOptions: {
        issuer:  "Athena Login Credentials",
=======
    saltRounds: 9, 
    issuer: 'Athena-testing', 
    signOptions: {
        issuer:  "Athena-testing",
>>>>>>> archivable/master
        expiresIn:  "24h",
        algorithm:  "RS512"
    },
    verifyOptions: {
<<<<<<< HEAD
        issuer:  "Athena Login Credentials",
=======
        issuer:  "Athena-testing",
>>>>>>> archivable/master
        expiresIn:  "24h",
        algorithm:  ["RS512"]
       }
}