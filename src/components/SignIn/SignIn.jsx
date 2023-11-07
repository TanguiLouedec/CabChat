import React from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase/compat/app';

function SignIn() {
const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};

return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
);
}

export default SignIn;
