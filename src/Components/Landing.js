import React from 'react'
import Header from './Header'


function Landing(){
return(
<div>
    <div className="landingContainer">
   
        <div className='landingCenter'>
            <div className='businessName'>Chip Cookies</div>
            <button id='landingButton'>Order Now</button>
        </div>
    </div>
    <div className="lowerLanding">
        <div 
        className='lowerLandingImage'>
        </div>
        <div className="landingOrder">
        <h1>Order Chip Cookies</h1>
        <h4>Cookie</h4>
        <input></input>
        </div>
    </div>

  
</div>
)
}
export default Landing