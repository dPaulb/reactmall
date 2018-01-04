import React, {Component} from 'react';
import axios from 'axios';
class Join extends Component {

    state = {
        username : '',
        password : '',
        displayname : ''
    };

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
        if(e.target.name === 'displayname'){
            this.setState({
                displayname : e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        const {username, password, displayname} = this.state;
        e.preventDefault();
        
        if(!username){
            alert("아이디를 입력해주세요");
            return false;
        }

        if(!password){
            alert("패스워드를 입력해주세요");
            return false;
        }
        if(!displayname){
            alert("닉네임을 입력해주세요");
            return false;
        }

        axios.post('/api/member/join', {
            username : username,
            password : password,
            displayname : displayname
        })
        .then((res)=>{
            if(res.data.message === "success"){
                alert("가입 되었습니다");
                this.props.history.push("/");
            }
            if(res.data.message === "exists"){
                alert("이미 있는 아이디입니다");
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        const {username, password, displayname} = this.state;
        const {handleChange, handleSubmit} = this;
        return(
            <div>
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <form name="joinForm" action="" method="post" onSubmit={handleSubmit}>
                    <div className="jumbotron">
                        <h2>Join</h2>
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
                        <h3>닉네임</h3>
                        <div className="form-group">
                            <input type="text" name="displayname" className="form-control"
                            value={displayname}
                            onChange={handleChange}/>
                        </div>
                        </div>
                        <button className="btn btn-primary">회원가입</button>
                    </form>
                </div>
                <div className="col-md-2">
                </div>
            </div>  
        )
    }
}

export default Join;