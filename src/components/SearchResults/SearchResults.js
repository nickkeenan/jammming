import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddTrack = this.handleAddTrack.bind(this);
  }

  handleAddTrack(trackId,action,track) {
    this.props.handleAddTrack(trackId,action,track);
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList trackList={this.props.searchResults} action='add' handlePlaylistRequest={this.handleAddTrack} />
      </div>
    );
  }
};

export default SearchResults;
