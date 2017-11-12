var React = require('react');
var DefaultLayout = require('./layouts/default');

class Error extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div>Error</div>
      </DefaultLayout>
    );
  }
}

module.exports = Error;
