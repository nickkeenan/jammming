import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {
      term: '',
      searchType: 'album,artist,track'
    };
  }

  handleTermChange(event) {
    this.setState({ term : event.target.value });
  }

  handleSearch(event) {
    this.props.searchSpotify(this.state.term, this.state.searchType);
    event.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song Title" />
        <button href="#" onClick={this.handleSearch}>SEARCH</button>
      </div>
    );
  }
};

export default SearchBar;
