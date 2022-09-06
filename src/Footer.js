import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
    return(
        <MainDiv>

            <h2>Contact Me</h2>
            <a href="https://github.com/kabdulkad">
            <BsGithub size={25} className="icon" />
                GitHub</a>
        </MainDiv>
    )
}

const MainDiv = styled.div`
border:3px solid #102A49;
background-color:#daa5d5;
color: black;
height: 130px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;



a{
    font-size: 20px;
}
`

export default Footer;