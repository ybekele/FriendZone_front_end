import React, { Component } from 'react';
import { Breadcrumb,BreadcrumbItem,Form,FormGroup,FormText,Input,Label,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';

// var host_url = 'http://localhost:8000'
var host_url = 'https://project-cmput404.herokuapp.com';
var post_url = host_url+'/api/authors/';
var url_follow=host_url+'/api/author/profile/';
var url_for_notification=host_url+'/api/notifications/';
var url_for_friendRequest=host_url+'/api/friendResult/';
var requests;


var ajax_response=["","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf",];
var options=[];
class Notifications extends Component{

    constructor(props) {
        super(props);
        this.state = {
            author:"",
            success:null,
            requests:"",
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

    }


    accept_request(follower){
        document.getElementById("rej_button").disabled = true;
        document.getElementById("accept_button").disabled = true;
        var user_data = {
            "from_author": follower,
            "to_author": this.state.author.author_id,
            "accepted": true,
            "regected": false,
          };

        fetch(url_for_friendRequest, {
            method: 'POST',
            body:JSON.stringify(user_data),
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'token '+this.props.author_state.token,
            }
        })
        .then(res => res.text())
        .then(response => {
            console.log("Here is the response after accepting the request")
            console.log(response)
        


        })
        .catch(error => console.error('Error:', error));

    }



    reject_request(follower){

        document.getElementById("rej_button").disabled = true;
        document.getElementById("accept_button").disabled = true;

        var user_data = {
            "from_author": follower,
            "to_author": this.state.author.author_id,
            "accepted": false,
            "regected": true,
          };

        fetch(url_for_friendRequest, {
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
        


        })
        .catch(error => console.error('Error:', error));

    }

  



    render(){

        var user_data = {
            "from_author": this.state.author.author_id,
          };
        if(this.props.author_state.token!=null){
        fetch(url_for_notification, {
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

        console.log("here is the people who want requests");
        console.log(requests);
        try{
        if(requests!=null || requests.detail!="Invalid token."){
        var list_of_pple = requests.map((request) => 
            <tr>
                <th scope="row">{request.userName}</th>
                <td>   
                <Button id="accept_button" onClick={()=> {this.accept_request(request.author_id)}}>Accept request</Button>
                </td>
                <td>
                <Button id="rej_button" onClick={()=> {this.reject_request(request.author_id)}}>Decline request</Button>
                </td>
            </tr>
        
        
   
        //<Button>Accept request</Button>
        


        

        );
        }
    }
    catch(err) {
        {}
      }




    }
        else{
            list_of_pple=""
        }


      return(
        
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
        
        );

    }
}

export default Notifications;
