import React, { useState, useEffect } from 'react'
import { currentUser } from './../../Util/currentUser'
import swal from 'sweetalert';

import axios from 'axios'
import "./Signup.css"

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')

    useEffect(() => {
        if(currentUser){
            window.location.href="/"
        }
    },[])

    async function signupUser() {
        const response = await axios.post('/signup', {
            name: name,
            email: email,
            phone: phone,
            password: password,
            role: role
        })
        console.log(response.data)
        if (response.data.success) {
            await swal({
                title: "Success",
                text: response.data.message,
                icon: "success",
                button: "Aww yiss!",
              });
            window.location.href = '/login'
        }
        else {
            swal({
                title: "Error",
                text: response.data.message,
                icon: "error",
                button: "Try Again!",
              });
            setName('')
            setEmail('')
            setPassword('')
            setPhone('')
        }
    }

    return (
        <div>

            <div className='row'>
                <div className='col-md-6 mt-5 '>
                    <div className='mx-5'>
                        <h1 className='signup-left-row-heading'>Get your <span className='overlight'>Restaurant</span> holiday</h1>
                        <span className='description-left-row-sgn'>"Food for us comes from relations, whether they have wings or fins
                        or roots. That is how we consider food. Food has a culture. It has a history. It has a story and It has a relationships."</span>
                    </div>
                    <img className='image-sgn-leftrow' src="https://as2.ftcdn.net/v2/jpg/04/10/00/89/1000_F_410008906_CdaYBie3lFRXiMIvmGjPXrhXoB7ZNsUP.jpg" alt='' />
                </div>

                <div className='col-md-6 mt-4'>
                    <div className='form-container '>
                        <img className='sticker' src='https://ih1.redbubble.net/image.704052516.5520/st,small,845x845-pad,1000x1000,f8f8f8.jpg' alt='' />
                        <span className='my-element display-5'><img className='image-wel' src='https://www.stickers-factory.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/2/6/26574_00.png' alt='' />Welcome</span>
                        <form>
                            <div>
                                <label className='lbl' htmlFor='name'>Full name :</label>
                                <input type='text' id='name' placeholder='Enter Name' className='user-input'
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div>
                                <label className='lbl' htmlFor='name'>Email :</label>
                                <input type='email' id='email' placeholder='Enter Email' className='user-input'
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div>
                                <label className='lbl' htmlFor='name'>Phone :</label>
                                <input type='text' id='phone' placeholder='Enter Phone' className='user-input'
                                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div>
                                <label className='lbl' htmlFor='name'>Password :</label>
                                <input type='password' id='password' placeholder='Enter Password' className='user-input'
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div>
                                <button type='button' className='signup-button  mt-4' onClick={signupUser}>Signup 💨</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Signup