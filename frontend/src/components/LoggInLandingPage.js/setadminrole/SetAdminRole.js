// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Provide path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});


const uid = 'OnPTyXDhlfd5qyNeetMudwe6lRv1'; 

admin.auth().setCustomUserClaims(uid, { role: 'admin' })
  .then(() => {
    console.log('Custom claim set successfully');
  })
  .catch((error) => {
    console.error('Error setting custom claim:', error);
  });
