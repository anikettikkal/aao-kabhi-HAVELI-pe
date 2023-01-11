import React from 'react'
import "./Signup.css"


function Signup() {
    return (
        <div>
            <h1 className='text-center'>Signup</h1>
            <div className='row'>
                <div className='col-md-6'>

                </div>

                <div className='col-md-6'>
                    <div className='form-container '>
                        <img className='sticker' src='https://ih1.redbubble.net/image.704052516.5520/st,small,845x845-pad,1000x1000,f8f8f8.jpg' alt='' /> 
                        <span className='my-element display-5'><img className='image-wel' src='https://www.stickers-factory.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/2/6/26574_00.png' alt='' />Welcome</span>
                        <form>
                            <div>
                                <label className='lbl' htmlFor='name'>Full name :</label>
                                <input type='text' id='name' placeholder='Enter Name' className='user-input' />
                            </div>

                            <div>
                                <label className='lbl' htmlFor='name'>Email :</label>
                                <input type='email' id='email' placeholder='Enter Email' className='user-input' />
                            </div>

                            <div>
                                <label className='lbl' htmlFor='name'>Phone :</label>
                                <input type='text' id='phone' placeholder='Enter Phone' className='user-input' />
                            </div>

                            <div>
                                <label className='lbl' htmlFor='name'>Password :</label>
                                <input type='password' id='password' placeholder='Enter Password' className='user-input' />
                            </div>

                            <div>
                                <button type='button' className='signup-button  mt-4' >Signup</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Signup