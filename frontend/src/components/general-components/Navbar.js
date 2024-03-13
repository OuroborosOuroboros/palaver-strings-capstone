import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import NavigationLink from './NavigationLink.js';
import './styles/Navbar.css';
import { LuMenu } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { RiUserAddLine, RiBookletLine } from "react-icons/ri";
import { FaUserEdit } from 'react-icons/fa'; 
import { MdOutlineAssignmentInd } from "react-icons/md";
import { FaIndent } from 'react-icons/fa';
import { CiMail } from "react-icons/ci";
import { SiGoogleclassroom } from "react-icons/si";




function Navbar() {
    const navigate = useNavigate();
    const { logout, isLoggedIn, isAdmin, isInstructor, isStudent, isParent, userId } = useAuth ();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogout = async ( ) => {
        await logout();
        navigate('/login');
    };

    // Just logging user roles for debugging. 
    // Wanted to check that the user is seeing the correct options. 
    console.log(
        "isLoggedIn:", isLoggedIn,
        "isAdmin:", isAdmin(),
        "isInstructor:", isInstructor(),
        "isStudent:", isStudent(),
        "isParent:", isParent(),
        "userId:", userId
    );

    return (
        <div className={`side-menu ${isExpanded ? 'expanded' : ''}`}>
        <button className="menu-button" onClick={toggleMenu}>
            <span className="menu-button-icon"><LuMenu /></span>
            Menu
        </button>
            <div className="menu-content">
                <nav>
                    <NavigationLink Icon={IoMdHome} to="/" label="Home" />
                    {isLoggedIn && isAdmin() && (
                        <>
                            <NavigationLink Icon={RiUserAddLine} to="/create-user" label="Add User" />
                            <NavigationLink Icon={FaUserEdit} to="/users" label="Manage users" />
                            <NavigationLink Icon={MdOutlineAssignmentInd} to="/student-assignments" label="Student Assignments"/>
                        </>
                    )}
                    {isLoggedIn && (isAdmin() || isInstructor()) && (
                        <>
                            <NavigationLink Icon={RiBookletLine} to="/admin-instructor/attendance" label="Attendance" />
                            <NavigationLink Icon={CiMail} to="/admin-instructor/messages" label="Messaging" />
                            <NavigationLink Icon={SiGoogleclassroom} to="/classes" label="Classes" />
                        </>
                    )}
                    {isLoggedIn && isInstructor() && (
                        <>
                            <NavigationLink Icon={FaIndent} to="/mystudents" label="My Students" />
                            <NavigationLink Icon={FaIndent} to="/prog-report" label="Progress Reports" />
                        </>
                    )}
                    {isLoggedIn && (!isAdmin() && !isInstructor()) && (
                        <>
                            <NavigationLink Icon={CiMail} to="/messages" label="Read Messages" />
                        </>
                    )}
                    {isLoggedIn && (
                        <button 
                            className="logout-button" 
                            onClick={handleLogout} 
                            style={{display: isExpanded ? 'block' : 'none'}}
                        >
                            Logout
                        </button>
                    )}
            </nav>
        </div>
    </div>
       
    );
}

export default Navbar;