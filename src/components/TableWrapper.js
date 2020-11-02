import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import './TableWrapper.scss';

class TableWrapper extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            dataSet: [],
            headerCol: []
        }
    }
    
    componentDidMount() {
        const {dataSet, headerCol} = this.props;
        this.setState({
            dataSet: dataSet,
            headerCol: headerCol
        });
    }

    componentDidUpdate() {
        const {dataSet, headerCol} = this.props;
        
        if(this.state.dataSet !== dataSet) {
            this.setState({
                dataSet: dataSet,
                headerCol: headerCol
            });
        }
    }

    changeAllCheckBox = (event) => {
        this.props.handleSelectAll(event.target.checked);
    }

    changeCheckBoxFields = (event, item, index) => {
        event.stopPropagation();
        this.props.handleFieldSelection(item,index);
    }

    renderRow = () => {
        return this.state.dataSet.map((item, index) => {        		
            return (
                <tr key={index}>
                    <td>
                        <input type="checkbox" 
                            name="name1" 
                            onChange={(event) => this.changeCheckBoxFields(event, item, index)}
                            checked={this.props.selectedFields[index] ? this.props.selectedFields[index].checked : false}/>
                    </td>
                    <td>{item.locationId}</td>
                    <td>{item.houseCode}</td>
                    <td>{item.houseDesc}</td>
                    <td>{item.vendor}</td>
                    <td>{item.email}</td>
                    {item.spotTV ? <td>Y</td> : <td>N</td>}
                    {item.spotRadio ? <td>Y</td> : <td>N</td>}
                    {item.networkTV ? <td>Y</td> : <td>N</td>}
                    {item.networkRadio ? <td>Y</td> : <td>N</td>}
                    {item.unwiredNetwork ? <td>Y</td> : <td>N</td>}
                </tr>
            )
        })
    }

    renderHeaders = () => {
        return this.state.headerCol.map((header, index) => {    
            return (
               <th key={index}>{header}</th>
            )
        });
    }

    render() {
        return (
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" checked={this.props.isSelectAll} name="name1" onChange={(event) => this.changeAllCheckBox(event)} />
                        </th>
                        {this.renderHeaders()}
                    </tr>
                    </thead>
                    <tbody>{this.renderRow()}</tbody>
                </Table>
            </div>
        );
    }
}


export default TableWrapper;
