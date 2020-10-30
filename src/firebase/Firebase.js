import 'firebase/firestore';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB2D-YXfeYzA6Vdfpnb1p9F7nLV-dzDCJ4",
    authDomain: "mm-project-500dc.firebaseapp.com",
    databaseURL: "https://mm-project-500dc.firebaseio.com",
    projectId: "mm-project-500dc",
    storageBucket: "mm-project-500dc.appspot.com",
    messagingSenderId: "416216361413",
    appId: "1:416216361413:web:549d302510c6c985bfc3ac",
    measurementId: "G-ZLQFYCNWS5"
};

firebase.initializeApp(config);

export default firebase;