import React, {Component} from 'react';
import axios from 'axios';
class Detail extends Component {

    

    state = {
        post : []
    };

    componentWillMount(){
        axios.get(`/api/post/detail/${this.props.match.params.id}`, {})
        .then((res)=>{
            this.setState({
                post : res.data.post
            });
            console.log(this.state.post)
        })
        .catch((err) => {
            console.log(err);
        });

        
       
    }

    
    render(){
        const {post} = this.state;
        
        return(
            <table className="table table-bordered table-hovered">
                <tbody>
                    <tr>
                        <td>{post.title}</td>
                    </tr>
                    <tr>
                        <td>{post.price}원</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={`/uploads/${post.thumbnail}`} style={{maxWidth : "100%"}}/>
                            <img src={`/uploads/${post.photo1}`} style={{maxWidth : "100%"}}/>
                            <img src={`/uploads/${post.photo2}`} style={{maxWidth : "100%"}}/>
                            <img src={`/uploads/${post.photo3}`} style={{maxWidth : "100%"}}/>
                            <img src={`/uploads/${post.photo4}`} style={{maxWidth : "100%"}}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Detail;