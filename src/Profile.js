import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Form, FormGroup, Label, Col, Spinner, Alert } from 'reactstrap';


var url="https://project-cmput404.herokuapp.com/api/author/profile/"
//url='http://localhost:8000/api/author/profile/'
class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            author:null,
            success:null,
            messsage:null
        };
        this.saveProfile = this.saveProfile.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }
    componentDidMount(){
        console.log(this.props.author_state.token)
        this.getProfile()

        
    }

    getProfile(){
        fetch(url, {
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'token '+this.props.author_state.token,
            }
        })
        .then(res => res.json())
        .then(response => {
        this.setState({
            author:response
        });

        })
        .catch(error => console.error('Error:', error));
    }

    saveProfile(){
        var body={
            "firstName": document.getElementById("firstName").value,
            "lastName": document.getElementById("lastName").value,
            "username": document.getElementById("userName").value,
            "githubUrl":document.getElementById("githubUrl").value
        }
        fetch(this.state.author.url+'/', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'token '+this.props.author_state.token,
            }
        })
        .then(res => res.json())
        .then(response => {
        if(response.success==true){
            this.setState({success:true})
        }
        else{
            this.setState({success:false,message:response.message})
            document.getElementById('alert').value=response.message
        }
        })
        .catch(error => console.error('Error:', error));
    }
    

    render(){
        console.log(this.state.author)
        if(this.state.author){
            document.getElementById("firstName").value=this.state.author.firstName
            document.getElementById("lastName").value=this.state.author.lastName
            document.getElementById("userName").value=this.state.author.username
            document.getElementById("githubUrl").value=this.state.author.githubUrl
        }
        return(
            <center>
                 <Col sm="9">
                    <Form style={{paddingTop:20}}>
                        <FormGroup>
                        <Label for="firstName">FirstName</Label>
                        <Input name="firstName" id="firstName" placeholder="Please Enter Your FirstName" />
                        </FormGroup>
                        <FormGroup>
                        <Label for="lastName">LastName</Label>
                        <Input  name="lastName" id="lastName" placeholder="Please Enter Your LastName" />
                        </FormGroup>
                        <FormGroup>
                        <Label for="userName">UserName</Label>
                        <Input  name="userName" id="userName" placeholder="Please Enter Your UserName" />
                        </FormGroup>
                        <FormGroup>
                        <Label for="githubUrl">Github Url</Label>
                        <Input  name="githubUrl" id="githubUrl" placeholder="Please Enter Your Github Url" />
                        </FormGroup>
                        <Button onClick={this.saveProfile}>Save</Button>
                        {this.state.success &&
                        <Alert color="primary" id="text">
                        Successfully Updated</Alert>
                        }
                    </Form>
                 </Col>
            </center>
        
        
        )
        
    }



}
export default Profile;
