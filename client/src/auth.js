export default function isLoggedIn(event) {
  var loggedIn = false;
  if (event === 'logged in') {
    loggedIn = true;
  } else if (event === 'not logged in') {
    loggedIn = false;
  } else if (event === 'status') {
    return loggedIn;
  }
}