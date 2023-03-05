import React, { Component, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import img_hand_batu from "../../components/images/games/rock-paper-scissors/hand_batu.png"
import img_hand_kertas from "../../components/images/games/rock-paper-scissors/hand_kertas.png"
import img_hand_gunting from "../../components/images/games/rock-paper-scissors/gunting.png"
import img_icon_refresh from "../../components/images/games/rock-paper-scissors/icon_refresh.png"
import { getScore, halamanGameVerifikasi, insertGameScore } from "../../action/games";
import Link from 'next/link'
import Router from 'next/router'
import { off, set } from "firebase/database";

const GameRPS = (props) => {
    const game_id = "-NG-Fxccy-8f1RZoup6D"

    let color_chose = '#C4C4C4';
    let color_unchose = '#00000000';
    let have_result = false;
    

    let text_vs = null;
    let winner = null;
    let winner_text = null;


    let result_text = ["DRAW", "PLAYER 1<br>WIN", "COM<br>WIN"];
    let hand_p = [];
    let hand_com = [];
    // let [round,setRound] = useState(1)
    let round = 0
    let pscore = 0
    

    let hand = null

    function tambahData(){
        pscore += 1
        alert(pscore)
        return
    }

    function reset() {
        const resetBtn = document.getElementById('resetBtn')
        resetBtn.style.display = 'none'
        // have_result = false;
        // card_hand(0, "com");
        // card_hand(0, "player");
        winner.style.display = "none";
        text_vs.style.display = "block";
    }

    function card_hand(handChose, who) {
        for (let i = 1; i <= 3; i++) {
            hand[who][i].style.backgroundColor = color_unchose;
        }

        if (handChose > 0) {
            hand[who][handChose].style.backgroundColor = color_chose;
        }
    }
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async function press(you_chose) {
        const resetBtn = document.getElementById('resetBtn')
        console.log('Button has been pressed');
        round += 1
        // if (have_result) {return}
        have_result = true;
        resetBtn.style.display = 'block' 
    
        let com_chose = await getRandomInt(1, 3);
        let who_won = 0;
        let res = you_chose - com_chose;

        card_hand(com_chose, "com");
        card_hand(you_chose, "player");


        if (res != 0) {
            if (res < 2 && res > -2) {
                if (you_chose > com_chose) {
                    who_won = 1;
                } else {
                    who_won = 2;
                }
            } else {
                if (you_chose > com_chose) {
                    who_won = 2;
                } else {
                    who_won = 1;
                }
            }
        }
        
        winner_text.innerHTML = result_text[who_won];
        winner.style.display = "block";
        text_vs.style.display = "none"

        
        
        if(who_won === 1){
            pscore += 1
            alert(pscore)
        }

        // if (who_won === 1) {
        //     insertGameScore(game_id, await localStorage.getItem('UID'), 2);
        //     players += 1
        // } else if (who_won === 2) {
        //     insertGameScore(game_id, await localStorage.getItem('UID'), -1);
        //     coms += 1
        // } else {
        //     insertGameScore(game_id, await localStorage.getItem('UID'), 0);
        // }

        // if(round === 10){
        //     resetBtn.style.display = 'none'
        // }

        // setTimeout(() => {
        //     if(who_won === 1){   
        // }
        // },1000)

    }
    
    useEffect( () => {
        halamanGameVerifikasi();
        let hand_com_1 = document.getElementById('hand_com_1');
        let hand_com_2 = document.getElementById('hand_com_2');
        let hand_com_3 = document.getElementById('hand_com_3');

        let hand_p_1 = document.getElementById('hand_p_1');
        let hand_p_2 = document.getElementById('hand_p_2');
        let hand_p_3 = document.getElementById('hand_p_3');

        text_vs = document.getElementById('text_vs');
        winner = document.getElementById('winner');
        winner_text = document.getElementById('winner_text');

        hand_p = [null, hand_p_1, hand_p_2, hand_p_3];
        hand_com = [null, hand_com_1, hand_com_2, hand_com_3];
        hand = {
            'player': hand_p,
            'com': hand_com
        }
        reset();
    },);

    return (
        <div style={{ backgroundColor: "#9C835F" }}>
            <Navbar bgColor="#4A4A5C" transparant='1'/>
            <div className="container">
            <h1 style={{position: 'absolute', top:'97px', left:'97vh'}}>Round {pscore}</h1>
                <div className="row text-center align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <div className="col-3 ">
                        <div className="row ">
                            <div className="col-12">
                                <h4 className=""><strong>PLAYER 1</strong></h4>
                            </div>
                            <div className="col-12 container-hand-items">
                                <a href="#" onClick={() => { press(1) }} className="">
                                    <div className="card-hand d-flex ">
                                        <div id="hand_p_1" className="card-hand">
                                            <img src={img_hand_batu.src} className="img-hand " />
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-12  container-hand-items disabled">
                                <a href="#" onClick={() => { press(2) }}>
                                    <div className="card-hand d-flex ">
                                        <div id="hand_p_2" className="card-hand">
                                            <img src={img_hand_kertas.src} className="img-hand" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-12 container-hand-items ">
                                <a href="#" onClick={() => { press(3) }} >
                                    <div className="card-hand d-flex ">
                                        <div id="hand_p_3" className="card-hand d-flex">
                                            <img src={img_hand_gunting.src} className="img-hand" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="col-3 container-hand-items justify-content">
                        <h1 id='text_vs' className="text-vs"><strong>VS</strong></h1>
                        <div id='winner'>
                            <div className="card-result d-flex">
                                <div className="d-flex  justify-content-center">
                                    <h4 id='winner_text' className="align-middle ">WHO WIN?</h4>
                                </div>
                            </div>
                        </div>

                        <div id="resetBtn" className="position-absolute bottom-0 start-5 translate-middle-y">
                            <a href="#" onClick={() => { reset() }} id='refresh'>
                                <div className="card-reset d-flex">
                                    <img src={img_icon_refresh.src} className="img-reset" />
                                </div>
                            </a>
                        </div>

                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col-12">
                                <h4><strong>COM</strong></h4>
                            </div>
                            <div className="col-12 container-hand-items ">
                                <div id="hand_com_1" className="card-hand">
                                    <img src={img_hand_batu.src} className="img-hand" />
                                </div>
                            </div>
                            <div className="col-12 container-hand-items ">
                                <div id="hand_com_2" className="card-hand">
                                    <img src={img_hand_kertas.src} className="img-hand" />
                                </div>
                            </div>
                            <div className="col-12 container-hand-items ">
                                <div id="hand_com_3" className="card-hand">
                                    <img src={img_hand_gunting.src} className="img-hand" />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <a href="#" onClick={() => {tambahData()}}>add</a>

                <div className="card-result-finish" style={{display:'none',position:'absolute', top:'20vw', right:'25vw'}}>
                    <div className="d-flex justify-content-center">
                        <h4 id='winner_text' className="align-middle">WHO WILL WIN THIS GAME?</h4>
                    </div>
                </div>
                <Link type="submit" href='/pdfview'className="btn btn-primary" style={{position:'absolute', bottom:'10px', right: '10px'}}>Get History</Link>
            </div>
            </div>
    )
}


export default GameRPS