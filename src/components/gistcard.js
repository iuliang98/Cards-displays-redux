
import React, {useState, useEffect} from 'react';
import {Input} from 'react-input-component';
import { Card, Button} from "react-bootstrap";
import _ from 'lodash';
import { connect } from 'react-redux';
import '../App.css';
import {
    getForks
} from '../redux/actions/gist.action';

import AccordionFiles from './accordion-files';


const GistCard = (props) =>{

    const [gist, setGist] = useState({});
    const [forks, setForks] = useState([]);
    const [id, setId] = useState();


    useEffect(() => {
        setGist(props.gist);
        setId(props.gist.id);

        props.getForks(props.gist.id);
    }, [props.gist]);


    
    return (

        <div  className="flex-item">
            {!_.isEmpty(props.gist)?
                <Card  className = "flex-item w-100" >
                    <Card.Title style={{paddingLeft:"5%"}}>
                        Description: {props.gist.description!=="" && props.gist.description!==null?props.gist.description:"none"}
                    </Card.Title>
                    
                    <Card.Header style={{fontSize:"15px", paddingLeft:"5%"}}>
                        
                        Last 3 forks:{
                            
                            props.forks[props.gist.id] && props.forks[props.gist.id].length > 0 ?
                            <div className="flex-forks">{
                                props.forks[props.gist.id].map((item, index)=>{
                                    if(index<3){
                                        return(
                                            <div style={{textAlign:"center", width:"2.5cm"} }>
                                                <Card.Img className = "forks_img" src={item.owner.avatar_url}></Card.Img>   
                                                <Card.Text>{item.owner.login}</Card.Text>    
                                            </div>
                                        )
                                    }
                                })
                            }</div>
                            :<div>No forks!</div>
                        }
                    
                    </Card.Header>
                    
                    <Card.Body style={{fontSize:"10px", paddingLeft:"5%"}}>
                        <Card.Text>
                            Last Update: {gist.updated_at}
                        </Card.Text>
                        <AccordionFiles files = {props.gist.files}></AccordionFiles>
                    </Card.Body>
                </Card>
                :<div>da</div>
            }      
        </div>
        
    );

}
const mapStateToProps = (state) => {
    return {
      forks: state.gist.forks
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      getForks: (id) => dispatch(getForks(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GistCard);