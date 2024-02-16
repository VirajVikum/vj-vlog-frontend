import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./usersTable";
import Axios from "axios";
import { useEffect, useState } from "react";

// const users=[
//     {
//         id:1,
//         name:'vj',
//     }
//     ,
//     {
//         id:2,
//         name:'vrj',
//     }
// ]

const Users = () => {

    const [users,setusers] = useState([]);
    const [submitted,setSubmitted]=useState(false);
    const [selectedUser,setSelectedUser]=useState({});
    const [isEdit,setIsEdit]=useState(false);



    useEffect(() =>{   //run before all
        getUsers();
    },[]);

    

    const getUsers= () =>{
        setSubmitted(true);

        Axios.get('http://localhost:3001/api/users')  //return a js promise
            .then(Response=>{
                // console.log(Response.data.response);
                setusers(Response.data?.response || []);  // if no data parse empty array
            })
            .catch(error =>{
                console.error("Axios error ", error);
            });
            
    }


    const addUser=(data)=>{
        const payload = {
            id : data.id,
            name : data.name,
        }

        Axios.post('http://localhost:3001/api/createusers',payload)
            .then(()=>{
                // console.log(Response.data.response);
                //setusers(Response.data?.response || []);  // if no data parse empty array
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error =>{
                console.error("Axios error ", error);
            });
    }


    const updateUser=(data)=>{
        const payload = {
            id : data.id,
            name : data.name,
        }

        Axios.post('http://localhost:3001/api/updateusers',payload)
            .then(()=>{
                // console.log(Response.data.response);
                //setusers(Response.data?.response || []);  // if no data parse empty array
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error =>{
                console.error("Axios error ", error);
            });
    }



    const deleteUser =(data)=>{
        

        Axios.post('http://localhost:3001/api/deleteusers',data)
            .then(()=>{
                // console.log(Response.data.response);
                //setusers(Response.data?.response || []);  // if no data parse empty array
                getUsers();
                
            })
            .catch(error =>{
                console.error("Axios error ", error);
            });
    }




    return (
        <Box
        sx={{
            width:'calc(100%-100px)',
            margin:'auto',
            marginTop:'100px'
        }}
        >
            <UserForm 
                addUser={addUser}
                updateUser={updateUser}
                submitted={submitted}
                data={selectedUser}
                isEdit={isEdit}
            />

            <UsersTable 
            rows={users}
            selectedUser={data=>{
                setSelectedUser(data);
                setIsEdit(true);
            }}
            deleteUser={data=>window.confirm("Are you sure ?") && deleteUser(data)}
            />
            
            
        </Box>
    );

}

export default Users;