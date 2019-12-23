import React from "react";
import Tilt from "react-tilt/dist/tilt";
import ghost from './ghost.png'
import './Logo.css'

const Logo = () => {
    return(
        <div>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150, margin: 10 }} >
                <div className="Tilt-inner pa3">
                    <img src={ghost} alt = 'logo'/>
                </div>
            </Tilt>
        </div>
    );
};


export default Logo;