import React, { Component } from 'react';
import { CardImg,BreadcrumbItem,Form,FormGroup,FormText,Input,Label,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';
import Markdown from 'markdown-to-jsx';
import { CardHeader,CardBody,InputGroup,InputGroupAddon} from 'reactstrap';
import FileBase64 from 'react-file-base64';

var host_url = 'http://localhost:8000'
var host_url = 'https://project-cmput404.herokuapp.com';
var post_url = host_url+'/api/authors/';
var url_follow=host_url+'/api/author/profile/';
var url_for_notification=host_url+'/api/notifications/';
var url_for_friendRequest=host_url+'/api/friendResult/';
var url_for_authors_posts=host_url+'/api/get_authors_posts/';
var requests;


var ajax_response=["","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf",];
var options=[];
class MyPosts extends Component{

    constructor(props) {
        super(props);
        this.save_post = this.save_post.bind(this);
        this.edit_post = this.edit_post.bind(this);
        this.state = {
            author:"",
            success:null,
            requests:"",
            can_edit:false,
            text:true,
            trick:true,
            messsage:null,
            files:{},
        };
        
    }

    

    componentDidMount(){
        console.log("entered the didmount in notifications");
        fetch(url_follow, {
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

    edit_post(id){
        //this.setState({ text: false});
        //this.refs.text_id.disabled=false;
        console.log("asdfafasdfadsfaf");
        console.log(id);

        console.log(document.getElementById(id));
        console.log((id.toString())+"b");

        var button_show_hide = document.getElementById((id.toString())+"edit_button");
        var save_button = document.getElementById((id.toString())+"s");
        var delete_button = document.getElementById((id.toString())+"d");
        button_show_hide.style.display="none";
        save_button.style.display="block";
        delete_button.style.display="block";
        document.getElementById(id).disabled=false;
    }

    save_post(id,post_info){

        
        var data = {
            "postid": post_info.postid,
            "title": post_info.title,
            "source": "http://127.0.0.1:8000/",
            "origin": "http://127.0.0.1:8000/",
            "contentType": post_info.contentType,
            "content": document.getElementById(id).value,
            "permission": post_info.permission,
            "unlisted": false,
        };
        if (post_info.contentType == "application/base64" || post_info.contentType === "image/png;base64" || post_info.contentType === "image/jpeg;base64"){
            data.content = this.state.files.base64
        }
        var button_show_hide = document.getElementById((id.toString())+"edit_button");
        var save_button = document.getElementById((id.toString())+"s");
        var delete_button = document.getElementById((id.toString())+"d");
        button_show_hide.style.display="block";
        save_button.style.display="none";
        delete_button.style.display="none";
        // document.getElementById(id).disabled=true;
        console.log("heres the post info")
        console.log(post_info.postid);

            var url = host_url+'/api/posts/'+post_info.postid+'/';
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers:{
                'Content-Type': 'application/json',
                'Authorization': 'token '+this.props.author_state.token,
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log("here is the reponse for the put");
                console.log(response);
            })
            .catch(error => console.error('Error:', error));
        }


        delete_post(id,post_info){

    
            var button_show_hide = document.getElementById((id.toString())+"edit_button");
            var save_button = document.getElementById((id.toString())+"s");
            var delete_button = document.getElementById((id.toString())+"d");
            button_show_hide.style.display="block";
            save_button.style.display="none";
            delete_button.style.display="none";
            console.log("heres the post info")
            console.log(post_info.postid);
    
                var url = host_url+'/api/posts/'+post_info.postid+'/';
                fetch(url, {
                    method: 'DELETE',
                    headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'token '+this.props.author_state.token,
                    }
                })
                .then(res => res.json())
                .then(response => {
                    console.log("here is the reponse for the put");
                    this.tryingthis();
                    console.log(response);
                    this.setState({}); 
                })
                .catch(error => console.error('Error:', error));
                
                
            }


       async tryingthis(){
        var user_data = {
            "author_id": this.state.author.author_id,
          };
           await fetch(url_for_authors_posts, {
                method: 'POST',
                body:JSON.stringify(user_data),
                headers:{
                'Content-Type': 'application/json',
                'Authorization': 'token '+this.props.author_state.token,
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                requests=response;
    
    
            })
            .catch(error => console.error('Error:', error));
        }


    
        getFiles(files){
            console.log(files);
            // document.getElementById(id).value = files.base64;
            this.setState({ files: files })
        }
    



    render(){
        console.log("asdfefafasdfase")
        console.log(this.state.author.author_id)
        console.log(this.props.author_state.token)
        
        
        if(this.props.author_state.token!=null){
            this.tryingthis();

         

        console.log("here is the authors posts");
        console.log(requests);

        //{this.state.can_edit &&
        try{
        if(requests!=null || requests.detail!="Invalid token."){

            //match1 if(!this.state.can_edit){
        
        var list_of_posts = requests.map((request,i) => 
        // {(request.contentType === "application/base64" || request.contentType === "image/png;base64" || request.contentType === "image/jpeg;base64") &&    
        
        //     <div></div>
        
        // },

        <Card style={{ textAlign: 'center', marginTop:20}}>
        <CardHeader tag="h3">{request.title}</CardHeader>
        <CardBody>
            <CardImg hidden={!(request.contentType === "application/base64" || request.contentType === "image/png;base64" || request.contentType === "image/jpeg;base64" )} top width="100%" src={request.content} alt="Card image cap" />
            <CardText>{request.author.username}</CardText> 
            <hr></hr>
            <CardText>{request.origin}</CardText>
            <hr></hr>
            <textarea id={i} disabled={(request.contentType === "application/base64" || request.contentType === "image/png;base64" || request.contentType === "image/jpeg;base64" )}>{request.content}</textarea>
            <FormGroup hidden={!(request.contentType === "application/base64" || request.contentType === "image/png;base64" || request.contentType === "image/jpeg;base64" )}>
                <Label for="exampleCustomFileBrowser">File Browser</Label>
                <FileBase64 multiple={ false } onDone={ this.getFiles.bind(this)}/>
            </FormGroup>
            <CardText>{(new Date(request.publicationDate)).toDateString()}</CardText>
            <CardText>{(new Date(request.publicationDate)).toTimeString()}</CardText>
            <InputGroup>
                <InputGroupAddon addonType="append">
                <Button id={(i.toString())+"edit_button"} onClick={()=> {this.edit_post(i)}} color="secondary">Edit Post</Button>
                </InputGroupAddon>
                <InputGroupAddon addonType="append">
                <Button id={(i.toString())+"s"} style={{display:"none"}} onClick={()=> {this.save_post(i,request)}} color="secondary">Save Post</Button>
                </InputGroupAddon>
                <InputGroupAddon addonType="append">
                <Button id={(i.toString())+"d"} style={{display:"none"}} onClick={()=> {this.delete_post(i,request)}} color="secondary">Delete Post</Button>
                </InputGroupAddon>
            </InputGroup>
        </CardBody>   
        </Card>
        );   
            //match1 }
            
            
            /* if(this.state.can_edit){
        
                var list_of_posts = requests.map((request) => 
                <Card style={{ textAlign: 'center'}}>
                <CardHeader tag="h3">{request.title}</CardHeader>
                <CardBody>
                    <CardText>{request.author.userName}</CardText> 
                    <hr></hr>
                    <CardText>{request.origin}</CardText>
                    <hr></hr>
                    <textarea ref="text_id" disabled={(this.state.text)}>{request.content}</textarea>
                    <CardText>{(new Date(request.publicationDate)).toDateString()}</CardText>
                    <CardText>{(new Date(request.publicationDate)).toTimeString()}</CardText>
                    <InputGroup>
                        <InputGroupAddon addonType="append">
                        <Button ref="save" onClick={this.save_post} color="secondary">Save Post</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </CardBody>   
                </Card>
        
                );   
                    } 

 */






    }
    }
    catch(err) {
        {}
      }




    }
        else{
            list_of_posts=<h1>You haven't posted anything </h1>
        }

        if(list_of_posts==null){
            list_of_posts=<h1>You haven't posted anything </h1>
        }
      return(
        
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            {list_of_posts}
        </Col>
        
        );

    }
}

export default MyPosts;
