import React, {useState, useEffect} from 'react';



import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import color from 'material-ui-core/colors/amber';
import axios from 'axios';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    type:{
            alignItems: 'center',
            width: '100%',
            textAlign: 'right'
        }
  }));

const AccordionFiles = (props) =>{

    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [contents, setContents] = useState([]);
    
    useEffect(() => {
        setFiles(Object.values(props.files));
        if(Object.values(props.files).length > 0){
            getFileContent()
        }
    },[props.files])

    const extractTagClassName = (value) =>{
        if(value != null){
            if(value.includes("C++")){
                return "Cpp_tag";
            }else if(value.includes("c#")){
                return "C#_tag";
            }else if(value.includes("C")){
                return "C_tag";
            }else if(value.includes("Ruby")){
                return "ruby_tag";
            }else if(value.includes("Python")){
                return "python_tag";
            }else if(value.includes("javascript")){
                return "javascript_tag";
            }else if(value.includes("assembly")){
                return "assembly_tag";
            }else if(value.includes("Text")){
                return "text_tag";
            }else if(value.includes("Java")){
                return "java_tag";
            }else{
                return "others_tag";
            }
        }else{
            return "others_tag"
        }
    }


    const getFileContent = () =>{
        
        Object.values(props.files).map((item, index) => {
            axios({
                url: item.raw_url,
                    method: 'get',
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => {
                    let aux = contents;
                    aux.push(res.data);
                    setContents(aux);
                })
        })
    }
    

    
    return(
        <div className={classes.root}>
            {props.files && Object.values(props.files).length > 0 && contents.length>0?
                Object.values(props.files).map((item, index) => {
                return(
                    
                    <Accordion>

                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        
                            <Typography className={classes.heading}>{item.filename}</Typography>
                            <Typography className={`default_tag ${extractTagClassName(item.language)}`}>{item.language}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <pre>{contents[index]}</pre> 
                        </AccordionDetails>
                    </Accordion>
               
                )}):<div>No files!</div>
            }
        </div>
    )
}

export default AccordionFiles;