import React from "react";
import './FaceRec.css'

const FaceRec = ({url,boxes}) => {
    return(
     <div className='center ma'>
         <div className='absolute mt2'>
             <img id ='inputImage' src={url} width='500px' height='auto' alt=''/>
             {boxes.map( (box,index) =>{
                 return <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} key={index}/>
             })}
         </div>
     </div>
    );
};


export default FaceRec;