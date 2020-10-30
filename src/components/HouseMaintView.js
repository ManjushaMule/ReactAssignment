import React, {Component} from 'react';
import Header from './Header/Header';
import HouseMaintContainer from '../container/HouseMaintContainer';

class HouseMaintView extends Component {

    render() {
        return(
            <div className="house-maint-view">
                <Header />
                <div style={{marginTop: "72px"}}>
                    <HouseMaintContainer />
                </div>
            </div>
        );
    }
}

export default HouseMaintView;