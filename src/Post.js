import React, { Component } from 'react';
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, CardHeader, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
var host_url = 'https://project-cmput404.herokuapp.com';

function CommentList(props){
    const comments = props.comments;
    const commentItems = comments.map(
        (comment) =>
        <li className="comment">
            <p>{"Author: "+comment.author}</p>
            <p>{"Comment: "+ comment.comment}</p>
        </li>
    );
    return(
        <ul>{commentItems}</ul>
    )
}

class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{
                "postid": "",
                "publicationDate": "",
                "title": "title",
                "source": "",
                "origin": "",
                "contentType": "",
                "author": {
                  "url": "",
                  "pk": "",
                  "firstName": null,
                  "lastName": "",
                  "userName": "",
                  "hostName": "",
                  "githubUrl": ""
                },
                "content": "content",
                "permission": "",
                "categories": [],
                "unlisted": false,
                "visibleTo": []
            },
            comments: [],
            getComment: true,
            author_state: {"user":{"id":4,"username":"","email":""},"token":"","isActive":true}
        };
    }
    

    render(){
        // this.setState({data: this.props.value});
        this.state.data = this.props.value;
        this.state.author_state = this.props.author_state;
        console.log(this.state.data);
        
        if (this.state.getComment && this.state.data.title !== "Github Event"){
            var url = "https://project-cmput404.herokuapp.com/api/posts/"+this.state.data.postid+"/comments/";
            fetch(url, {
                method: 'GET',
                headers:{
                'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
            this.setState({comments: response.comments, getComment: false});
            console.log(this.state.comments);
            })
            .catch(error => console.error('Error:', error));
        }
        if (this.state.data.title !== "Github Event"){
            return (
                <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardHeader tag="h3">{this.state.data.title}</CardHeader>
                    <CardBody>
                        <CardText>{"Author: "+this.state.data.author.userName}</CardText> 
                        <CardText>{this.state.data.content}</CardText>
                        {/* <CardText>{JSON.stringify(this.state.comments)}</CardText> */}
                        <CommentList comments = {this.state.comments} />
                        <InputGroup>
                            <Input type="textarea" name="text" id="exampleText" placeholder="Leave a comment!" />
                            <InputGroupAddon addonType="append">
                            <Button color="secondary">Post!</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </CardBody>
                </Card>
            )
        } else {
            return (
                <Card>
                    <CardImg top width="100%" src="https://github.githubassets.com/images/modules/open_graph/github-mark.png" alt="Card image cap" />
                    <CardHeader tag="h3">{this.state.data.title}</CardHeader>
                    <CardBody>
                        <CardText>{"Author: "+this.state.data.author.userName}</CardText> 
                        <CardText>{this.state.data.content}</CardText>
                    </CardBody>
                </Card>
            )
        }
        
    }
}

export default Post;