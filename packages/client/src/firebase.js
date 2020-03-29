import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyD1TdScq3u1vdGLVa_FfiZrnSmnN4ZMaGc',
  authDomain: 'font-frog.firebaseapp.com',
  databaseURL: 'https://font-frog.firebaseio.com',
  projectId: 'font-frog',
  storageBucket: 'font-frog.appspot.com',
  messagingSenderId: '11575660460',
  appId: '1:11575660460:web:0733ab708f628690adb409',
  measurementId: 'G-E44Y9D1TTJ'
};

firebase.initializeApp(config);
export default firebase;
