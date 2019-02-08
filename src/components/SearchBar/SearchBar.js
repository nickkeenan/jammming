import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {
      q: '',
      searchType: 'album,artist,track'
    }
  }

  handleAddTrack(event) {
    console.log('handle Remove Track');
  }

  handleRemoveTrack(event) {
    console.log('handle Remove Track');
  }

  handleTermChange(event) {
    this.setState({ q : event.target.value });
  }

  handleSearch(event) {
    if (this.props.userIsLoggedIn) {
      console.log('handleSearch:');
      console.log(this.state);
    } else {
      console.log('log the user in');
    }

    // this.props.searchSpotify(this.state.q, this.state.searchType);
    // event.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange} />
        <a href="#" onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
};

export default SearchBar;
