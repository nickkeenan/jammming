const client_id = '3b090e63b75f4471b1919d56fc02e9af'; // Your client id
const redirect_uri = 'localhost:3000'; // Your redirect uri

const accessToken = false;

function Spotify() {

  var stateKey = 'spotify_auth_state';



  /*
    * Obtains parameters from the hash of the URL
    * @return Object
    */
  this.getHashParams = () => {
   let hashParams = {};
   let e, r = /([^&;=]+)=?([^&;]*)/g,
       q = window.location.hash.substring(1);
   while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
   }
   return hashParams;
  }

  /*
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  this.generateRandomString = length => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  this.getAccessToken = () => {
    if (access_token && (state == null || state !== storedState)) {
      alert('There was an error during the authentication');
    } else {
      localStorage.removeItem(stateKey);
      if (access_token) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              userProfilePlaceholder.innerHTML = userProfileTemplate(response);
              $('#login').hide();
              $('#loggedin').show();
            }
        });
      } else {
          $('#login').show();
          $('#loggedin').hide();
      }
      document.getElementById('login-button').addEventListener('click', function() {
        var client_id = '3b090e63b75f4471b1919d56fc02e9af'; // Your client id
        var redirect_uri = 'REDIRECT_URI'; // Your redirect uri
        var state = generateRandomString(16);
        localStorage.setItem(stateKey, state);
        var scope = 'user-read-private user-read-email';
        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        window.location = url;
      }, false);
    }
  }

  var params = getHashParams();
  var access_token = params.access_token,
      state = params.state,
      storedState = localStorage.getItem(stateKey);




}

module.exports = Spotify;
