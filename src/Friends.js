import React, { Component } from 'react';
import { Breadcrumb,BreadcrumbItem,Form,FormGroup,FormText,Input,Label,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

var host_url = 'http://127.0.0.1:8000';
host_url = 'https://project-cmput404.herokuapp.com';
var post_url = host_url+'/api/authors';

var ajax_response=["uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf",];

class Friends extends Component{

  search(){
    console.log("her eis the passwed username")
    console.log(this.props.username);
    this.state = {
      users_token: this.props.author_state.token,
      ajax_response:[],
      usersname:this.props.author_state.username,
    };
    console.log(this.state.usersname)
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



    render(){
      console.log(this.props)
      console.log("this is the second ajax response")
      console.log(ajax_response)
      const author_list = Object.keys(ajax_response[0]).map((to_display,i) => {
        return(
          //console.log(to_display.userName)
          //console.log(ajax_response[0][to_display].userName)
           
           

           <Col sm="8" md={{size:8,offset:2}}>
         
               <Card body>
                 <CardTitle><h1>{ajax_response[0][to_display].userName}</h1></CardTitle>
                 <CardText>{ajax_response[0][to_display].firstName} {ajax_response[0][to_display].lastName}</CardText>
                 <Button>Follow</Button>
               </Card>
               <br/>
             </Col>
             
        ) 

      })
    
      
      
      

   

      return(
       
        <center>
           
          <FormGroup style={{width:"300px"}} >
            <Label for="exampleSearch" >Search</Label>
            <Input
              type="search"
              name="search_for_author"
              id="search_for_author"
              placeholder="Search for Author"
              
            />
            <Button onClick={()=> {this.search()}} color="secondary" size="lg">search</Button>
          </FormGroup>
          
          

          <Row>
            <Col sm="12">
              <h4>List of Authors</h4>
            </Col>
            {author_list}

            

          </Row>
        </center>
        );
        
    }
}

export default Friends;