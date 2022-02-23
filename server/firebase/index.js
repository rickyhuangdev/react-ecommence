let admin = require("firebase-admin");

let serviceAccount = require("../config/firebaseAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
module.exports = admin
