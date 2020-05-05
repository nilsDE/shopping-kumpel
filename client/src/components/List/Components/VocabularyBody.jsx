import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const VocabularyBody = ({ currentList }) => {
    const [wordPair, setWordPair] = useState({
        lang1: '',
        lang2: ''
    });
    return (
        <>
            <Form>
                <div className="d-flex">
                    <Form.Control
                        className="mb-4"
                        name="new-lang-1"
                        type="text"
                        value={wordPair.lang1}
                        placeholder="Enter new word..."
                        onChange={e => setWordPair({ ...wordPair, lang1: e.target.value })}
                    />
                    <Form.Control
                        className="mb-4 ml-1"
                        name="new-lang-2"
                        type="text"
                        value={wordPair.lang2}
                        placeholder="Enter new word..."
                        onChange={e => setWordPair({ ...wordPair, lang2: e.target.value })}
                    />
                </div>
            </Form>
            {currentList.vocabularies.map(v => (
                <div key={v.id} className="d-flex">
                    <p>{v.lang1}</p>
                    <p>{v.lang2}</p>
                </div>
            ))}
        </>
    );
};

export default VocabularyBody;

VocabularyBody.propTypes = {
    currentList: PropTypes.object.isRequired
};
