import React from 'react';
import './Footer.scss';

const Footer = () =>
    (
        <footer className="navbar navbar-expand">
            <nav className="navbar__nav">
                <h2>Footer</h2>
                <ul>
                    <li className="nav-item pr-5">
                        <a target="_blank" href="#" className="navbar-link pt-2 pb-2">
                            About
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a target="_blank" rel="noopener noreferrer" href="#" className="navbar-link pt-2">
                            Something
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a target="_blank" rel="noopener noreferrer" href="#" className="navbar-link pt-2">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
export default Footer;

