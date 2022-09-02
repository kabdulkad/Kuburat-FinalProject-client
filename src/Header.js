import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"


const Header = () => {
    const { loginWithRedirect } = useAuth0()
    const { logout} = useAuth0()
    const {user, isAuthenticated, isLoading } =useAuth0()
    console.log(user)
    return(
        <MainDiv>
            <HeaderDiv>
                <h1>LOGO</h1>
                {isAuthenticated ?
                <>
                <p>WELCOME {user.name}</p>
                <button onClick={()=>logout({returnTo:window.location.origin})}>SignOut</button>
                <NavLink to="/savings" exact>Savings</NavLink>    
                <NavLink to="/investment" exact>Financial News</NavLink>
                
                </>

                :
                <>
                <NavLink to="/" exact>Homepage</NavLink>

                <button onClick={()=>loginWithRedirect()}>SignIn</button>


                </>
                }
            
                </HeaderDiv>


        </MainDiv>
    )
}

const MainDiv = styled.div`
border: 3px solid #334a33;
width: 100%;
height: 130px;
background-color: #a7c2a7;

h1{
    color: black;
    font-size: 25px;
    flex: 0.3px;
    /* border: 3PX solid white; */
    border-radius:10px;
    width: 30px;
    margin-left: 10px;
}
`

const NavLink = styled(Link)`
color: black;
text-decoration: none;
font-size: 25px;
padding: 15px;

`
const HeaderDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items:center; //this isn't making the text be in the center of the div

`
export default Header;