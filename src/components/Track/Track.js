import React from 'react';
import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.handleModifyPlaylist = this.handleModifyPlaylist.bind(this);
  }

  handleModifyPlaylist(event) {
    if (this.props.action == 'add') {
      console.log('add track to playlist');
    } else {
      console.log('remove track from playlist');
    }
    event.preventDefault();
  }

  render() {
    console.log('Track/Render')
    console.log(this.props);
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" href="#" onClick={this.handleModifyPlaylist}>{(this.props.action == 'add') ? '+' : '-'}</a>
      </div>
    )
  }
}

export default Track;
