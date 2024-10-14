import React from 'react';
import bemCssModules from 'bem-css-modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { default as FooterStyle } from './styleModules/Footer.module.scss'

const style = bemCssModules(FooterStyle)

const Footer = () => {
    return (
        <div className={style()}>
            <a href="https://github.com/MajkiX"><button className={style('gitHub-button')}><FontAwesomeIcon icon={faGithub} /> gitHub</button></a>
            <a href="https://www.linkedin.com/in/mateusz-zawadzki-9b57a6273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><button className={style('linkedin-button')}><FontAwesomeIcon icon={faLinkedin} /> linkedIn</button></a>
        </div>
    );
}

export default Footer;