import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Input} from 'react-input-component';
import { Card, Button} from "react-bootstrap";

import '../App.css';
import{
    getGists,
  } from "../redux/actions/gist.action"
import { useEffect } from 'react';
const UserGists = (props)=>{
    const [user, setUser] = useState();
    const [gists, setGists] = useState(props.gists);

    const handleOnChange = (value) =>{
      setUser(value);
    }

    useEffect(()=>{
        setGists(props.gists);     
    },[props.gists]);

    const handleSearch = () =>{
        props.getGists(user);
    }

    return (
        <div>
            <h1 className="title">Search user's gists</h1>        
            <div className="container">
                <Input className = ""type ="text" onChange = {(e)=> handleOnChange(e.target.value)}/>
                <button onClick={() => handleSearch()} style ={{fontSize:"15px"}}>Search</button>
            </div>
            {
                gists.length > 0 ?
               
                <div className ="flex-column" style={{width:"100%"}} >
                    <Card className="flex-item"  style={{fontSize:"10px", width:"50%", height:"270px"}} >
                        <Card.Header>
                            <Card.Img className = "profile_img" src={gists[0].owner.avatar_url} alt ="profile"/>
                        </Card.Header>
                        <Card.Body>
                            <Card.Link style={{fontSize:"20px"}} href = {gists[0].owner.html_url}>Profile</Card.Link>
                        </Card.Body>
                    </Card>
                    {gists.map((item, index) =>{
                        return(
                        <Card className="flex-item" bg="dark" style={{fontSize:"10px", width:"50%"}} >
                            <Card.Body  >
                                <Card.Img className = "profile_img" src={gists[0].owner.avatar_url} alt ="profile"/>
                                <Card.Footer>
                                    <Card.Link href = {gists[0].owner.html_url}>Profile</Card.Link>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                        )
                    })}
                </div>   
                    :<div></div>
                
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      gists: state.gist.gists
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getGists: (user) => dispatch(getGists(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGists);