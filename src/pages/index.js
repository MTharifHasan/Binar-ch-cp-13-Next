import { Component } from "react";
import { Form, Container, Card, CardGroup, Row, Col } from 'react-bootstrap';
// import { authFirebase, database } from "../config/firebase"
import '../styles/styles.module.css';
// import '../styles/scripts.js';
import { Carousel } from "react-bootstrap";

// import imgHeader from './assets/images/header-bg.jpg'
import logo from '../components/images/echamp-white.png'
import btnSlide from '../components/images/scroll_down.svg'
import GameCard from '../components/home/game_card'
import Slideshow from '../components/home/slideshow'
import Footer from "../components/Footer";
import { getLeaderBoard, retrieveAllGames, retrieveAllSlideshow, seederGame } from "../action/games";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/home/leaderboard";

// key={data.id} game_id={data.id} title={data.data.game_title} description={data.data.game_description} image={data.data.game_image} url={data.data.game_url}
class Home extends Component {
  state = {
    gameSearch: "",
    gameList: [],
    slideshow: []
  }

  handleSearchGame = async (event) => {
    // await seederGame()
    await this.setState(data => ({
      gameSearch: event.target.value
    }))
    this.componentDidMount()
  }

  async componentDidMount() {
    // console.log(localStorage.getItem('jwt-token'))
    const data_game = await retrieveAllGames()
    const data_slideshow = await retrieveAllSlideshow()
    this.setState({
      gameList: data_game,
      slideshow: data_slideshow,
    })
  }

  render() {
    return (
      <div id="testjest" style={{ backgroundColor: '#2B2D33', color: '#fff' }}>
        <Navbar bgColor="#4A4A5C" transparant='1' />

        <header className="" style={style.header}>
          <div className="container">
            <div className="masthead-subheading" style={{ fontSize: 25 }}><b>FIND YOUR FAVORITE GAME</b></div>
            <div className="masthead-heading text-uppercase" style={{ fontSize: 60 }}><b>PLAY ONLINE</b></div>
          </div>
        </header >
      
        <Container>

          <center>
            <div style={style.header_card}>
              <h2>ABOUT</h2>
              <span>play your favorite games online, no need to download and can be played for free, all the scores you get will be recorded and will be displayed if you are the best of everyone </span>
            </div>
          </center>

          <section className="page-section " id="game">
            <center>
              <div className="col-lg-9 col-sm-12">

                <hr/>
                <h3>COMING SOON</h3>
                <span>ON THIS SUMMER</span>
                <hr/>

                <Slideshow data={this.state.slideshow} />

                <hr/>

                <Row xs={1} md={3} className="g-4 text-dark" >
                  <Col></Col>
                  <Col></Col>
                  <Col>
                    <Form>
                      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search Game" value={this.state.gameSearch} onChange={this.handleSearchGame} />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>

                <Row xs={1} md={1} className="g-4 py-3" >
                  {
                    this.state.gameList.map((data) => (
                      <GameCard key={data.id} game_id={data.id} title={data.data.game_title} description={data.data.game_description} image={data.data.game_image} url={data.data.game_url} />
                    ))
                  }
                </Row>

              </div>
            </center>

          </section>
        </Container>
        <section className="page-section  py-5" style={style.section_leaderboard} id="leaderboard">
          <Leaderboard />
        </section>
        <div className="container" style={{paddingTop:'20px', paddingBottom:"10px"}}>
              <h3 className='text-center mb-4'>PAPER ROCK SCISSORS TUTORIAL</h3>   
                      <div className="video-section">
                        <video style={{width:'100%'}} controls>
                            <source src="https://res.cloudinary.com/dzijcav6q/video/upload/v1677196597/How_to_play_Rock_Paper_Scissors_v22r8s.mp4"></source>
                            Sorry, your browser doesnt support videos.
                        </video>
                        </div>
        </div>         

        <Footer />

      </div >
    )
  }
}


var style = {
  header: {
    backgroundImage: `url('/assets/images/header-bg.jpg')`,
    paddingTop: 250,
    paddingBottom: 200,
    textAlign: 'center',
    color: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  header_card: {
    backgroundColor: '#3E4552',
    maxWidth: 800,
    padding: 50,
    borderRadius: 20,
    top: -80,
    position: 'relative'
  },
  slideshow: {
    height: 400
  },
  section_leaderboard: {
    backgroundColor: '#353637',
  },
  controls:{
    zIndex : 9999
  }
};


export default Home