/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListContext from '../../../context/list/listContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './VocabularyItem.css';

const VocabularyItem = ({ vocabulary, coverLang1, coverLang2, wordIndex, uncoverWord }) => {
    const listContext = useContext(ListContext);
    const { deleteVocabularyItem } = listContext;

    return (
        <div className="vocabulary-item-container">
            <p
                onClick={() => {
                    uncoverWord(wordIndex, 1);
                }}
                className={`${coverLang1 ? 'covered' : null} vocabulary-item item1`}
            >
                {vocabulary.lang1}
            </p>
            <div className="d-flex">
                <p
                    onClick={() => {
                        uncoverWord(wordIndex, 2);
                    }}
                    className={`${coverLang2 ? 'covered' : null} vocabulary-item`}
                >
                    {vocabulary.lang2}
                </p>
                <button
                    className="edit-btn-overview"
                    onClick={() => deleteVocabularyItem(vocabulary.id)}
                    type="button"
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    );
};

export default VocabularyItem;

VocabularyItem.propTypes = {
    vocabulary: PropTypes.object.isRequired,
    coverLang1: PropTypes.bool.isRequired,
    coverLang2: PropTypes.bool.isRequired,
    wordIndex: PropTypes.number.isRequired,
    uncoverWord: PropTypes.func.isRequired
};
