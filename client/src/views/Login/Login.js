import React, { useState } from 'react'
import axios from 'axios'
import "./Login.css"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser() {
        const response = await axios.post('/login', {
            email: email,
            password: password,
        })
        console.log(response.data)
        if(response.data.message){
            alert(response.data.message)
            localStorage.setItem('currentUser',  JSON.stringify(response.data.data));
            window.location.href="/"
        }
        else{
            alert('Error:' + response.data.message)
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div>

            <div className='row'>
                <div className='col-md-6 mt-5 '>
                    <div className='mx-5'>
                        <h1 className='login-left-row-heading'>Get your <span className='overlight'>Restaurant</span> holiday</h1>
                        <span className='description-left-row-log'>"Food for us comes from relations, whether they have wings or fins
                            or roots. That is how we consider food. Food has a culture. It has a history. It has a story and It has a relationships."</span>
                    </div>
                    <img className='image-log-leftrow' src="https://as2.ftcdn.net/v2/jpg/04/10/00/89/1000_F_410008906_CdaYBie3lFRXiMIvmGjPXrhXoB7ZNsUP.jpg" alt='' />
                </div>

                <div className='col-md-6 mt-4'>
                    <div className='form-container '>
                        <img className='sticker' src='https://ih1.redbubble.net/image.704052516.5520/st,small,845x845-pad,1000x1000,f8f8f8.jpg' alt='' />
                        <span className='my-element display-5'><img className='image-wel' src='https://www.stickers-factory.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/2/6/26574_00.png' alt='' />Welcome</span>
                        <form>

                            <div>
                                <label className='lbl' htmlFor='name'>Email :</label>
                                <input type='email' id='email' placeholder='Enter Email' className='user-input'
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            
                            <div>
                                <label className='lbl' htmlFor='name'>Password :</label>
                                <input type='password' id='password' placeholder='Enter Password' className='user-input'
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div>
                                <button type='button' className='login-button  mt-4' onClick={loginUser}>Login 💨</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Login