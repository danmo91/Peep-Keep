import React from 'react'
import { History } from 'react-router'
import Auth from './../services/auth'
import Card from './../components/card/card'
import Input from './../components/form_elements/floating_label_input/floating_label_input'


let Login = React.createClass({
  mixins: [ History ],

  getInitialState() {
    return {
      error: null,
      email: '',
      password: ''
    }
  },

  handleEmailChange(e, cb) { this.setState({email: e.target.value}, () => cb()) },
  handlePasswordChange(e, cb) { this.setState({password: e.target.value}, () => cb()) },

  submitForm(e) {
    e.preventDefault();

    // login the user
    Auth.login( this.state.email, this.state.password, (loggedIn, error) => {
      if (loggedIn) {
        this.history.pushState(null, '/home', '');
      } else {
        this.setState(JSON.parse(error.responseText));
      }
    });

  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <Card>
              <div className="row">
                <div className="col-xs-12">
                  <h1 className="text-center">Login</h1>
                  <p className="text-center">{this.state.error}</p>
                  <form onSubmit={this.submitForm}>
                    <div className="form-group col-xs-12">
                      <Input
                        label="Email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleEmailChange} />
                    </div>
                    <div className="form-group col-xs-12">
                      <Input
                        label="Password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        type="password" />
                    </div>
                    <div className="form-group col-xs-12">
                      <input type="submit" className="btn btn-primary btn-red" value="Login" />
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

});

export default Login;
