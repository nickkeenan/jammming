import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList trackList={this.props.searchResults} action='add' />
      </div>
    );
  }
};

export default SearchResults;
