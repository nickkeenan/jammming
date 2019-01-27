import React, { Component } from 'react';
import SearchResults from './components/SearchResults/SearchResults';
import SearchBar from './components/SearchBar/SearchBar';
import Playlist from './components/Playlist/Playlist';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      playlistName: 'New Playlist',
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
  }

  render() {
    return (
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} />
          <Playlist trackList={this.state.selected} name={this.state.playlistName}/>
        </div>
      </div>
    );
  }
}

export default App;
