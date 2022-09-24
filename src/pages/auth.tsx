import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { Button } from '@mantine/core';

import FirebaseAuth from '../main/node/auth/FirebaseAuth';

const styles = {
  content: {
    padding: '8px 32px',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
};

function Auth() {
  return (
    <div style={styles.content}>
      <Button>Sign in</Button>
      <div style={styles.textContainer}>
        <p>
          This auth page is
          {' '}
          <b>static</b>
          . It will redirect on the client side if
          the user is already authenticated.
        </p>
      </div>
      <div>
        <FirebaseAuth />
      </div>
    </div>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
