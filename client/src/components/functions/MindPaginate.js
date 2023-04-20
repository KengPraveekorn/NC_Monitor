import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { listnc } from "../functions/auth";

const MindPaginate = () => {
    const [value, setValue] = useState([]);
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = value.filter(
		item => item.ncr_no && item.ncr_no.toLowerCase().includes(filterText.toLowerCase()),
	);

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

    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
        // return (
		// 	<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		// );
	}, [filterText, resetPaginationToggle]);

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

  return (
    <div>
         <DataTable
            columns={columns}
            data={value}
            // selectableRows
            responsive
            pagination
            fixedHeader
            progressPending={pending}
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
			subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
        />
  </div>
  )
}

export default MindPaginate

