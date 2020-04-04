import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Alert.css';

const Alert = ({ type, msg }) => {
    const alertType = () => {
        switch (type) {
            case 'info':
                return <FontAwesomeIcon icon={faInfoCircle} />;
            case 'danger':
                return <FontAwesomeIcon icon={faExclamationCircle} />;
            default:
                return <FontAwesomeIcon icon={faInfoCircle} />;
        }
    };
    if (msg) {
        return (
            <div className={type === 'danger' ? 'alert-container danger' : 'alert-container'}>
                {alertType()}
                <span className="alert-text">{msg}</span>
            </div>
        );
    }
    return null;
};

export default Alert;

Alert.propTypes = {
    type: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired
};
