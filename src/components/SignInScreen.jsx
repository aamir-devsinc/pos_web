import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInUser } from '../redux-token-auth-config'
import { Button, Checkbox, Form, Grid, Header, Image } from 'semantic-ui-react'
 // <-- note this is YOUR file, not the redux-token-auth NPM module

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  submitForm = (e) => {
    e.preventDefault();
    const { signInUser } = this.props;
    const {
      email,
      password
    } = this.state;
    signInUser({email, password}).then((resp) => {
      console.log("Logged In now.");
    }).catch((error) => {
      console.log('error is', error);
    });
  }

  render() {
    const { submitForm } = this;
    return (
      <Grid columns={3} divided>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <Header as='h2'>
            <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> Signin Form
          </Header>
          <br/>
          <Form onSubmit={submitForm}>
            <Form.Field>
              <label>Email</label>
              <br/>
              <input type="text" name="email" onChange={this.onChange} value={this.state.email} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <br/>
              <input type="password" name="password" onChange={this.onChange} value={this.state.password} />
            </Form.Field>
            <Button type='submit'>LOGIN</Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid>

    );
  }
}

export default connect(
  null,
  { signInUser },
)(SignInScreen)
