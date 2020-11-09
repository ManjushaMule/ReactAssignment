import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import './TableWrapper.scss';
import { CheckCircleFill, Dash } from 'react-bootstrap-icons';


const TableWrapper = (props) => {
    const changeAllCheckBox = (event) => {
        props.handleSelectAll(event.target.checked);
    }

    const changeCheckBoxFields = (event, item, index) => {
        event.stopPropagation();
        props.handleFieldSelection(item,index);
    }

    const Rows = () => {
        return props.dataSet.map((item, index) => {        		
            return (
                <tr key={index}>
                    <td>
                        <input type="checkbox" 
                            name="name1" 
                            onChange={(event) => changeCheckBoxFields(event, item, index)}
                            checked={props.selectedFields[index] ? props.selectedFields[index].checked : false}/>
                    </td>
                    <td>{item.locationId}</td>
                    <td>{item.houseCode}</td>
                    <td>{item.houseDesc}</td>
                    <td>{item.vendor}</td>
                    <td>{item.email}</td>
                    <IconCell value={item.spotTV}/>
                    <IconCell value={item.spotRadio}/>
                    <IconCell value={item.networkTV}/>
                    <IconCell value={item.networkRadio}/>
                    <IconCell value={item.unwiredNetwork}/>
                </tr>
            )
        })
    }

    const IconCell = (prop) => {
        return (
            <td className="table-wrapper__icon-cell">
                {prop.value ? <CheckCircleFill/> : <Dash />}
            </td>
        )
    }

    const Header = () => {
        const restHeaders =  props.headerCol.map((header, index) => {    
            return (
               <th key={index}>{header}</th>
            )
        });
        return (
            <thead>
                <tr>
                    <th>
                        <input 
                            type="checkbox" 
                            checked={props.isSelectAll} 
                            name="selectAll" 
                            onChange={(event) => changeAllCheckBox(event)} 
                        />
                    </th>
                    {restHeaders}
                </tr>
            </thead>
        )
    }

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                <Header/>
                <tbody>
                    <Rows/>
                </tbody>
            </Table>
        </div>
    );
}

TableWrapper.propTypes = {
    dataSet: PropTypes.array.isRequired,
    headerCol: PropTypes.array,
    selectedFields: PropTypes.array.isRequired,
    handleFieldSelection: PropTypes.func.isRequired,
    handleSelectAll: PropTypes.func,
    isSelectAll: PropTypes.bool
}

export default TableWrapper;
