import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
// const NavbarInstance = () => (
    


//   );
class Header extends Component {

    state = {
        isLogin : false
    }

    componentDidMount(){
        axios.get('/api/member/status',{})
        .then((res) => {
            if(res.data.isLogin){
                this.setState({
                    isLogin : true
                });
            }
            else{
                this.setState({
                    isLogin : false
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleLogout = () => {
        axios.post('/api/member/logout', {})
        .then((res) => {
            if(res.data.message === "success"){
                alert("로그아웃 되었습니다.");
            document.location.href = "/";
            }
        })
        .catch((err) => {
            console.log(err);
        })

        console.log("clicked");
    }
    
    render(){
        const {isLogin} = this.state;
        const {handleLogout} = this;

        const LoginNavItem = () => (
            <LinkContainer to="/member/login">
                <MenuItem eventKey={3.3}>LogIn</MenuItem>
            </LinkContainer>
        );

        const JoinNavItem = () => (
            <LinkContainer to="/member/join">
            <MenuItem eventKey={3.1}>Join</MenuItem>
            </LinkContainer>
        );

        const MyPageNavItem = () => (
            <MenuItem eventKey={3.2}>My Page</MenuItem>
        );

        const LogoutNavItem = () => (
            <MenuItem eventKey={3.3} onClick={handleLogout}>Log Out</MenuItem>
        );

        const PostNavItem = () => (
            <LinkContainer to="/post">
            <MenuItem eventKey={3.4}>Post List</MenuItem>
            </LinkContainer>
        );

        const NotLoggedInNav = () => (
            <NavDropdown eventKey={3} title="Member" id="basic-nav-dropdown">
                <JoinNavItem/>
                <LoginNavItem/>
            </NavDropdown>
        );

        const LoggedInNav = () => (
            <NavDropdown eventKey={3} title="Member" id="basic-nav-dropdown">
                <MyPageNavItem/>
                <PostNavItem/>
                <LogoutNavItem/>
            </NavDropdown>
        );
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link to="/">MALL</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <NavItem eventKey={1} href="#">Link</NavItem>
                    <NavItem eventKey={2} href="#">Link</NavItem>
                    {
                        isLogin ? <LoggedInNav/> : <NotLoggedInNav/>
                            
                    }
                    </Nav>
                    {/* <Nav pullRight>
                    <NavItem eventKey={1} href="#">Link Right</NavItem>
                    <NavItem eventKey={2} href="#">Link Right</NavItem>
                    </Nav> */}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;