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
      searchResults: [
        {
          id: '23c9gmiiv7RCu7twft0Mym?si=eEYJE4NCR_CHG55tvjpsYQ',
          name: 'Who Hurt You?',
          artist: 'Daniel Caesar',
          album: 'Freudian'
        },
        {
          id: '23c9gmiiv7RCu7twft0Mym?si=eEYJE4NCR_CHG55tvjpsYA',
          name: 'Nights Like This',
          artist: 'Kehlani & Ty Dolla $ign',
          album: 'Nights Like This'
        }
      ],
      selected: [
        {
          id: '23c9gmiiv7RCu7twft0Mym?si=eEYJE4NCR_CHG55tvjpsYC',
          name: 'A Sunday Smile',
          artist: 'Beirut',
          album: 'Riptide'
        },
        {
          id: '23c9gmiiv7RCu7twft0Mym?si=eEYJE4NCR_CHG55tvjpsYB',
          name: 'Take a Picture',
          artist: 'Filter',
          album: 'Title of Record'
        }
      ]
    }
    // TODO this.searchSpotify = this.searchSpotify.bind(this);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }



  searchSpotify() {

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
      console.log(this.state.userAccessToken);
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
