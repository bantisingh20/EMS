import React from 'react';
import styled, { keyframes } from 'styled-components';
import DataTable from 'react-data-table-component';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

export const CustomLoader = () => (
	 
	<div style={{ padding: '24px' }}>
		<Spinner />
		<div></div>
	</div>
);

// export const DataTableCustom = ({columns ,data}) => {
// 	console.log("Columns:", columns); // Pretty
// 	console.log("data:", JSON.stringify(data, null, 2)); // Pretty

// 	//columns = JSON.stringify(columns, null, 2);
// 	data = JSON.stringify(data, null, 2);

// 	const [pending, setPending] = React.useState(true);
// 	const [rows, setRows] = React.useState(data);
// 	setRows(data);
// 	return (
// 		<DataTable
// 			columns={columns}
// 			data={rows}
// 			progressPending={pending}
// 			progressComponent={<CustomLoader />}
// 			pagination
// 		/>
// 	);
// };

export default {
	title: 'Loading/Custom',
	component: CustomLoader 
};