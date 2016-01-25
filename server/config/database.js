module.exports = {
    //host: process.env.DB_HOST || '192.241.228.107', // public traffic -Digital Ocean
    host: process.env.DB_HOST || '10.134.0.35' //local traffic -Digital Ocean
    //host: 'localhost',
    port: process.env.DB_PORT || 28015,
    authKey: process.env.AUTH_KEY || '',
    db: process.env.DB_NAME || 'hawaiiQpons'
}