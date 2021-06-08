
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
       // console.log(props.gist)
        setGist(props.gist);
        setId(props.gist.id);
        //console.log(props.gist.id);
        props.getForks(props.gist.id);
    }, [props.gist]);

    useEffect(() => {
        //setForks(props.forks);
        //console.log('forks by id:', props.forks[props.gist.id]);
        //console.log('all forks', props.forks);
    },[props.forks])
    
    return (

        <div  className="flex-item">
            {!_.isEmpty(props.gist)?
                <Card  className = "flex-item w-100" >
                    <Card.Title>
                        Description: {props.gist.description!==""?props.gist.description:"none"}
                    </Card.Title>
                    
                    <Card.Header >
                        
                        Last 3 forks:{
                            
                            props.forks[props.gist.id] && props.forks[props.gist.id].length > 0 ?
                            <div className="flex-forks">{
                                props.forks[props.gist.id].map((item, index)=>{
                                    if(index<3){
                                        return(
                                            <div style={{textAlign:"center"}}>
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
                    
                    <Card.Body>
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