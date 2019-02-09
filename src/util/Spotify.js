const client_id = '3b090e63b75f4471b1919d56fc02e9af'; // Your client id
const redirect_uri = 'http://localhost:3000'; // Your redirect uri

const Spotify = {
  getHashParams() {
    /*
      * Obtains parameters from the hash of the URL
      * @return Object
      */
   let hashParams = {};
   let e, r = /([^&;=]+)=?([^&;]*)/g,
       q = window.location.hash.substring(1);
   while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
   }
   return hashParams;
  },
  generateRandomString(length){
    /*
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  getAccessToken(){
    const params = this.getHashParams();
    const access_token = params.access_token;
    const state = params.state;
    const stateKey = 'spotify_auth_state';

    const storedState = localStorage.getItem(stateKey);

    if (access_token) {
      return access_token
    } else {

      // check if the access_token is stored

      const state = this.generateRandomString(16);
      localStorage.setItem(stateKey, state);
      const scope = 'user-read-private user-read-email';
      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + redirect_uri;
      url += '&state=' + encodeURIComponent(state);
      window.location = url;
    }
  },
  search(userAccessToken,term,searchType) {
    let url = 'https://api.spotify.com/v1/search';
    return fetch(`${url}?q=${term}&type=${searchType}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name
          }
        });
      }
    });
  }

}

export default Spotify;
