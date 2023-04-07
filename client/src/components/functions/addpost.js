import axios from "axios";


export const addnc =async(value)=>{
    await axios.post(process.env.REACT_APP_API+'/ncmoni',value)
}