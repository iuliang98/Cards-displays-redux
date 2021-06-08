
import React, {useState, useEffect} from 'react';
import {Input} from 'react-input-component';
import { Card, Button} from "react-bootstrap";
import _ from 'lodash';
import { connect } from 'react-redux';
import {
    getForks
} from '../redux/actions/gist.action';

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
        console.log('forks by id:', props.forks[props.gist.id]);
        //console.log('all forks', props.forks);
    },[props.forks])
    
    return (

        <div  className="flex-item">
            {!_.isEmpty(props.gist)?
                <Card  className = "flex-item w-100" >
                    <Card.Title>
                        Description: {gist.description!==""?gist.description:"none"}
                    </Card.Title>
                    <Card.Header>
                        Last 3 forks:{
                            props.forks[props.gist.id].length > 0 ?
                            props.forks[props.gist.id].map((item, index)=>{
                                if(index<3){
                                    return(
                                        <Card.Img src={item.owner.avatar_url}></Card.Img>
                                    )
                                }
                            }):<div>da</div>
                        }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Last Update: {gist.updated_at}
                        </Card.Text>
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