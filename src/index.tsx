import ReactDOM from 'react-dom'
//import './index.css'
import './styles/global.css'
import UAuth from '@uauth/js'
import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom'
import Navhan from './Nav'
//import App from './index'
require('dotenv').config();

const uauth = new UAuth({
  // These can be copied from the bottom of your app's configuration page on unstoppabledomains.com.
  clientID: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,//process.env.REACT_APP_CLIENT_SECRET,

  // These are the scopes your app is requesting from the ud server.
  scope: 'openid email wallet ',

  // This is the url that the auth server will redirect back to after every authorization attempt.
  redirectUri: process.env.REACT_APP_CLIENT_REDIRECT_URL,

  // This is the url that the auth server will redirect back to after logging out.
  postLogoutRedirectUri: process.env.REACT_APP_CLIENT_PL_REDIRECT_URL,
})

const Home: React.FC<RouteProps> = props => {
  const [redirectTo, setRedirectTo] = useState<string>()

  useEffect(() => {
    // Try to access the id_token inside `window.localStorage`
    uauth
      .user()
      // User is inside cache, redirect to the profile page.
      .then(user => {
        console.log('user ->', user)
        setRedirectTo('/profile')
      })
      // User is not inside cache, redirect to the login page.
      .catch(error => {
        console.error(error)
        setRedirectTo('/login')
      })
  }, [])

  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  return <> <h1 className='text-3xl flex flex-wrap justify-center items-center h-screen'>Loading...</h1>
  <h1 className='text-3xl flex flex-wrap justify-center items-center h-screen'>Logging in...</h1>
  </>
}

const Login: React.FC<RouteProps> = props => {
  const [errorMessage, setErrorMessage] = useState<string | null>(
    new URLSearchParams(props.location?.search || '').get('error'),
  )

  const handleLoginButtonClick: React.MouseEventHandler<HTMLButtonElement> =
    e => {
      setErrorMessage(null)
      uauth.login().catch(error => {
        console.error('login error:', error)
        setErrorMessage('User failed to login.')
      })
    }

  return (
    <>
    <div className='flex justify-center items-center'>
      <div>
        <h1 className='text-4xl flex justify-center items-center'><u>UNSTOPPABLE NFT</u></h1>
        <br></br>
        <br></br>
        <div className="text-2xl ">
        <br></br>
          <li>&nbsp; Welocme to Unstoppable NFT. </li>
          <br></br>
          <li>&nbsp; Inspired by token-gating,This is a Domain-Gated Application. </li>
          <br></br>
          <li>&nbsp; Were the application can only be accessed by any body  </li>
          
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; with a valid UNSTOPPABLE DOMAIN name. </p>
          <br></br>
          <li>&nbsp;If you dont have one you can head <a href='https://unstoppabledomains.com/'>here!</a> to purchase one. </li>
          <br></br>
          <li> &nbsp;If you do have one, login in with unstoppable and join the fun.</li>
          <br></br>
      <br></br>
      </div>
      </div>
      <br></br>
    </div>
    <div className='flex flex-wrap justify-center items-center '>
    <br></br>
    {errorMessage && <div>Message: {errorMessage}</div>}
    <br></br>
    </div>
    
     <div className='flex flex-wrap justify-center items-center '>
     <br></br>
     <br></br>
    <Button variant="contained" color="primary"  onClick={handleLoginButtonClick} className="">Login with Unstoppable</Button>
    </div>
    </>
  )
}

const Callback: React.FC<RouteProps> = props => {
  const [redirectTo, setRedirectTo] = useState<string>()

  useEffect(() => {
    // Try to exchange authorization code for access and id tokens.
    uauth
      .loginCallback()
     
      // Successfully logged and cached user in `window.localStorage`
      .then(response => {
        console.log("sucess")
        console.log('loginCallback ->', response)
        setRedirectTo('/profile')
      })
      // Failed to exchange authorization code for token.
      .catch(error => {
        console.error('callback error:', error)
        setRedirectTo('/login?error=' + error.message)
      })
  }, [])

  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  return <> <h1 className='text-3xl flex flex-wrap justify-center items-center h-screen'>Loading...</h1>
  <br></br>
  <h1 className='text-3xl flex flex-wrap justify-center items-center h-screen'>Logging in...</h1>
  </>
}

const Profile: React.FC<RouteProps> = () => {
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [redirectTo, setRedirectTo] = useState<string>()

  useEffect(() => {
    uauth
      .user()
      .then(setUser)
      .catch(error => {
        console.error('profile error:', error)
        setRedirectTo('/login?error=' + error.message)
      })
  }, [])

  const handleLogoutButtonClick: React.MouseEventHandler<HTMLButtonElement> =
    e => {
      console.log('logging out!')
      setLoading(true)
      uauth
        .logout({
          beforeRedirect(url: string) {
            // alert(url)
          },
        })
        .catch(error => {
          console.error('profile error:', error)
          setLoading(false)
        })
    }

  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  if (!user || loading) {
    return <> <h1 className='text-3xl flex flex-wrap justify-center items-center h-screen'>Loading...</h1>
    <h1 className='text-3xl flex flex-wrap justify-center items-center h-screen'>Logging out...</h1>
    </>
  }
  

  return (
    <>
    {console.log(JSON.stringify(user, null, 2))}
        
    <div className = "overflow-visible">
      <div className='flex flex-row'>
    <Button variant="contained" color="primary"  onClick={handleLogoutButtonClick} className="w-28">Logout</Button>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
    <p className='text-xl '>Logged in as:<strong> {user.sub} </strong> with the address: <strong> {user.wallet_address} </strong></p>
    
    </div>
    </div>
    <div>
    <Navhan/>
    </div>
     {/*<MyApp Component={undefined} pageProps={undefined}/>*/}
      {/*<pre>{JSON.stringify(user, null, 2)}</pre>*/}
      
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
         <Switch>
        <Route path="/login" component={Login} />
        <Route path="/callback" component={Callback} />
        <Route path="/profile" component={Profile} />
         <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)