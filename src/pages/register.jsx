import React, { Component } from "react";
// import { Button, Container, Grid, TextField } from "@mui/material";
import { authFirebase } from "../config/firebase";
import Navbar from "../components/NavbarComponent";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';

import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth";
import { registerUser2 } from "../action/fb_database"

const auth = getAuth();
console.log(auth);


class Register extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    city: "",
    social_media: "",
  };

  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        (
          res.user.uid,
          this.state.name,
          this.state.username,
          res.user.email,
          this.state.city,
          this.state.social_media
        );
        sendEmailVerification(res.user)
          .then(() => {
            alert("Mohon verifikasi email anda");
            window.location.href = "/";
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      })
    
  };
  render() {
    const { name, username, email, password, city, social_media } = this.state;
    return (
      <div>
      <Navbar bgColor="#4A4A5C" />
      <Container className="vw-100 vh-100">
      <div className="row">
        <div className="col-lg-5 mt-5">
        <h1 className="mt-5">Sign Up</h1>  
        <Form className="mt-3"  onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" onChange={this.handleChangeField} name="email"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={this.handleChangeField} name="password"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Control placeholder="name" onChange={this.handleChangeField} name="name"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control placeholder="username" onChange={this.handleChangeField} name="username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Control placeholder="city" onChange={this.handleChangeField} name="city"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="social_media">
            <Form.Control placeholder="social media" onChange={this.handleChangeField} name="social_media"  />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> 
        </div>
      </div>
    </Container>
      </div>
    );
  }
}

export default Register;

// import React from 'react';
// import authFirebase from "../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { 
//     Button,
//     Form,
//     Input
//  } from 'reactstrap';
// import Link from 'next/link';

// const {Component} = require("react")
    
// class Register extends Component {

//     state= {
//         email: '',
//         password: '',
//         flagginglogin: false,
//         isError: false
//     }
//     handleRegister= () => {
//         console.log(this.state);

//         this.setState({flagginglogin:true})
    
//         createUserWithEmailAndPassword (authFirebase, this.state.email, this.state.password)
//             .then((userCredential) => {
//                 window.location.href= './login'
//             })
//             .catch((error) => {
//                 this.setState({flagginglogin:false})
//                 this.setState({isError:true})
//             });
    
//         }
    
//     handleOnChange= (event) => {
//         this.setState({
//             [event.target.id]: event.target.value
//         })
//     }

//         render() {
//     return (
//         <>
//             <div className='container-fluid boardRegister'>
//                 <div className="container d-flex row Register">
//                     <h2 className="fw-bold  text-uppercase text-center text-dark mt-4">Register</h2>
//                     <p className="text-dark-50 text-center text-dark mt-2" >Please enter your email and password!</p>
//                     <Form className=''>
//                         <div className='inputEmail mb-3'>
//                             <Input  onChange={this.handleOnChange} placeholder='Enter email' id='email' type='email' size="md" />
//                         </div>
//                         <div className='inputPassword mb-5'>
//                             <Input onChange={this.handleOnChange} placeholder='Enter password' id='password' type='password' size="md" />
//                         </div>
//                         <Button className='buttonRegister mb-5' color="primary" onClick={this.handleRegister} size="md" >
//                             { this.state.flagginglogin && 
//                             <span className="spinner-border spinner-border-lg " role="status" aria-hidden="true"></span>} Sign Up
//                         </Button>
//                     </Form>
//                     <div>
//                         <p className="paraf text-dark">
//                             You have an account?
//                             <Link href="/login" className='signin'>
//                                 Sign In
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
// }

// export default Register;