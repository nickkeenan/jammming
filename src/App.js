import React, { Component } from 'react';
import SearchResults from './components/SearchResults/SearchResults';
import SearchBar from './components/SearchBar/SearchBar';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      userAccessToken: false,
      userId: false,
      playlistId: false,
      searchResults: [],
      selected: [],
      saveButtonText: 'SAVE TO SPOTIFY'
    };
    // TODO this.searchSpotify = this.searchSpotify.bind(this);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.saveToSpotify = this.saveToSpotify.bind(this);
  }

  handleChangeTitle(title) {
    this.setState({ playlistName : title, saveButtonText: 'SAVE TO SPOTIFY'});
  }

  handleRemoveTrack(trackId, action, track) {
    const tracks = this.state.selected;
    for(var i = 0; i < tracks.length; i++){
      if (tracks[i] === track) {
        tracks.shift(i, 1);
      }
    }
    this.setState({ selected : tracks, saveButtonText: 'SAVE TO SPOTIFY' });
  }

  handleAddTrack(trackId, action, track) {
    const tracks = this.state.selected;
    tracks.push(track);
    this.setState({ selected : tracks, saveButtonText: 'SAVE TO SPOTIFY' });
  }

  searchSpotify(term,searchType) {
    if (!this.state.userAccessToken || !this.state.userId) {
      // Get User Token and ID
      const access_token = Spotify.getAccessToken();
      Spotify.getUserId(access_token).then(userId => {
        this.setState({
          userAccessToken : access_token,
          userId : userId,
          saveButtonText: 'SAVE TO SPOTIFY'
        });
      });
    } else {
      if (term) {
        // Perform Search
        Spotify.search(this.state.userAccessToken,term,searchType).then(tracksResult => {
          this.setState({ searchResults : tracksResult, saveButtonText : 'SAVE TO SPOTIFY' });
        });
      } else {
        this.setState({ searchResults : [] });
      }
    }
  }

  saveToSpotify(playlistName) {
    if (this.state.selected.length > 0) {
      Spotify.createPlaylist(this.state.userAccessToken,this.state.userId,playlistName).then(playlistId => {
        if (!playlistId) {
          this.setState({ saveButtonText : 'ERROR SAVING' });
        } else {
          // build an array of Spotify uris
          const tracks = this.state.selected.map(track => {
            return track.uri;
          });
          Spotify.addTracksToPlaylist(this.state.userAccessToken,playlistId,tracks).then(snapshot_id => {
            if (snapshot_id) {
              this.setState({ selected : [], playlistName : 'New Playlist', saveButtonText : 'PLAYLIST SAVED'} );
            } else {
              this.setState({ saveButtonText : 'ERROR SAVING' });
            }
          });
        }
      });
    } else {
      this.setState({ saveButtonText : 'ADD SOME TRACKS' });
    }

  }

  render() {
    return (
      <div className="App">
        <SearchBar searchSpotify={this.searchSpotify} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} userAccessToken={this.state.userAccessToken} handleAddTrack={this.handleAddTrack} />
          <Playlist trackList={this.state.selected} handleRemoveTrack={this.handleRemoveTrack} handleSavePlaylist={this.saveToSpotify} saveButtonText={this.state.saveButtonText} />
        </div>
      </div>
    );
  }
}

export default App;
