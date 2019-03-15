
import React, { Component } from 'react';
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Post from './Post'
import App from './App'

var host_url = 'http://127.0.0.1:8000';
//host_url = 'https://project-cmput404.herokuapp.com';
var post_url = host_url+'/api/author/posts';
var user_url = host_url+'/api/authors/';
var getposts_url = host_url+'/api/posts'; 

var global_state = null;
class Homepage extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

     
    global_state = this.props.author_state; 
    send_post(){
        
        var data = {
            "permission": document.getElementById("exampleCustomSelect").value,
            "content":document.getElementById("exampleText").value,
            "title":"This title is hardcoded",
          };
          console.log(data);
          console.log("this is the token " + this.props.author_state.token);
          console.log("this is the username " + this.props.author_state.username);
          console.log("this is the props author state " + this.props.author_state);
          console.log("this is the props " + this.props);
          fetch(post_url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'token '+this.props.author_state.token,
            }
          })
          .then(res => res.json())
          .then(response => {
            // console.log('Success:', JSON.stringify(response));
            if (response.hasOwnProperty("success")){
              
              console.log(response);
            }
      
          })
          .catch(error => console.error('Error:', error));
    }

    get_posts() {
        console.log("in get posts " + this.props.author_state.token); 
    
        fetch(getposts_url, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              //'Authorization': 'token ' + this.props.author_state.token,
            }
          })
          .then(res => res.json())
          .then(response => {
            console.log('Success:', JSON.stringify(response));
            if (response.hasOwnProperty("token")){
                this.setState({login:true, token: response["token"]});
                console.log(this.props.author_state.token);
              } else{
                document.getElementById('alert').innerHTML = JSON.stringify(response);
              }
      
          })
          .catch(error => console.error('Error:', error));
    }
    
    get_events(){
        console.log('this is using author state' + this.props.author_state.token);
        console.log('this is using global state ' + global_state);
        console.log('this is using global state name ' + global_state.username);
        console.log("asfasfsfdfasfsfs");
        console.log('this is the state ' + this.props.author_state);
        console.log('this is the author ' + this.props.author_state.username);
        // Nested function that gets github of user
        var name = this.props.author_state.username;
        var user_token = this.props.author_state.token; 
        console.log('in get events global state' + global_state.username);
            function get_git(global_state) {
                fetch(user_url+'/'+global_state.username+'/', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + global_state.token,
                    'username': global_state.username, 
                }
                })
                .then(res => res.json())
                .then(response => {
                console.log('Success:', JSON.stringify(response));
                if (response.hasOwnProperty("githubUrl")){
                    //this.setState({login:true, githubUrl: response["githubUrl"]});
                    console.log(global_state.token);
                    author_git = response["githubUrl"];
                } else{
                    document.getElementById('alert').innerHTML = JSON.stringify(response);
                    console.log("couldn't find git for" + global_state.username)
                    author_git = null; 
                }
            
                })
                .catch(error => console.error('Error:', error));
                return author_git
            }
  
      var author_git = get_git(); 
      if (author_git === false) { 
        console.log("couldn't pass author's git");
        return; 
      }
  
      else {
        fetch('https://api.github.com/users/' + author_git + '/events', {
        method: 'GET', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
      })
      .catch(error => console.error('Error:', error));
  
      } 
  }
    
    toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
    }

    render(){
        console.log("this is the prop")
        console.log(this.props.author_state.token)
        return(
            <center>
                <Button id='post' size='sm' color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Make Post!</Button>
               
                
                <Col sm="9">
                    <Collapse isOpen={this.state.collapse}>
                    <Form className="postForm">
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Image URL" />
                                <InputGroupAddon addonType="append">
                                <Button color="secondary">Upload from local(not available)</Button>
                                </InputGroupAddon>
                                {/* <InputGroupAddon addonType="append">
                                <Input type="file" name="file" id="exampleFile" />
                                </InputGroupAddon> */}
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                                <option value="">Who can view?</option>
                                <option value="M">Me only</option>
                                <option value="L">Another author</option>
                                <option value="F">My friends</option>
                                <option value="FF">Friends of friends</option>
                                <option value="FH">Only friends on my host</option>
                                <option value="P">Public</option>
                            </CustomInput>
                            <CustomInput type="select" id="exampleCustomMutlipleSelect" name="customSelect" disabled>
                                <option value="">Which auther can view?</option>
                                <option>Author 1</option>
                                <option>Author 2</option>
                                <option>Author 3</option>
                                <option>Author 4</option>
                                <option>Author 5</option>
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder="Tell us something!" />
                                <InputGroupAddon addonType="append">
                                <Button color="secondary" onClick={()=> {this.send_post();}}>Post!</Button>
                                </InputGroupAddon>
                            </InputGroup> 
                        </FormGroup>
                    </Form>
                    
                    </Collapse>

                    <h4>Your available posts:</h4>
                    
                    <Button id='get_posts' size='sm' color="primary" onClick={this.get_posts()} style={{ marginBottom: '1rem' }}>Get Posts</Button>
                    <Button id='get_stream' size='sm' color="primary" onClick={this.get_events} style={{ marginBottom: '1rem' }}>Get Git Events</Button>
                    <Col sm="6">
                        <div>
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </div>
                        
                    </Col>
                    
                </Col>
            </center>
            
        );
        
    }
}

export default Homepage;