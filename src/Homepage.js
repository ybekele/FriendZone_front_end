import React, { Component } from 'react';
import { CardImg, Label, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Post from './Post'
import FileBase64 from 'react-file-base64';
import base64 from 'react-native-base64'

var host_url = 'http://127.0.0.1:8000';
host_url = 'http://copyfriendzonebackend.herokuapp.com';
var post_url = host_url+'/api/author/posts/';
var user_url = host_url+'/api/authors/';
var getposts_url = host_url+'/api/author/posts/'; 
var url_for_authorId=host_url+'/api/author/profile/';
var url_follow=host_url+'/api/friendRequest/';

var ajax_response=["","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf",];
var foreign_url = 'https://cmput404-front-test.herokuapp.com';
var getforeignposts_url = foreign_url+'/api/posts/';
var options=[];

var global_state = null;
class Homepage extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleContent = this.toggleContent.bind(this);
        this.get_posts = this.get_posts.bind(this);
        this.get_events = this.getGithubEvent.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.get_foreignposts = this.get_foreignposts.bind(this);
        this.typeOnChange = this.typeOnChange.bind(this);
        this.state = {
             collapse: false, 
             collapse_search: false, 
             posts: [], 
             files: {},
             organized_posts: null 
             };
        
        this.get_posts();
    }

    componentDidMount(){
        this.setState({users_token:this.props.author_state.token})
        fetch(url_for_authorId, {
          method: 'GET',
          headers:{
          'Content-Type': 'application/json',
          'Authorization': 'token '+this.props.author_state.token,
          }
      })
      .then(res => res.json())
      .then(response => {
        console.log(response.author_id)
        this.setState({
          authorsId:response.author_id
      });
    
    
      })
      .catch(error => console.error('Error:', error));
    
    
      }

      search(){
        console.log("her eis the passwed username")
        console.log(this.props.username);
        this.state = {
          users_token: this.props.author_state.token,
          ajax_response:[],
          usersname:this.props.author_state.username,
          authorsId:"",
        };
    
        console.log(this.state.usersname)
        console.log(this.state.users_token)
        var user_data = {
            "users_search": document.getElementById("search_for_author").value,
            "firstName": document.getElementById("search_for_author").value,
            "githubUrl": 'http://github.com/kkk',
            "hostName": 'http://127.0.0.1:8000',
            "lastName": document.getElementById("search_for_author").value,
            "userName": this.state.usersname,
          };
          console.log(user_data);
    
          fetch(post_url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(user_data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'token '+this.state.users_token,
            }
          })
          .then(res => res.json())
          .then(response => {
            // console.log('Success:', JSON.stringify(response));
    
            //if (response.hasOwnProperty("success")){
              console.log("here is the response from server")
              console.log(response);
              ajax_response=response;
              console.log("this is the first ajax response")
              console.log(ajax_response)
              this.setState({ajax_response:response})
              //this.setState.ajax_response=response
    
    
            //}
    
          })
          .catch(error => console.error('Error:', error));
    }
    
      follows(userToFollow){
    
        var user_data = {
            "to_author": userToFollow,
            "from_author":this.state.authorsId,
          };
          console.log(this.state.authorsId);
          console.log("here is the token");
          console.log(this.state.users_token);
          console.log("here is the token from props");
          console.log(this.props.author_state.token);
    
          fetch(url_follow, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(user_data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'token '+this.props.author_state.token,
            }
          })
          .then(res => res.text())
          .then(response => {
            // console.log('Success:', JSON.stringify(response));
    
            //if (response.hasOwnProperty("success")){
              console.log("here is the response for follow")
              console.log(response);
    
    
    
              //this.setState.ajax_response=response
    
    
            //}
    
          })
          .catch(error => console.error('Error:', error));
       
    
      
    
    }



    getFiles(files){
        console.log(files);
        this.setState({ files: files })
    }

    toggleContent (event) { 
        event.prevenDefault()
    }

    send_post(){
        
        var data = {
            "permission": document.getElementById("exampleCustomSelect").value,
            "content": document.getElementById("contentText").value,
            "title": document.getElementById("titleText").value,
            "images":[],
            "contentType":document.getElementById("textType").value
        };
        
        if (document.getElementById("textType").value === "application/base64" || document.getElementById("textType").value === "image/png;base64" || document.getElementById("textType").value === "image/jpeg;base64"){
            document.getElementById("contentText").value = 'image';
            document.getElementById("contentText").disabled = true;
            data.content = this.state.files.base64;
        }
        // console.log(data);
        // console.log("this is the token " + this.props.author_state.token);
        // console.log("this is the username " + this.props.author_state.username);
        // console.log("this is the props author state " + this.props.author_state);
        // console.log("this is the props " + this.props);
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
        console.log('Success:', JSON.stringify(response));
        if (response.hasOwnProperty("success")){
            this.toggle();
            console.log(response);
            this.get_posts()
        }
    
        })
        .catch(error => console.error('Error:', error));
    }

    do_all() { 
        if (this.githubURL != 'null') {
            this.getGithubEvent()
        }
        this.get_posts()
        this.get_foreignposts()
        
    }

    get_posts() {
        // console.log("in get posts " + this.props.author_state.token); 
    
        fetch(getposts_url, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'token ' + this.props.author_state.token,
            }
        })
        .then(res => res.json())
        .then(response => {
        console.log(response);
        if (response.hasOwnProperty("posts")){
            // console.log(response);
            this.setState({posts: response.posts});
            // this.state.posts = 
        }
        else{
            this.setState({posts: []})
        }
    
        })
        .catch(error => console.error('Error:', error));
    }


