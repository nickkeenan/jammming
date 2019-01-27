import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {

  render() {
    return (
      <div className="TrackList">
        {this.props.trackList.map((track) => {
          return <Track track={track} action={this.props.action} key={track.id} /> ;
        })}
      </div>
    );
  }
};

export default TrackList;
