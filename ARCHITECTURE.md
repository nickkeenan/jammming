# Components
* App
* Results
* Track
* TrackList
* Playlist
  removeFromPlayList()
  state {
    tracks: []
  }
  save()
* SearchBar
* SearchResults
  addToPlayList()



# Util

## Spotify
### https://developer.spotify.com/documentation/web-api/reference/search/search/
  * type = 'album,artist,track'
  * searchEndpoint: {'GET', https://api.spotify.com/v1/search}
  * login()  
    https://developer.spotify.com/documentation/web-api/quick-start/
  * search(q,type)  
