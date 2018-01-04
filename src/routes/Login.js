import React, {Component} from 'react';
import axios from 'axios';
class Login extends Component {

    state = {
        username : '',
        password : ''
    }

    handleChange = (e) => {
        if(e.target.name === 'username'){
            this.setState({
                username : e.target.value
            })
        }
        if(e.target.name === 'password'){
            this.setState({
                password : e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        const {username, password} = this.state;
        e.preventDefault();

        if(!username){
            alert("아이디를 입력해주세요");
            return false;
        }
        if(!password){
            alert("비밀번호를 입력해주세요");
            return false;
        }

        axios.post('/api/member/login', {
            username : username,
            password : password
        })
        .then((res) => {
            if(res.data.message === "success"){
                alert("로그인 되었습니다");
                document.location.href = "/";
            }
            else{
                alert(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })


    }

    handleFacebook = () => {
        document.location.href='/api/auth/facebook';
    }
    render(){
        const {username, password} = this.state;
        const {handleChange, handleSubmit, handleFacebook} = this;
        return(
            <div>
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <form name="loginForm" action="" method="post" onSubmit={handleSubmit}>
                    <div className="jumbotron">
                        <h2>Login</h2>
                        <h3>아이디</h3>
                        <div className="form-group">
                            <input type="text" name="username" className="form-control"
                            value={username}
                            onChange={handleChange}/>
                        </div>
                        <h3>비밀번호</h3>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control"
                            onChange={handleChange}
                            value={password}/>
                        </div>
                        </div>
                        <button type="submit" className="btn btn-primary">로그인</button>
                        
                    </form>
                    <button className="btn btn-primary" onClick={handleFacebook}>
                            <i className="fa fa-facebook" aria-hidden="true"></i> 페이스북으로 로그인
                        </button>
                </div>
                <div className="col-md-2">
                </div>
            </div> 
        )
    }
}

export default Login;