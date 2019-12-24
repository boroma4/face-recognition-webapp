import React from "react";

const Rank = ({user}) => {
    return(
        <div>
            <div className='f3' style={{color:'#6f0000'}}>
                {`${user.name},Your total count is ${user.score}`}
            </div>
        </div>
    );
};


export default Rank;