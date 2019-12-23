import React,{Component} from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from  'clarifai';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import './App.css';
import './Helper/ParticleOptions';
import {particleOptions} from "./Helper/ParticleOptions";
import FaceRec from "./components/FaceRecognition/FaceRec";

const ParticleOptions = particleOptions;
const app = new Clarifai.App({
    apiKey: '36e21255dbfa4141a3bf027f932599ae'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl:''
        }
    }
    onInputChange = (event) => {
         this.setState({input:event.target.value});
    };

    onSubmit = () => {
        this.setState({imageUrl:this.state.input});
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                // URL
                this.state.input
            )
            .then(function(response) {
                    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
                },
                function(err) {// there was an error
                 }
                );


    };
    render() {
        return (
            <div className="App">
                <Particles className='particles'
                           params={ParticleOptions}
                />
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm
                    onInputChange = {this.onInputChange}
                    onSubmit = {this.onSubmit}
                />
                <FaceRec url = {this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
