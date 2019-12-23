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
import SignIn from "./components/SignIn/SignIn";
import Registration from "./components/Registration/Registration";

const ParticleOptions = particleOptions;

const app = new Clarifai.App({
    apiKey: '36e21255dbfa4141a3bf027f932599ae'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl:'',
            boxes: [],
            route: 'signIn',
            isSignedIN:false
        }
    }
    calculateFaceLocation = (data) => {
        const regions = data.outputs[0].data.regions;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        let boxes = [];
        regions.forEach(region => {
            const box = region.region_info.bounding_box;
            boxes.push({
                leftCol: box.left_col * width,
                topRow: box.top_row * height,
                rightCol: width - (box.right_col * width),
                bottomRow: height - (box.bottom_row * height)
            });
        });
        return boxes;
    };

    displayDetectionBox = (boxes) => {
        this.setState({boxes});
    };

    onInputChange = (event) => {
         this.setState({input:event.target.value});
    };

    onRouteChange = (route) =>{
        if(route === 'signOut'){
            this.setState({isSignedIn:false})
        }else if( route === 'home'){
            this.setState({isSignedIn:true})
        }
       this.setState({route});
    };

    onSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                // URL
                this.state.input
            )
            .then(response => this.displayDetectionBox(this.calculateFaceLocation(response))
                .catch(err => console.log(err)));
    };

    render() {
        const { isSignedIn, imageUrl, route, boxes} = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={ParticleOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onSubmit={this.onSubmit}
                        />
                        <FaceRec
                            boxes={boxes}
                            url={imageUrl}
                        />
                    </div>
                    : (
                        route === 'signIn'
                        ? <SignIn onRouteChange = {this.onRouteChange}/>
                        : <Registration onRouteChange = {this.onRouteChange}/>
                    )
               }
            </div>
        );
    }
}

export default App;
