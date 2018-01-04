import React, {Component} from 'react';
import "./Chat.css";
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../Events/Events';
import $ from 'jquery';
const socketUrl = "http://192.168.0.23:8080";

class Chat extends Component{
    
    state = {
        socket : null,
        user : null,
        message : '',
        renderMessage : '',
        userList : ''
    };

    componentDidMount(){
        const {initSocket} = this;
        initSocket();
    }


    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log("connected");
        });

        socket.on('join', (data) => {
            console.log(data);
            // for(var key in data.userList){
            //     this.setState({
            //         userList : this.state.userList + `<strong>${data.userList[key]}</strong><br/>`
            //     })
            // }
            // this.setState({
            //     userList : data.userList
            // })
        });

        socket.on('leave', () => {
            console.log("LEAVED!");
        });

        socket.on('chat message', (data) => {
            console.log(data.message);
            console.log(data.id)
            // let messages = `${data.message}` + <br/>;
            this.setState({
                renderMessage : this.state.renderMessage + `<strong>${data.id} : ${data.message}</strong><br/>`
            });
        });

        this.setState({
            socket
        });
    }

    setUser = (user) => {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    }

    logout = () => {
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({
            user : null
        });
    }

    handleChange = (e) => {
        if(e.target.name === 'message'){
            this.setState({
                message : e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        const {socket} = this.state;
        e.preventDefault();

        socket.emit('chat message', {message : this.state.message});
        this.setState({
            message : ''
        });
        this.chatBody.focus();
        return false;



    }
    render(){
        const {handleChange, handleSubmit} = this;
        const {message, renderMessage, userList} = this.state;
        let messages = renderMessage;
        let userLists = userList;
        return(
            <div>
            <div className="row">
                <div className="col-sm-10">
                    <div className="panel panel-default" id="chatWrap">
                        <div className="panel-heading">대화내용</div>
                        <div className="panel-body">
                            <ul id="chatBody" ref={ref=>{this.chatBody=ref}}>
                            <div dangerouslySetInnerHTML={ {__html: messages} }>
                            </div>
                            </ul>
                        </div>
                    </div>
                </div> 
                <div className="col-sm-2">
                    <div className="panel panel-default" id="userWrap">
                        <div className="panel-heading">User</div>
                        <div className="panel-body">
                            <ul id="userList">
                            <div dangerouslySetInnerHTML={ {__html: userLists} }>
                            </div>
                            </ul>  
                        </div>
                    </div>
                </div>     
            </div>
            <div>
            <form action="" method="post" id="sendForm" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="hidden" name="socketId"/>
                    <input type="text" name="message" value={message} onChange={handleChange} className="form-control" placeholder="대화내용을 입력해주세요."/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary">작성하기</button>
                    </span>
                </div>
            </form>  
            </div>
            </div>
        )
    }
}

export default Chat;