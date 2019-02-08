import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(trackId,action) {
    this.props.onChange(trackId,action);
  }

  render() {
    return (
      <div className="TrackList">
        {this.props.trackList.map((track) => {
          return <Track track={track} action={this.props.action} key={track.id} onAction={this.handleChange} /> ;
        })}
      </div>
    );
  }
};

export default TrackList;
