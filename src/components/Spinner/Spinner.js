import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = (props) => {
    return (
        <div>
            <Loader
                type="Puff"
                color="#f5ac00"
                height={100}
                width={100}
            />
        </div>
    )
}

export default Spinner;