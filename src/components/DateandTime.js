import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const DateandTime = (props) => {
    
    return (
        <div>
            <Popup trigger={<button className='add-btn'> Display Details</button>} position="right center"> 
            
                <div>
                    {props.finalDisplay.map((e, i) => {             //loops over finalDisplay to display payer and points
                        if(e === 'Not enough points'){
                            return e
                        }
                        return <div key={i}>
                                Payer:{e.payer}, Points:{e.points}          
                            </div>    
    
                        })}
                </div>
            </Popup>
            
        </div>
  );
}

export default DateandTime