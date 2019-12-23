import React from "react";

const FaceRec = ({url}) => {
    return(
     <div className='center ma'>
         <div className='absolute mt2'>
             <img src={url} alt='picture you linked' width='500px' height='auto'/>
         </div>
     </div>
    );
};


export default FaceRec;