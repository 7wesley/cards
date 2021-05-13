/**
 * Creates a Header/Navbar that allows users to navigate through the website
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

/**
 * The Navbar that is displayed at the top of each screen and which users
 *      can travers the site with
 * @param {any} id the identification of the user using the pages
 * @returns the header that can be displayed
 */
const Header = ({ id }) => { 

    const [open, setOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const history  = useHistory();

    /**
     * For creating the header as a drop down menu if the screen does not
     *      meet a standard computer's size
     */
    const handleClick = async () => {
        if (currentUser)
            await logout();
        //possibly POST logout success
        setDropOpen(false);
        history.push('login');
    } 

    /**
     * Creates the link that the user wants to navigate to when a button is clicked
     * @param {any} link the link that the user wants to navigate to
     */
    const handleLink = (link) => {
        if (open === true)
            setOpen(false);
        history.push(`/${link}`);
    }

    return (
        <Navbar bg = 'dark' variant = 'dark' expand = 'lg'>
            <div className = "container">
                <Link onClick = {() => handleLink('')} className="navbar-brand">
                    <FontAwesomeIcon size="lg" icon={faCrown} />
                </Link>

                <Navbar.Toggle  onClick={() => setOpen(!open)}/>
                
                {/*A collapsable menu that can be opened if the header is too big for the screen*/}
                <Navbar.Collapse in = {open} className = "justify-content-stretch">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" onClick={() => handleLink('games')}>
                            <Link className="nav-link">Play</Link> 
                        </li>
                        <li className="nav-item" onClick={() => handleLink('contact')}>
                            <Link className="nav-link" >Contact</Link>
                        </li>
                        <li className="nav-item" onClick={() => handleLink('about')}>
                            <Link className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <NavDropdown onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)} onClick = {() => setDropOpen(!dropOpen)} show = {dropOpen} title={id} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick = {handleClick}> {currentUser ? 'Log out' : 'Sign in'}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLink('account')}>Manage Account</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLink('stats')}>Your stats</NavDropdown.Item>
                            </NavDropdown>    
                        </li>
                    </ul>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;

/*
<div className="text-align: center; border: 1px solid">
<Link to = "/Games" className="nav-link">Play</Link>
</div>



<div class="dropdown dropdown-menu-right">


    <button class="btn btn-secondary"
        data-toggle="collapse" 
        data-target="#navbarDropdown">


        { id }

    </button>
    

    <div id="navbarDropdown" class="dropdown-menu dropdown-menu-right">


        <li className="nav-item">
            <Link className="nav-link" to="/stats">Stats</Link>
        </li>
        

        <li className="nav-item">
            <Link className="nav-link" to="/account">Account</Link>
        </li>

        <li className="nav-item">
            <div className="nav-link" onClick = {handleClick}> {currentUser ? 
            
                <Link className="nav-item" to="/login">Login</Link> : 
                <Link className="nav-item" to="/signup">Sign-in</Link>} 
            
            </div>       
        </li>

    </div>
</div>

</ul>
</Navbar.Collapse>

</div>
</Navbar>

export default Header;
*/
