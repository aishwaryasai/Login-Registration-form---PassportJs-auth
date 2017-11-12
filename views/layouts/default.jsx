var React = require('react');

class DefaultLayout extends React.Component {

  render() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </head>
        <body>

          <div className="container">
                <div className="header clearfix">
                  <nav>
                    <ul className="nav nav-pills pull-right">


                        <li role="presentation"><a href="/users/login">Login</a></li>
                        <li role="presentation"><a href="/users/register">Register</a></li>

                    </ul>
                  </nav>
                  <h3 className="text-muted">Simple Login form</h3>
                </div>
              </div>





         {this.props.children}



        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
