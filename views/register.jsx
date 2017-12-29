var React = require('react');
var DefaultLayout = require('./layouts/default');

class Register extends React.Component {
  render() {

    if(this.props.errors){
      var err = this.props.errors.map(function(err, i){
        console.log(err.msg);
        return (<div className='alert alert-danger' key={i} >{err.msg}</div>);
      });
    }
    return (

      <DefaultLayout>

<h2 className="page-header"> Register </h2>
<div className="alert alert-danger"></div>
{err}
      <form method="post" action="/users/register">
   <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" placeholder="Name" name="name"  required/>
  </div>
  <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" placeholder="Username" name="username" required />
  </div>
   <div className="form-group">
    <label>Email</label>
    <input type="email" className="form-control" placeholder="Email" name="email"  required/>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password"  required/>
  </div>
  <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password2"  required/>
  </div>
  <button type="submit" className="btn btn-default">Submit</button>
</form>

      </DefaultLayout>
    );
  }
}

module.exports = Register;
