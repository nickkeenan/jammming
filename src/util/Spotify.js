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

    if (access_token) {
      return access_token;
    } else {

      // check if the access_token is stored
      const state = this.generateRandomString(16);
      // localStorage.setItem(stateKey, state);
      const scope = 'playlist-modify-public playlist-modify-private';
      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + redirect_uri;
      url += '&state=' + encodeURIComponent(state);
      window.location = url;
    }
  },

  getUserId(userAccessToken) {
    let url = `https://api.spotify.com/v1/me`;
    return fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.id) {
        return jsonResponse.id;
      }
    });
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
            uri: track.uri,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name
          };
        });
      }
    });
  },

  createPlaylist(userAccessToken,userId,playlistName) {
    let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = {
      name : playlistName
    };
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.id) {
        return jsonResponse.id;
      }
    });
  },

  addTracksToPlaylist(userAccessToken,playlistId,tracks) {
    let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const data = {
      uris : tracks
    };
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.snapshot_id) {
        return jsonResponse.snapshot_id;
      } else {
        return false;
      }
    });
  }

};

export default Spotify;
