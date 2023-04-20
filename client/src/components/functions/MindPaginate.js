import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {
    Card,
    Col,
    Form,
    Row,
    Table,
    Button,
    Container,
    Modal,
  } from "react-bootstrap";
import { listnc } from "../functions/auth";

const MindPaginate = () => {
    const [value, setValue] = useState([]);
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filterresult, setFilterresult] = useState([]);
    const [serachData, setSerchData] = useState('');


    useEffect(()=>{
        timeout();
        loadData();
    },[])

    const loadData = () => {
        listnc().then((res) => {
          console.log(res.data);
          setValue(res.data);
        });
      };

    const timeout = ()=>{
        setTimeout(()=>{
        setRows(value);
        setPending(false)
    },2000)
    return ()=> clearTimeout(timeout);
    } 

    const columns = [
        {
            name: 'NCR NO.',
            selector: row=> row.ncr_no,
        },
        {
            name: 'Detect On',
            selector: row=> row.detect_on,
        },
        {
            name: 'Detect At',
            selector: row=> row.detect_at,
        },
        {
            name: 'NC Detail',
            selector: row=> row.nc_detail,
        }
    ]

    const handlesearch = (event)=>{
        const search = event.target.value;
        setSerchData(search)

        if(search!==''){
            const filterdata=value.filter((item)=>{
                return Object.values(item.join('').toLowerCase().includes(search.toLowerCase()))
            })
            setFilterresult(filterdata)
        }else{
            setFilterresult(value);
        }
    }

  return (
    <div>
        <Form className="search">
          <img src="/search.png" alt="" className="imgSeach" />
          <Form.Control
            className="form-search"
            type="search"
            placeholder="Search Lotno"
            // value={q}
            onChange={(e)=>{handlesearch(e)}}
          />
        </Form> 
        <DataTable 
                columns={columns}
                data={value}
                responsive
                pagination
                fixedHeader
                progressPending={pending}
                persistTableHead/>

        {serachData.length > 1 ? (
            filterresult.map((filterdata,index)=>(
                <DataTable 
                key={index}
                columns={columns}
                data={filterdata.value}
                responsive
                pagination
                fixedHeader
                progressPending={pending}
                // paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                // subHeaderComponent={subHeaderComponentMemo}
                persistTableHead/>
            )
            )
        ):(
            value.map((getcon,index)=>(
                <DataTable 
                key={index}
                columns={columns}
                data={getcon.value}
                responsive
                pagination
                fixedHeader
                progressPending={pending}
                // paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                // subHeaderComponent={subHeaderComponentMemo}
                persistTableHead/>
            ))
        )
    }
  </div>
  )
}

export default MindPaginate

