import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onSubmit}) => {
    const onExampleClick = () => {
        document.getElementById('input-field').setAttribute('value','https://i.ibb.co/jwjnx7Z/7723cf7b-2c0f-41be-b540-dd18c32e03f5.jpg');
        document.getElementById('input-field').dispatchEvent(new Event('input', { bubbles: true }))


    };
    return(
        <div>
            <p className='f3'>
                Put a link to an image and see what happens
            </p>
            <p id='ex' onClick={onExampleClick}><u>Example</u></p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 center form'>
                    <input className='f4 pa2 w-70 center' id='input-field' type='text' onChange={onInputChange} />
                    <button
                        onClick={onSubmit}
                        className='w-30 grow f4 link ph3 pv2 dib white bg-black'>Detect</button>
                </div>
            </div>
        </div>
    );
};


export default ImageLinkForm;