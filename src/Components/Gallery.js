import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import './Gallery.css'
import {Link} from 'react-router-dom';

const masonryOptions = {
    transitionDuration : 0
};


class Gallery extends Component {
    render(){
        const {posts} = this.props;
        let childElements = posts.map((post, key) => {
            return (
                <li key={key} className="li_max">
                <Link to={`/post/detail/${post.id}`}>
                    <img src={`/uploads/${post.thumbnail}`} className="img_max"/>
                </Link>
                    <p className="p_padding">
                    <Link to={`/post/detail/${post.id}`}>
                        {post.title}
                    </Link>
                    </p>
                </li>
            );
        });
        return(
            <Masonry
                elementType={'ul'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
                >
                {childElements}
            </Masonry>
        )
    }
}

export default Gallery;