import { Component, useState, useEffect, useCallback, Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Form, Container, Card, CardGroup, Row, Col } from "react-bootstrap";
import Navbar from "../../components/NavbarComponent";
import { database } from "../../config/firebase"
import { halamanGameVerifikasi, insertGameScore } from "../../action/games";
import { checkDataLogin } from "../../action/autentication";
import { useAuth } from "@/action/fb_storage";
// https://react-unity-webgl.dev/
// https://github.com/jeffreylanters/react-unity-webgl/discussions/264

const GameSpaceWar = () => {
  // const [isLogin, setIsLogin] = useState(true);
  const currentUser = useAuth();

  const game_id = "-NG-FxcdZAq13GcqcZIm";
//   const uuid = localStorage.getItem("UID");
  const uuid = "localStorage.getItem('UID')";
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/game/space_war/BinarSpaceWar.loader.js",
      dataUrl: "/game/space_war/BinarSpaceWar.data.unityweb",
      frameworkUrl: "/game/space_war/BinarSpaceWar.framework.js.unityweb",
      codeUrl: "/game/space_war/BinarSpaceWar.wasm.unityweb",
    });

  // sendMessage("JavascriptHook", "ChangeData", "HarlanSR");

    const handleGameOver = useCallback((userName2, score) => {
        insertGameScore(game_id, uuid, score);
    }, []);

    // const cek_data_user = async () => {
    //     console.log("Data User =========>", await currentUser)
    // }

    useEffect( () => {
        halamanGameVerifikasi()
        // cek_data_user()
    }, []);
  


    useEffect(() => {
        addEventListener("GameOver", handleGameOver);
        return () => {
            removeEventListener("GameOver", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    return (
        <div style={{ backgroundColor: '#2B2D33', color: '#fff', height:"100vh" }}>
            <Navbar bgColor="#4A4A5C"/>
            <Container className="mt-5" >

                <div className="p-5">
                    <Unity
                        style={{
                            width: "100%",
                            justifySelf: "center",
                            alignSelf: "center",
                        }}
                        unityProvider={unityProvider} />
                </div>
            </Container>
        </div>
  );
};

export default GameSpaceWar;