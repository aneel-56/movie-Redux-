import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
        <div>
            <h3>Terms of Use</h3>
            <h3>Privacy-Policy</h3>
            <h3>About</h3>
            <h3>Blog</h3>
            <h3>FAQ</h3>
        </div>
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque fuga delectus exercitationem magni repellat! Ipsam quis repudiandae veniam odio. Ex nisi deleniti architecto labore aspernatur provident, debitis reprehenderit delectus laborum obcaecati corrupti molestias adipisci ullam neque veritatis. Fuga architecto eos quaerat quibusdam possimus error similique iusto praesentium rem!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, animi cupiditate consectetur voluptas ducimus quidem laborum non quo dolor ipsam saepe eos, omnis, quia sit placeat quaerat! Unde, dignissimos sequi?</p>
        <div className="footer-socials">
            <i className="fa-brands fa-facebook"></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-twitter'></i>
            <i className='fa-brands fa-linkedin'></i>
        </div>
    </footer>
  )
}

export default Footer