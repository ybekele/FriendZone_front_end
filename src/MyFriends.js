import React, { Component } from 'react';
import { Breadcrumb,BreadcrumbItem,Form,FormGroup,FormText,Input,Label,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';

var host_url = 'http://localhost:8000'
var host_url = 'https://copyfriendzonebackend.herokuapp.com';
var post_url = host_url+'/api/authors/';
var url_follow=host_url+'/api/author/profile/';
var url_for_friends=host_url+'/api/authors/';
var url_for_unfriend=host_url+'/api/unfriend/';
var requests;


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

    }

    unfollow(friend){

        //document.getElementById("unfollow_button").disabled = true;

        var user_data = {
            "from_author": friend,
            "to_author": this.state.author.author_id,
          };

        fetch(url_for_unfriend, {
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
        

        if(this.props.author_state.token!=null){
            console.log(this.props.author_state.token);
            fetch(url_for_friends+this.state.author.author_id+"/local_friends/", {
                method: 'GET',
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

        console.log("here is request before the time delay");
        console.log(requests);


          console.log("here is requests")
          console.log(requests)
        
        try{
        if(requests!=null || requests.detail!="Invalid token."){
            console.log(requests.authors)
        var list_of_pple = requests.authors.map((request) => 
            <tr>
                <th scope="row">{request.username}</th>
                <td>   
                {/* <Button id="unfollow_button" onClick={()=> {this.unfollow(request.author_id)}}>Unfollow This Author</Button> */}
                <Button id="unfollow_button" onClick={()=> {this.unfollow(request.author_id)}}>Unfollow This Author</Button>
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
