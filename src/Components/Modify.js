import React, {Component} from 'react';
import axios from 'axios';
class Modify extends Component {
    state = {
        post : [],
        id : '',
        title : '',
        price : '',
        thumbnail : '',
        bodyThumbnail1 : '',
        bodyThumbnail2 : '',
        bodyThumbnail3 : '',
        bodyThumbnail4 : ''
    };

    componentDidMount(){
        axios.get(`/api/post/detail/${this.props.match.params.id}`, {})
        .then((res) => {
            this.setState({
                
                post : res.data.post,
                id : res.data.post.id,
                title : res.data.post.title,
                price : res.data.post.price,
                
                
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleChange = (e) => {
        let result = {};
        result[e.target.name] = e.target.value;
        this.setState(result);
    };

    handleFile = (e) => {
        if(e.target.name === "thumbnail"){
            this.setState({
                thumbnail : e.target.files[0]
            });
        }
        if(e.target.name === "bodyThumbnail1"){
            this.setState({
                bodyThumbnail1 : e.target.files[0]
            });
        }
        if(e.target.name === "bodyThumbnail2"){
            this.setState({
                bodyThumbnail2 : e.target.files[0]
            });
        }
        if(e.target.name === "bodyThumbnail3"){
            this.setState({
                bodyThumbnail3 : e.target.files[0]
            });
        }
        if(e.target.name === "bodyThumbnail4"){
            this.setState({
                bodyThumbnail4 : e.target.files[0]
            });
        }
    }

    handleSubmit = (e) => {
        const {title, price, thumbnail, bodyThumbnail1, bodyThumbnail2, bodyThumbnail3, bodyThumbnail4, id} = this.state;
        e.preventDefault();
        if(!title){
            alert("제목을 입력해주세요");
            return false;
        }
        if(!price){
            alert("가격을 입력해주세요");
            return false;
        }
        if(!thumbnail){
            alert("수정할 파일을 입력해주세요");
            return false;
        }
        
        if(!bodyThumbnail1){
            alert("수정할 파일을 입력해주세요");
            return false;
        }
        if(!bodyThumbnail2){
            alert("수정할 파일을 입력해주세요");
            return false;
        }
        if(!bodyThumbnail3){
            alert("수정할 파일을 입력해주세요");
            return false;
        }
        if(!bodyThumbnail4){
            alert("수정할 파일을 입력해주세요");
            return false;
        }
        const formData = new FormData();
        formData.append('thumbnail', thumbnail);
        formData.append('bodyThumbnail1', bodyThumbnail1);
        formData.append('bodyThumbnail2', bodyThumbnail2);
        formData.append('bodyThumbnail3', bodyThumbnail3);
        formData.append('bodyThumbnail4', bodyThumbnail4);
        formData.append('title', title);
        formData.append('price', price);

        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        };
        axios.post(`/api/post/modify/${id}`, formData, config)
        .then((res) => {
            if(res.data.message === "success"){
                alert("수정이 완료되었습니다");
                this.props.history.push("/post");
            }
            if(res.data.message === "fileNotExists"){
                alert("수정할 파일을 넣어주세요");
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }



    render(){
        const {handleSubmit, handleChange, handleFile} = this;
        const {title, price ,bodyThumbnail1, bodyThumbnail2, bodyThumbnail3, bodyThumbnail4, thumbnail} = this.state;
        return (
            <div>
                <div className="col-md-2"/>
                <div className="col-md-8">
                <h2 style={{fontWeight : 600}}>글 작성</h2>
                <hr/>
                <form name="writeForm" action="" method="post" onSubmit={handleSubmit}>
                    <h3>제목</h3>
                    <div className="form-group">
                        <input type="text" 
                        name="title" 
                        className="form-control" 
                        placeholder="상품의 제목"
                        value={title}
                        onChange={handleChange}/>
                    </div>
                    <h3>가격</h3>
                    <div className="form-group">
                        <input type="text" 
                        name="price" 
                        className="form-control" 
                        placeholder="숫자만 입력해주세요"
                        value={price}
                        onChange={handleChange}/>
                    </div>
                    <h3>Thumbnail Photo</h3>
                    <div className="form-group">
                        <input type="file" name="thumbnail" className="form-control" onChange={handleFile}/>
                    </div>
                    <h3>본문 사용 사진</h3>
                    <h4>사진1</h4>
                    <div className="form-group">
                        <input type="file" name="bodyThumbnail1" className="form-control" onChange={handleFile}/>
                    </div>
                    <h4>사진2</h4>
                    <div className="form-group">
                        <input type="file" name="bodyThumbnail2" className="form-control" onChange={handleFile}/>
                    </div>
                    <h4>사진3</h4>
                    <div className="form-group">
                        <input type="file" name="bodyThumbnail3" className="form-control" onChange={handleFile}/>
                    </div>
                    <h4>사진4</h4>
                    <div className="form-group">
                        <input type="file" name="bodyThumbnail4" className="form-control" onChange={handleFile}/>
                    </div>
                    <button className="btn btn-primary">수정하기</button>
                </form>
                </div>
                <div className="col-md-2"/>
            </div>
        )
    }
}

export default Modify;