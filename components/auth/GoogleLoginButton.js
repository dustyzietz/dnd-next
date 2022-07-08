import React, {useContext} from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-google-login';
import { UserContext } from '../../context/UserContext';


const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

const GoogleLoginButton = () => {
  const [user, setUser] = useContext(UserContext)

  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    setUser({...user, email: res.profileObj.email})
  }
  
  const onFailure = (res) => {
    console.log('[Login Failure] res:', res)
  }


  return <div >
    <GoogleLogin
        render={renderProps => (
          <button  className="text-black bg-white border py-1 px-2 " onClick={renderProps.onClick} ><FcGoogle className='inline h-5 w-5'/> Login</button>
        )}
    clientId={clientId}
    buttonText="Login"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={false}
  />
  </div>;
};


export default GoogleLoginButton;