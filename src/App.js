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
      searchResults: [],
      selected: []
    }
    // TODO this.searchSpotify = this.searchSpotify.bind(this);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  handleChangeTitle(title) {
    this.state = { playlistName : title }
  }

  handleRemoveTrack(trackId, action, track) {
    const tracks = this.state.selected;
    for(var i = 0; i < tracks.length; i++){
      if (tracks[i] === track) {
        tracks.shift(i, 1);
      }
    }
    this.setState({ selected : tracks });
  }

  handleAddTrack(trackId, action, track) {
    const tracks = this.state.selected;
    const track_id = track.id;
    tracks.push(track);
    this.setState({ selected : tracks });
  }

  searchSpotify(term,searchType) {
    if (!this.state.userAccessToken) {
      const access_token = Spotify.getAccessToken();
      this.setState({ userAccessToken : access_token });
    } else {
      // Peform Search
      const tracksResult = Spotify.search(this.state.userAccessToken,term,searchType).then(tracksResult => {
        this.setState({ searchResults : tracksResult });
      });
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar searchSpotify={this.searchSpotify} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} userAccessToken={this.state.userAccessToken} handleAddTrack={this.handleAddTrack} />
          <Playlist trackList={this.state.selected} handleRemoveTrack={this.handleRemoveTrack} />
        </div>
      </div>
    );
  }
}

export default App;
