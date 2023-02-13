import React ,{ Component } from "react";
import { authFirebase } from "../config/firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { checkDataLogin, firebaseLogout } from "../action/autentication";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';




import logo from '../components/images/echamp.png';
import { connect } from 'react-redux'



import styles from '../styles/login.module.css'
import Link from "next/link";

const auth = getAuth();

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleLogin = () => {
    console.log(this.state);
        
        this.setState({flagginglogin:true})
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        if(!user.emailVerified){
          alert("Akun ini belum verifikasi email")
          // firebaseLogout()
        }else{
        }
        localStorage.setItem('jwt-token', user.accessToken)
        localStorage.setItem('UID', user.uid)
        window.location.href = '/'
        console.log(user.uid)
        console.log(localStorage);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  
  render() {
    return (
      
        <div className="show-grid modal_body">
          <Container>
            <Row>
              <Col md={6} className="row_left">
              </Col>
              <Col md={6} className="row_right">
                <div>
                  <img src={logo} className="logo_image" />
                </div>
                <div className="form_login">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        id="email"
                        onChange={this.handleOnChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={this.handleOnChange} />
                    </Form.Group>
                    <div className="d-grid gap-2 pb-2">
                      <Button variant="primary" onClick={this.handleLogin}>
                        LOGIN
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="lupa_pass">
                  <span>Lupa password? klik&nbsp;<Link href="#">disini</Link></span>
                </div>
                <div >
                  <span>Belum punya akun?&nbsp;<Link href="/register">Buat akun</Link>&nbsp;baru</span>
                  <p>Login Name {this.props.userName}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      
    )
  }
}

// const reduxState = (state) => ({
//   userName: state.user
// })

// export default connect(reduxState, null)(Login)

export default Login