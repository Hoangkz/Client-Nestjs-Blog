import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId="258973467365-5tkd75mps3ktb0a6k8cl4q5gv32u9krp.apps.googleusercontent.com"
      >
        <div>
          <GoogleLogin
            onSuccess={(googleUser) => console.log(googleUser)}
            onFailure={(error) => console.log(error)}

          />
        </div>

      </GoogleOAuthProvider>
    </>
  );
};

export default App;
