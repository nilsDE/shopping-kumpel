import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';

const NewList = ({ createList, updateList, list }) => {
    const [title, setTitle] = useState(list && list.description ? list.description : '');
    const [type, setType] = useState('Checklist');

    return (
        <div>
            <Form.Control
                name="name"
                type="text"
                placeholder="List name..."
                onChange={e => setTitle(e.target.value)}
                maxLength="20"
                value={title}
            />
            <Form.Control placeholder="xxx" as="select" value={type} onChange={e => setType(e.target.value)}>
                <option>Checklist</option>
                <option>Vocabulary List</option>
            </Form.Control>
            <div className="mt-4">
                <button
                    type="button"
                    disabled={title.length === 0}
                    className="list-btn list-btn-fixed-width mr-1"
                    onClick={e => {
                        e.preventDefault();
                        if (list) {
                            updateList(list.id, title);
                        } else {
                            const listType = type === 'Checklist' ? 1 : 2;
                            createList(title, listType);
                        }
                        Swal.close();
                    }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} /> Send
                </button>
                <button
                    type="button"
                    className="list-btn list-btn-fixed-width mr-1"
                    onClick={() => Swal.close()}
                >
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
            </div>
        </div>
    );
};

export default NewList;

NewList.propTypes = {
    createList: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired,
    list: PropTypes.object
};

NewList.defaultProps = {
    list: {}
};
