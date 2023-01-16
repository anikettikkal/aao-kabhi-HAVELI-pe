import React,{useEffect, useState} from 'react'
import { currentUser } from './../../Util/currentUser'


function Home() {
    
    return(
        <div>
            <h1 className='text-center'>Home</h1>
            <h2>{currentUser?.name}</h2>
        </div>
    )
}

export default Home