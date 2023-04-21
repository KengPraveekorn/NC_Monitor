import axios from "axios";


// List -> GET
export const listnc = async()=>{
    return await axios.get(process.env.REACT_APP_API+'/ncmoni')
}
// Read -> GET
export const Readnc =async(id)=>{
    return await axios.get(process.env.REACT_APP_API+'/ncmoni/'+ id)
}
// Create -> Post
export const addnc =async(value)=>{
    return await axios.post(process.env.REACT_APP_API+'/ncmoni',value)
}
// Remove -> Detele
export const removenc =async(id)=>{
    return await axios.delete(process.env.REACT_APP_API+'/ncmoni/'+ id)
}
// Update -> Put
export const updatenc =async(id,value)=>{
    return await axios.put(process.env.REACT_APP_API+'/ncmoni/'+ id,value)
}

export const edit = async(data)=>{
    return await axios.put(process.env.REACT_APP_API+'/ncmoni/'+ data)
}