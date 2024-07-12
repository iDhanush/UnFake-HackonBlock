import React from 'react'
import ERROR from '../../assets/404 Error.gif'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <div 
    className='pagenotfound'
    >
     <img src={ERROR} className='error-img' alt='404'/>
     <p className='not-found-h1'>Something went wrong</p>  
     <p className='not-found-h2'>Sorry, We can't find the page the page you're looking for.</p>   
     <Link
     to='/'
     className="back-btn">
        Back to Home
     </Link>
    </div>
  )
}

export default PageNotFound