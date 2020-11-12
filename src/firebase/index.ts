import firebase from 'firebase/app';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMfA-9A_4CXKYvlK1mcRJYZtwi-ZbpRHE',
  authDomain: 'dead-or-alive-92a28.firebaseapp.com',
  databaseURL: 'https://dead-or-alive-92a28.firebaseio.com',
  projectId: 'dead-or-alive-92a28',
  storageBucket: 'dead-or-alive-92a28.appspot.com',
  messagingSenderId: '547832096544',
  appId: '1:547832096544:web:c4e452968637301e861945',
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore };
