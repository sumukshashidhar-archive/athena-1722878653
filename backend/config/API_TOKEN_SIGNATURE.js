//To sign given API Keys


module.exports = {
    signature: {
        issuer: "Athena API Key Generation", 
        expiresIn: "1h", 
        algorithm: "RS512"
    }, 
    verification: {
        issuer: "Athena API Key Generation", 
        expiresIn: "1h", 
        algorithm: ["RS512"]
    }
}