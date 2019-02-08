import React from 'react';
import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handlePlaylistRequest(this.props.track.trackid,this.props.action, this.props.track);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Track" >
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" data-trackid={this.props.track.id} href="#" onClick={this.handleChange}>{(this.props.action == 'add') ? '+' : '-'}</a>
      </div>
    )
  }
}

export default Track;
