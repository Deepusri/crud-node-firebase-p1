const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./creds.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {db}