get_foreignposts() {
    // console.log("in get posts " + this.props.author_state.token); 
    // console.log('Basic ' + base64.encode('yonael_team' + ':' + 'EBXxU&qyW$687cMb%mmB'))
    fetch("https://project-cmput404.herokuapp.com/api/remote/author/posts/", {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                // 'Origin': 'https://cmput404-front-test.herokuapp.com',
                // 'X-Request-User-ID': 'https://project-cmput404.herokuapp.com/author/e360bb9d-b63c-4c1b-8648-6019e61fe04f',
                // 'Authorization': 'Basic ' + base64.encode('yonael_team' + ':' + 'EBXxU&qyW$687cMb%mmB'),
            }
    })
    .then(res => res.json())
    .then(response => {
        console.log('this is the response')
        console.log(response);
            for (var i = 0; i< response.posts.length; i++){
                this.state.posts.push(response.posts[i]);
            }
            this.setState({});
            // console.log(this.state.comments);
        })
        .catch(error => console.error('Error:', error));
    
}

    typeOnChange(){
        if (document.getElementById("textType").value === "application/base64" || document.getElementById("textType").value === "image/png;base64" || document.getElementById("textType").value === "image/jpeg;base64"){
            document.getElementById("contentText").value = 'image';
            document.getElementById("contentText").disabled = true;
        } else{
            document.getElementById("contentText").disabled = false;
        }
    }    

    async getGithubEvent(){
        var githubUsername = 'github';
        // get user profile
        await fetch("https://project-cmput404.herokuapp.com/api/author/profile/", {
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'token '+this.props.author_state.token,
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            githubUsername = response.githubUrl.split('/');
            githubUsername = githubUsername[githubUsername.length-1]
            console.log(githubUsername);

            // console.log(this.state.comments);
        })
        .catch(error => console.error('Error:', error));
        

        fetch('https://api.github.com/users/'+githubUsername+'/events', {
        method: 'GET', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
        }
        })
        .then(res => res.json())
        .then(response => {
        console.log(response);
        for (var i = 0; i< 10; i++){
            this.state.posts.push({
                "postid": "",
                "publicationDate": response[i].created_at,
                "title": "Github Event",
                "source": "",
                "origin": "",
                "contentType": "",
                "author": {
                  "url": "",
                  "pk": "",
                  "firstName": null,
                  "lastName": "",
                  "userName": response[i].actor.login,
                  "hostName": "",
                  "githubUrl": ""
                },
                "content": response[i].type + " on url: "+response[i].repo.url,
                "permission": "",
                "categories": [],
                "unlisted": false,
                "visibleTo": []
            }) 
        };
        
        this.setState({});
        })
      . catch(error => console.error('Error:', error));
    }


    toggle() {
        window.scrollTo(0, 0);
        this.setState(state => ({ collapse: !state.collapse }));
    }

    toggle_search() {
        window.scrollTo(0, 0);
        this.setState(state => ({ collapse: !state.collapse_search }));
    }

    render(){
        // console.log("this is the prop")
        // console.log(this.props.author_state.token)
        // console.log(this.state.posts)
        if(this.state.posts.length > 0){
        var posts= this.state.posts.map(post =>{
            return(
                <Col sm="6">
                    <div className = 'cardstyle'>
                    <Post id='cardstyle' author_state={this.props.author_state} value={post}/>
                    </div>
                    {/* <Post id='cardstyle' author_state={this.props.author_state} value={post}/> */}
                </Col>
            )})
        }
        else{
            // document.body.style = 'background: linear-gradient(#bdc3c7, #2c3e50);'
            var posts="NO POSTS";
        }
        this.state.posts.sort(function(a, b){return (new Date(b.publicationDate) - new Date(a.publicationDate))});
        return(
            <center>
                <Button id='post' size='sm' color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', zIndex:2 }}>Make Post!</Button>
               
                
                <Col sm="9">
                    <Collapse isOpen={this.state.collapse}>
                    <div style={{paddingTop:20}}></div>
                    <Form className="postForm">
                        <FormGroup>
                            <Label for="exampleCustomFileBrowser">File Browser</Label>
                            <FileBase64 multiple={ false } onDone={ this.getFiles.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect" >
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
                            <CustomInput type="select" id="textType" name="customSelect" onChange={this.typeOnChange}>
                                <option value="">Type of Post?</option>
                                <option value="text/plain">Simple Plain Text</option>
                                <option value="text/markdown">Markdown</option>
                                <option value="application/base64">application/base64</option>
                                <option value="image/png;base64">image/png;base64</option>
                                <option value="image/jpeg;base64">image/jpeg;base64</option>
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Input type="textarea" name="text" id="titleText" placeholder="What's your title?" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <Input type="textarea" name="text" id="contentText" placeholder="Tell us something!" />
                                <InputGroupAddon addonType="append">
                                <Button color="secondary" onClick={()=> {this.send_post();}}>Post!</Button>
                                </InputGroupAddon>
                            </InputGroup> 
                        </FormGroup>
                    </Form>                    
                    </Collapse>
                </Col>

                    <div classname = 'buttons'>
                        <Button id='get_posts' size='sm' color="primary" onClick={this.get_posts} style={{ marginBottom: '1rem' }}>Get Posts</Button>
                        <Button id='get_stream' size='sm' color="primary" onClick={this.get_events} style={{ marginBottom: '1rem' }}>Get Git Events</Button>
                        <Button id='get_stream' size='sm' color="primary" onClick={this.get_foreignposts} style={{ marginBottom: '1rem' }}>Get Foreign Posts</Button> 
                    </div>
                    
                    
                    {/* <Button id='get_stream' size='sm' color="primary" onClick={this.do_all} onClick={this.get_posts} onClick={this.getGithubEvent} style={{ marginBottom: '1rem' }}>Refresh!</Button>  */}
                                                                       
                    {posts}
                    
               
            </center>


            
        );
        
    }
}

export default Homepage;
