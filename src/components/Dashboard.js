import React, { useEffect, useState } from "react";
import CustomTable from "./table/CustomTable";
import "./Dashboard.css";
import { searchForUsers } from "./search/SearchUser";


const  Dashboard=()=> {
    const url='https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const [resData, setData] = useState([]);
    const [update, setUpdate] = useState(false);

    const searchUsers=(e)=>{
      setData(searchForUsers(e.target.value,resData));
    }
    
    const fetchData=()=>{
        fetch(url)
          .then(response => {
            return response.json();
          }).then(data => {
            const response=initializeData(data);
            setData(response);
          }).catch((e) => {
            console.log(e.message);
          });
    }
    const initializeData=(data)=>{
      return data.map((user) => {
           user.visibility = true;
           user.selected=false;
           user.edit=false;
           return user;
      });
    }

    const selectAll = (e) => {
      // console.log(e.target.checked);
      const UserIds = resData
        .filter((user) => user.visibility)
        // .slice(index,index+size)
        .map((user) => user.id);

      let usersCopy = resData.map((user) => {
        if (UserIds.includes(user.id)) {
          user.selected = e.target.checked;
          return user;
        }
        return user;
      });
  
      setData(usersCopy);
      setUpdate(!update);
    };
    const selectOne = (id) => {
      
      let usersCopy = resData;
      // console.log(usersCopy[id].selected)
      const index = usersCopy.findIndex((user) => user.id === id);
      usersCopy[index].selected = !usersCopy[index].selected;
      // console.log(usersCopy[index].selected)
      setData(usersCopy);
      setUpdate((prevState) => !prevState);
    };

    const deleteUser = (id) => {
      let usersCopy = resData.filter((user) => user.id !== id);
      setData(usersCopy);
      setUpdate((prevState) => !prevState);
    };
    const editUser = (id) => {
      let usersCopy = resData;
      let index = usersCopy.findIndex((user) => user.id === id);
      usersCopy[index].edit = true;
      setData(usersCopy);
      setUpdate((prevState) => !prevState);
    };

    const saveUser = (id, nameRef, emailRef, roleRef) => {
      let usersCopy = resData;
      const index = usersCopy.findIndex((user) => user.id === id);
      usersCopy[index].name = nameRef.current.value;
      usersCopy[index].email = emailRef.current.value;
      usersCopy[index].role = roleRef.current.value;
      usersCopy[index].edit = false;
      setData(usersCopy);
      setUpdate((prevState) => !prevState);
    };
  
    useEffect(()=>{
        fetchData();
    },[])


    return (
      <div className="dashboard">
        <input className="search mb-2" type="text" placeholder="Search by name,email or role" onChange={searchUsers}></input> 
        <CustomTable selectOne={selectOne} selectAll={selectAll} data={resData.filter((user) =>user.visibility)} deleteUser={deleteUser} editUser={editUser}
        saveUser={saveUser}></CustomTable>
      </div>
    )
    
}

export default Dashboard;