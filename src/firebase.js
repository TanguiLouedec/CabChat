
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // make sure you import storage
import { firebaseConfig } from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage(); // initialize storage

export { auth, firestore, storage };
