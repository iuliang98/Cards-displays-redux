import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Input} from 'react-input-component';
import { Card, Button} from "react-bootstrap";
import '../App.css';
import{
    getGists,
  } from "../redux/actions/user.action"
import { useEffect } from 'react';


import GistCard from '../components/gistcard';

const UserGists = (props)=>{
    const [user, setUser] = useState();
    const [gists, setGists] = useState(props.gists);
    const [message, setMessage] = useState("");

    const handleOnChange = (value) =>{
      setUser(value);
    }

    useEffect(()=>{

        if(props.gists.message){
            setMessage(props.gists.message);
        }else{
            setGists(props.gists);     

        }
    },[props.gists]);

    const handleSearch = () =>{
        props.getGists(user);

        if(props.gists.length == 0 && !props.gists.message){
            setMessage("This user has no gists!")
        }
    }

    return (
        <div className = "App">
            <h1 className="title">Search user's gists</h1>        
            <div className="container">
                <label htmlFor = "username"style={{marginRight:"5mm"}}>Username</label>
                <Input id = "username" className = ""type ="text" onChange = {(e)=> handleOnChange(e.target.value)}/>
                <button onClick={() => handleSearch()} style ={{fontSize:"15px", width:"2cm"}}>Search</button>
            </div>
            {
                gists.length > 0 ?
                
                <div className ="flex-column" style={{width:"100%"}} >
                    <Card className="flex-item" >
                        <Card.Header>
                            <Card.Title>
                               {gists[0].owner.login.charAt(0).toUpperCase() + gists[0].owner.login.slice(1)}
                            </Card.Title>
                            <Card.Img className = "profile_img" src={gists[0].owner.avatar_url} alt ="profile"/>
                        </Card.Header>
                        <Card.Body>
                            <Card.Link style={{fontSize:"20px"}} href = {gists[0].owner.html_url} target="_blank">Profile</Card.Link>
                        </Card.Body>
                    </Card>
 
                    {gists.map((item, index) =>{
                        return(
                            <GistCard  gist = {item}/>
                        )
                    })}
 
                </div>   
                    :<h2 className="title" style={{paddingTop:"5%"}}>{message}</h2>
                
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      gists: state.user.gists
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getGists: (user) => dispatch(getGists(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGists);