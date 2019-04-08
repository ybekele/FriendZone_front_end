import React, { Component } from 'react';
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, CardHeader, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const url="https://copyfriendzonebackend.herokuapp.com/api/posts/"+this.props.data.postid+'/comments/'
class Comments extends Component{
    constructor(props) {
        super(props);
        this.state= {
            "comments": ""
        }
    };

    componentDidMount(){
        fetch(url, {
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(response => {
        this.setState({
            comments:response.comments
        });
        console.log(this.state.comments);
        })
        .catch(error => console.error('Error:', error));
    }

    render(){
        console.log("Im in comments")
        console.log(this.state.comments)
        if(this.state.comments){
            return(
                <div>
                {this.state.comments.map(function(comment, index) {
                    return (
                        <div>
                            <p>Comment: {comment.comment}</p>
                        </div>
                )})}
                </div>
            )
        }
        else{
            return(null)
        }
    }
}
export default Comments;
