import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"
import { FiDollarSign } from "react-icons/fi";

const Header = () => {
    const { loginWithRedirect } = useAuth0()
    const { logout} = useAuth0()
    const {user, isAuthenticated, isLoading } =useAuth0()
    console.log(user)
    return(
        <MainDiv>
            <HeaderDiv>
            <FiDollarSign size={40} /><h1>avio</h1>
                {isAuthenticated ?
                <div>
                    <NavLink to="/savings" exact>Savings</NavLink>    
                    <NavLink to="/investment" exact>Financial News</NavLink>
                    <button className="click" onClick={()=>logout({returnTo:window.location.origin})}>SignOut</button>

                    <div>
                        <p className="welcome">Hello, <span className="user">{user.name}</span> </p>

                    </div>
                
                </div>

                :
                <>
                <NavLink to="/" exact>Homepage</NavLink>

                <button className="click" onClick={()=>loginWithRedirect()}>SignIn</button>


                </>
                }
            
                </HeaderDiv>


        </MainDiv>
    )
}

const MainDiv = styled.div`
border: 3px solid #102A49;
width: 100%;
height: 130px;
background-color:#daa5d5;
font-family: cursive;
.click{
    background-color: transparent;

    font-size: 20px;
    text-decoration: underline;
    font-style:italic;
    margin: 0 3px;
}
.user{
    font-style: italic;
    font-weight: bold;
}
.welcome{
    padding: 30px;
    margin-left:60px ;

}
h1{
    color: black;
    font-size: 25px;
    flex: 0.3px;
    /* border: 3PX solid white; */
    border-radius:10px;
    width: 30px;
    margin-left: -5px;
    padding: 0;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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