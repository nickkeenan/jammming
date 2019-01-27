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

  handleTermChange(event) {
    this.setState({ q : event.target.value });
  }

  handleSearch(event) {
    console.log('handleSearch:');
    console.log(this.state);
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
