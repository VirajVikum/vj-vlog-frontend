import { Button, Grid, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const UserForm = ({addUser,updateUser,submitted,data,isEdit}) =>{

    const [id,setId] = useState(0);//state variabes
    const [name,setName] = useState('0');

    useEffect(()=>{
        if(!submitted)
        {
            setId(0);
            setName("");
        }
    },[submitted])



    useEffect(()=>{
        if(data?.id && data.id !== 0){
            setId(data.id);
            setName(data.name);
        }
    },[data]);




    return (
        <Grid
        container
        spacing={2}
        sx={{//fto include css
            backgroundColor:'#ffff',
            marginBottom:'30px',
            display:'block',
        }}
        >
            {/* To get full screen in mobile view -xs */ }
            
            <Grid item xs={12}> 
            <Typography component={'h1'} sx={{color:'#000000'}}>User Form</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{display:"flex"}}>
                <Typography 
                component={'label'} 
                htmlFor="id"
                sx={{
                    color:'#000000',
                    marginRight:'20px',
                    fontSize:'16px',
                    width:'100px',
                    display:'block',
                }}>
                    ID
                </Typography>
                <Input 
                type="text"
                name="id"
                id="id"
                sx={{width:'400px'}}
                value={id} //state variable
                onChange={e=> setId(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:"flex"}}>
                <Typography 
                component={'label'} 
                htmlFor="id"
                sx={{
                    color:'#000000',
                    marginRight:'20px',
                    fontSize:'16px',
                    width:'100px',
                    display:'block',
                }}>
                    Name
                </Typography>
                <Input 
                type="text"
                name="name"
                id="name"
                sx={{width:'400px'}}
                value={name}
                onChange={e=>setName(e.target.value)}
                />
            </Grid>
            <Button
            sx={{
                margin:'auto',
                marginBottom:'20px',
                backgroundColor:'#00c6e6',
                color:'#000000',
                marginLeft:'15px',
                marginTop:'20px',
                "&:hover":{
                    opacity:'0.7',
                    backgroundColor:'#00c6e6',
                }
                


        }}
        // onClick={()=> addUser({id:id,name:name})}
        onClick={()=> isEdit? updateUser({id,name}) : addUser({id,name})}
            >
                {isEdit? "Update" : "Add"}
                </Button>

        </Grid>
    )

}

export default UserForm;