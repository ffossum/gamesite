import React, { PropTypes } from 'react';

export default class UserSettings extends React.Component {
  render() {
    return (
      <article>
        <header>
          <h2>Settings</h2>
        </header>
        <div>
          <nav>
          </nav>
          <section>
            Coming soon
          </section>
        </div>
      </article>
    );
  }
}

UserSettings.propTypes = {
  user: PropTypes.object,
};
