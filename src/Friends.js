import React, { Component } from 'react';
import { Breadcrumb,BreadcrumbItem,Form,FormGroup,FormText,Input,Label,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

var host_url = 'http://localhost:8000'
var host_url = 'https://project-cmput404.herokuapp.com';
var post_url = host_url+'/api/authors/';
var url_follow=host_url+'/api/friendRequest/';
var url_for_authorId=host_url+'/api/author/profile/';
var users_id="";

var ajax_response=["","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf","uuu","asdf",];
var options=[];
class Friends extends Component{

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
    document.getElementById("folow_button").disabled = true;


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

 



    render(){

      console.log(this.props)
      console.log("this is the second ajax response")
      if(ajax_response[1]!="asdf"){
        console.log("entered the if condition after render");
        //console.log(typeof ajax_response[1][0].author_id);
        //console.log(typeof ajax_response[1].author_id);
        //console.log(ajax_response[1][0].author1.author_id);
        //this.setState({author_id:ajax_response[1][0].author1.author_id});
        console.log("here is chceking the state authorid");
        //console.log(this.state.author_id);

      }
      //console.log(ajax_response[1])
      //console.log(ajax_response[0])
      console.log(ajax_response[0]!="")
      if(ajax_response[0]!=""){
        console.log("came into the first if condition")
        console.log(ajax_response)
      var author_list = Object.keys(ajax_response).map((to_display,i) => {
        return(
          //console.log(to_display.userName)
          //console.log(ajax_response[0][to_display].userName)



           <Col class="flex" sm="8" md={{size:8,offset:2}}>
              
               <Card body>
                 <CardTitle><h1>{ajax_response[to_display].username}</h1></CardTitle>
                 <CardText>{ajax_response[to_display].firstName} {ajax_response[to_display].lastName}</CardText>
                 <Button id="folow_button" onClick={()=> {this.follows(ajax_response[to_display].author_id)}}>Follow</Button>
               </Card>
               <br/>
             </Col>

        )

      })
    }
    else{
      console.log("entered else")
      console.log(author_list)
      var author_list=""
    }


    //ajax_response[1]).map
    //ajax_response[1][to_display].author1.userName
     /* if(ajax_response[0]!=""){
        console.log("came into the first if condition")
      var author_list2 = Object.keys(ajax_response[1]).map((to_display,i) => {
        return(
          //console.log(to_display.userName)
          //console.log(ajax_response[0][to_display].userName)
           
           

           <Col sm="8" md={{size:8,offset:2}}>
         
               <Card body>
                 <CardTitle><h1>{ajax_response[1][to_display].author1.userName}</h1></CardTitle>
                 <CardText>{ajax_response[0][to_display].firstName} {ajax_response[0][to_display].lastName}</CardText>
                 {ajax_response[1][to_display].author1.userName in options
                 <Button>Follow</Button>
                 }
               </Card>
               <br/>
             </Col>
             
        ) 

      })
    }  */
      
      
      






    // document.body.style = 'background: #bdc3c7;'
      return(
        
        <center>

          <FormGroup style={{width:"300px", paddingTop:20}} >
            <Label for="exampleSearch" >Search</Label>
            <Input
              type="search"
              name="search_for_author"
              id="search_for_author"
              placeholder="Search for Author"

            />
            <Button style={{marginTop:20}} onClick={()=> {this.search()}} color="secondary" size="lg">search</Button>
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
