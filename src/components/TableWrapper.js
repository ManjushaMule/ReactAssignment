import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';


class TableWrapper extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            // header: false,
            // fields: [],
            dataSet: [],
            headerCol: []
        }
    }
    
    componentDidMount() {
        const {dataSet, headerCol} = this.props;
        //let fields = dataSet.map((d, i) => {return {checked: false} } )
        this.setState({
            dataSet: dataSet,
            //fields: fields,
            //fields: selectedFields,
            headerCol: headerCol
        });
    }

    componentDidUpdate() {
        const {dataSet, headerCol, selectedFields} = this.props;
        
        if(this.state.dataSet !== dataSet) {
            //let fields = dataSet.map((d, i) => {return {checked: false} } )
            this.setState({
                dataSet: dataSet,
                //fields: fields,
                //fields: selectedFields,
                headerCol: headerCol
            });
        }
    }

    changeAllCheckBox = (event) => {
        // let {
        //     header,
        //     fields,
        //     dataSet
        // } = this.state;

        // let newHeader = !header;
        // let newFields = fields.map((f, index) => {
        //     return {
        //         checked: newHeader,
        //         data: f.data || dataSet[index]
        //     }   
        // })
        // this.setState({
        //     fields: newFields,
        //     header: newHeader
        // })
        // this.props.handleFieldSelection(this.state.dataSet);
        this.props.handleSelectAll(event.target.checked);
    }

    changeCheckBoxFields = (event, item, index) => {
        //let newFields = this.state.fields;
        //event.preventDefault();
        event.stopPropagation();
        // let newFields = {...this.state.fields};
        // newFields[index] = {
        // 	checked: !newFields[index].checked,
        //     data: item,
        //     rowIndex: index
        // }
        this.props.handleFieldSelection(item,index);
        //this.setState({fields: newFields});
    }

    renderRow = () => {
        return this.state.dataSet.map((item, index) => {        		
            return (
                <tr key={index}>
                    <td>
                        {/* <input type="checkbox" name="name1" onChange={(event) => this.changeCheckBoxFields(event, item, index)}  checked={this.state.fields[index].checked} /> */}
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
        );
    }
}


export default TableWrapper;
