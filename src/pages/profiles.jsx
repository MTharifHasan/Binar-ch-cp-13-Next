import React, { Component, useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MDBTypography } from 'mdb-react-ui-kit';
import {
  Form,
  Container,
  Card,
  CardGroup,
  Row,
  Col,
  Button
} from "react-bootstrap";

import { set, ref, push, onValue, update, getDatabase } from "firebase/database";
import "../styles/profiles.module.css";
import { checkDataLogin } from "../action/autentication";
import { halamanGameVerifikasi } from "../action/games";
import { getLeaderBoard } from "../action/games";
// import { useAuth,upload } from "../../config/firebase";
import { useAuth,upload } from "../action/fb_storage";
import Link from "next/link";
import { updateProfileImg } from "@/action/fb_database";



const Profiles = (props) => {
      halamanGameVerifikasi();
      const db = getDatabase()
      const dataUser = [];
      const currentUser = useAuth();
      const [photo, setPhoto] = useState(null);
      const [photoURL, setphotoURL] = useState("https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg");

      function handleChange(e) {
        if (e.target.files[0]) {
          setPhoto(e.target.files[0])
        }
      }

      async function handleClick(){
        if(photo == null){
          alert(`can't upload empty data`)
        }else{
          upload(photo,currentUser)
        }
      }

      useEffect(() => {
        if(currentUser?.photoURL){
          setphotoURL(currentUser.photoURL)
        }
      }, [currentUser])


      const [dataList, setDataList] = useState([]);
      const [isLogin, setIsLogin] = useState(false);
      const [profile, setProfile] = useState();
      
      const setDataUser = (dataUser)=>{
        }       
        const setDataUserDetail = (dataUser) =>{
          setProfile(dataUser)
      }
      // const files = document.getElementById('profileSubmit');

      // function handleChange(e){
      //   files.className = 'mt-1 disabled btn btn-primary me-3';
      //   files.textContent = 'Waiting for input...'
      //   if(e.target.files[0]){
      //     setPhoto(e.target.files[0])
      //     files.textContent = 'Save Changes'
      //     files.className = 'mt-1 btn btn-primary me-3'
      //   }
      // }

      
      const getData = async () => {
        const data_new = await getLeaderBoard()
        setDataList(data_new)
        console.log(data_new)
    }

    dataList.forEach((elem) => {
      if(elem.id_player == currentUser.uid){
        const score = elem.score;
        dataUser.push(score)
      }
    })
      useEffect(() => {
          checkDataLogin(setIsLogin,setDataUser, setDataUserDetail, setProfile)
      }, []);
      
      

      useEffect(() => {
        getData()
    }, []);

      return (
        
        <div style={{ backgroundColor: "#2B2D33", color: "#fff" }}>
          <Navbar bgColor="#4A4A5C" />
          <Container
            fluid
            className="mt-5 vw-100 vh-100"
            style={{ padding: "10vh 10vh", backgroundColor: "#3E4552" }}
          >
            <div className="row">
              <div className="col-3">
              <Card className="bg-dark" >
                <Card.Header style={{backgroundImage: `url(${photoURL})`, width: "100%", height: "250px", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></Card.Header>
                {/* <Card.Img variant="top" style={{ width: '100%', height:"150px", backgroundColor: "red" }} src={photoURL}/>  */}
                <Card.Body style={{position: "relative"}}>
                <div style={{position: "absolute", top:"1px", left:"0" , right:"0", backgroundColor:"rgba(255,255,255,0.8)"}}>
                  <Form.Control onChange={handleChange} type="file" size="sm" />
                </div>
                </Card.Body>
              </Card>
              <Button className="mt-1" type="submit" onClick={handleClick}>Save Changes</Button>     
              </div>
              <div className="col-lg-5 offset-1">
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>full name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.name}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.username}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="City">
                    <Form.Label>city</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.city}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Social-Media">
                    <Form.Label>social media</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.social_media}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Button href="/updateProfiles" className="btn btn-primary me-3">Here, Update Your Profile Data !
                  </Button>
              </div>
              <div className="col-lg-2 offset-1">
                <Card className="text-dark">
                  <Card.Header as="h5" className="text-center text-dark">Game Score</Card.Header>
                  <Card.Text className="text-center">{dataUser}</Card.Text>
                </Card>
              </div>
            </div>
          </Container>
        </div>
      );
}  

export default Profiles;
