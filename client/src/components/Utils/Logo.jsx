import React from 'react';
import PropTypes from 'prop-types';

import './Logo.css';

export default function Logo({ pen, size }) {
    return (
        <div className={`logo-container ${size}`}>
            <div className="board">
                <div className="clip" />
            </div>
            {pen && <div className="pen" />}
        </div>
    );
}

Logo.propTypes = {
    pen: PropTypes.bool,
    size: PropTypes.string
};

Logo.defaultProps = {
    pen: true,
    size: 'regular'
};
