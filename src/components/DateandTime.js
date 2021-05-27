import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {useState} from 'react'

toast.configure()

const DateandTime = (props) => {
    
    return (
        <div>
            <Popup trigger={<button className='add-btn'> Display</button>} position="right center">
                <div>
                    {props.finalDisplay.map((e, i) => {
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