import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

// Note that next-firebase-auth inits Firebase for us,
// so we don't need to.

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/contacts.readonly',
      ],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account',
      },
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends',
      ],
      customParameters: {
        // Forces password re-entry.
        auth_type: 'reauthenticate',
      },
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // Other providers don't need to be given as object.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    signInSuccessWithAuthResult: () =>
      // Don't automatically redirect. We handle redirects using
      // `next-firebase-auth`.
      false,
  },
};

function FirebaseAuth() {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
}

export default FirebaseAuth;
