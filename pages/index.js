import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { FaDungeon } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import dynamic from 'next/dynamic'
//import GoogleLoginButton from '../components/auth/GoogleLoginButton'
const GoogleLoginButton = dynamic(() => import('../components/auth/GoogleLoginButton'))

const Landing = () => {
  const router = useRouter()
  const [user, setUser] = useContext(UserContext)

  useEffect(()=>{
    if(user.email)router.push('/dashboard')
  },[user])

  const darkOverlay = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };

  const landing = {
    position: 'relative',
    background: "url('https://www.tribality.com/wp-content/uploads/2015/11/despair.jpg') no-repeat center center/cover",
    height: '100vh'
  };

  const landingInner = {
    color: '#fff',
    height: '100%',
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  };

  return (
    <section style={landing}>
      <div style={darkOverlay}>
        <div style={landingInner}>
          <h1 className="text-xl p-4">Remote Dungeon And Dragons</h1>
          <p>
            Play DND with friends.
            <br />
            Choose a campaign and embark on an epic adventure.
          </p>

          {/* <button
            onClick={() => {
             setUser({...user, email: 'dustyzietz@gmail.com'})
            }}
            className="text-black bg-white border py-1 px-2 m-4"
          > */}
           <GoogleLoginButton />  
            {/* <FaDungeon className="inline text-black " /> Login
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Landing;
