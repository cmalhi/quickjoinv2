import { authApp } from './App';

export default function isLoggedIn(event) {
  var loggedIn = false;
  if (event === 'logged in') {
    loggedIn = true;
    authApp('logged in')
  } else if (event === 'not logged in') {
    loggedIn = false;
    authApp('not logged in')
  } else if (event === 'status') {
    return loggedIn;
  }
}