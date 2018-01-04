import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios';
import getDate from '../libs/getDate';
import {Link} from 'react-router-dom';
class PostList extends Component {

    state = {
        posts : []
    }

    componentDidMount(){
        const {posts} = this.state;
        axios.get('/api/post/list', {})
        .then((res) => {
            this.setState({
                posts : res.data.posts
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    removePost(e){
        axios.post('/api/post/delete', {
            id : e.target.id
        })
        .then((res) => {
            if(res.data.message === "success"){
                alert("삭제가 완료되었습니다");
                window.location.reload();
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    render(){
        const {posts} = this.state;
        const {removePost} = this;
        const postList = (
            posts.map((post, key) => {
                const created_at = getDate(post.created_at);
                return (
                    <tr key={key}>
                        <td>
                            <Link to={`/post/modify/${post.id}`}>
                            {post.title}
                            </Link>
                        </td>
                        <td>
                            {created_at.year} - {created_at.month} - {created_at.day}
                        </td>
                        <td> 
                        <button className="btn btn-danger" id={post.id} onClick={removePost}>삭제하기</button>
                        </td>
                    </tr>
                )
            })
        );
        return(
            <div>
                <table className="table table-bordered tabe-hovered">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList}
                    </tbody>
                </table>
                <LinkContainer to="/post/form">
                <button className="btn btn-primary">작성하기</button>
                </LinkContainer>
            </div>
        )
    }
}

export default PostList;