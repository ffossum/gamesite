import React from 'react';
import { Link } from 'react-router';

export default class Play extends React.Component {
  render() {
    return (
    <div>
      <h1>Play</h1>
      <Link to="/create">Create game</Link>
    </div>
    );
  }
}
