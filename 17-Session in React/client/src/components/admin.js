import React, {useEffect} from 'react';
import {useNavigate as useHistory} from 'react-router-dom'

export default function Admin() {
    const history = useHistory()
    useEffect(() => {
       const checkUser = async() => {
           const response= await fetch('/checkuser', {
               method: 'POST'
           });
           const result = await response.json();
           if(result !== 'done') {
               history('/')
           }
       }
       checkUser()
    }, [])
  return (
    <h1>Welcome Admin</h1>
  )
}
