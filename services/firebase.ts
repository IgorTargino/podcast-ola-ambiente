import firebase from 'firebase/app'

import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCaS3g6Jh3Q-UshOHFI7s1yfcgxNN48OcI',
  authDomain: 'podcast-olamundo.firebaseapp.com',
  projectId: 'podcast-olamundo',
  storageBucket: 'podcast-olamundo.appspot.com',
  messagingSenderId: '132042153547',
  appId: '1:132042153547:web:e890238e22455788e537ce',
  measurementId: 'G-8XMQZBT2VZ',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { firebase, db }
