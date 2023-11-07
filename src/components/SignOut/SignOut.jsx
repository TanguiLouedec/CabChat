import './SignOut.css'

import React from 'react';
import { auth } from '../../firebase';

function SignOut() {
return auth.currentUser && (
    <button className='signOutBtn'  onClick={() => auth.signOut()}>Sign out</button>
);
}

export default SignOut;
