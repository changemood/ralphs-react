import React from 'react'
import {GoogleAPI, GoogleLogin} from 'react-google-oauth';

const googleSignIn = (props) => {
  return (
    <GoogleAPI className="GoogleLogin" clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div>
        <GoogleLogin height="10"
                     width="100%"
                     backgroundColor="#4285f4"
                     access="offline"
                     scope="email profile"
                     onLoginSuccess={props.responseGoogle}
                     onFailure={props.responseGoogle}
                     text={props.text}/>
      </div>
    </GoogleAPI>
  )
}

export default googleSignIn;