import React, {Component} from 'react';
import Gallery from '../Components/Gallery';
import axios from 'axios';
class Home extends Component {
    state = {
        posts : []
    }

    componentDidMount(){
        axios.get('/api/post/list', {})
        .then((res) => {
            this.setState({
                posts : res.data.posts
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }
    render(){
        const {posts} = this.state;
        return(
            <div>
                <Gallery posts={posts}/>
            </div>
        )
    }
}

export default Home;