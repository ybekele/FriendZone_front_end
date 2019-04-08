import React, { Component } from 'react';
import { Breadcrumb,BreadcrumbItem,Form,FormGroup,FormText,Input,Label,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';

var host_url = 'http://localhost:8000'
var host_url = 'https://project-cmput404.herokuapp.com';
var remote_url = host_url+'/api/remote/authors/';
var remoteFriend_url = host_url+'/api/remote/friendRequest/';
var url_follow=host_url+'/api/author/profile/';
var url_for_friends=host_url+'/api/authors/';
var url_for_unfriend=host_url+'/api/unfriend/';
var requests;
var remote_authors;


var ajax_response=["","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf",];
var options=[];
class MyFriends extends Component{

    constructor(props) {
        super(props);
        this.state = {
            author:"",
            success:null,
            requests:"",
            hacky:"",
            messsage:null
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

        /*second ajax to get remote authors*/

        

    }

    follow(author_data){

        //document.getElementById("unfollow_button").disabled = true;

        var user_data = {
            "query":"friendrequest",
            "author": {"host":host_url,
            "id":host_url+'/api/authors/'+this.state.author.author_id,
            "displayName":this.state.author.username,
            "url":host_url+'/api/authors/'+this.state.author.author_id
            },
            "friend": {"host":author_data.hostName,
            "id":author_data.url+'/'+author_data.author_id,
            "displayName":author_data.username,
            "url":author_data.url
            },
          };

        console.log(user_data)
        fetch(remoteFriend_url, {
            method: 'POST',
            body:JSON.stringify(user_data),
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'token '+this.props.author_state.token,
            }
        })
        .then(res => res.text())
        .then(response => {
            console.log("Here is the response after rejecting the request")
            console.log(response)
            this.setState({hacky:""})
        


        })
        .catch(error => console.error('Error:', error));

    }






    render(){
        console.log("hers is the toek in myfrinds");
        console.log(this.state.author.author_id)
        

        if(this.props.author_state.token!=null){
            console.log(this.props.author_state.token);
            fetch(remote_url, {
                method: 'GET',
                headers:{
                'Content-Type': 'application/json',
                'Authorization': 'token '+this.props.author_state.token,
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                remote_authors=response;
            


            })
            .catch(error => console.error('Error:', error));

          console.log("here is remote authors")
          console.log(remote_authors)
        
        try{
            console.log("asdfasdfasdfsadfa")
        if(remote_authors!=null){
            console.log(remote_authors.username)
        var list_of_pple = remote_authors.map((request) => 
            <tr>
                <th scope="row">{request.username}</th>
                <td>   
                {/* <Button id="unfollow_button" onClick={()=> {this.unfollow(request.author_id)}}>Unfollow This Author</Button> */}
                <Button id="follow" onClick={()=> {this.follow(request)}}>Send a Follow</Button>
                </td>
            </tr>
        
        
   
        //<Button>Accept request</Button>
        


        

        );
        }
    }
    catch(err) {
        {console.log(err)}
      }    



    }
        else{
            list_of_pple=""
        }


      return(
        <center>
            <Col sm="9">
                <Table hover>
                <thead>
                    <tr>
                        <th>User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {list_of_pple}
                </tbody>
                </Table>
            </Col>
        </center>
        );

    }
}

export default MyFriends;
