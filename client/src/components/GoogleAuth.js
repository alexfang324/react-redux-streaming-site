import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { CLIENTID } from '../GoogleClientId';

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    //download the auth2 functions from google api js library gapi. gapi was added
    //in the index.html file. Then initialize an OAuth2 request
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: CLIENTID,
          scope: 'email',
          plugin_name: 'streamy' //arbitrary plugin name
        })
        .then(() => {
          const _auth = window.gapi.auth2.getAuthInstance();

          const onAuthChange = () => {
            if (_auth.isSignedIn.get()) {
              signIn(_auth.currentUser.get().getId());
            } else {
              signOut();
            }
          };

          onAuthChange();
          _auth.isSignedIn.listen(onAuthChange);
          setAuth(_auth);
        });
    });
  }, []);

  //sign in with google using GAPI
  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = [
    isSignedIn === null && null,
    isSignedIn === true && (
      <button
        onClick={() => onSignOutClick()}
        className="ui blue google button"
      >
        <i className="google icon" />
        Sign Out
      </button>
    ),
    isSignedIn === false && (
      <button onClick={() => onSignInClick()} className="ui blue google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    )
  ];

  return <div>{renderAuthButton.filter(Boolean)[0]}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
