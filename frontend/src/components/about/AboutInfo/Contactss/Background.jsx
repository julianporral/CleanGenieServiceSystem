import React from 'react'
import './Background.css'
// Contacts muna to
const Background = () => {
  return (
    <div >
      <h1 className='Contacts'>Clean Genie Cleaning Co. </h1>
      <p className='Info'>Tiffany ganda </p>
      <nav>
        <ul>
          <li>
            <h1 className='Facebook'> Facebook <i className='fab fa-facebook-f icon'> </i> </h1> {/**Links  */}
          </li>
          <h2 className='Fblink'> Facebook link</h2>
          <li>
            <h1 className='Instagram'> Instagram <i className='fab fa-instagram icon'></i> </h1>
          </li>
          <li>
            <h1 className='Youtube'> Youtube <i className='fab fa-youtube icon'></i>  </h1>
          </li>
          <li>
            <h1 className='Twitter'> Twitter  <i className='fab fa-twitter icon'></i></h1>
          </li>
          </ul>
          </nav>
      </div>
  )
}

export default Background