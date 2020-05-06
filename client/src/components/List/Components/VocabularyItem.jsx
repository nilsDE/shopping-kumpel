/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import './VocabularyItem.css';

const VocabularyItem = ({ vocabulary, coverLang1, wordIndex, uncoverWord }) => {
    return (
        <div className="vocabulary-item-container">
            <p
                onClick={() => {
                    console.log('click', wordIndex);
                    uncoverWord(wordIndex);
                }}
                className={`${coverLang1 ? 'covered' : null} vocabulary-item item1`}
            >
                {vocabulary.lang1}
            </p>
            <p className="vocabulary-item">{vocabulary.lang2}</p>
        </div>
    );
};

export default VocabularyItem;

VocabularyItem.propTypes = {
    vocabulary: PropTypes.object.isRequired,
    coverLang1: PropTypes.bool.isRequired,
    wordIndex: PropTypes.number.isRequired,
    uncoverWord: PropTypes.func.isRequired
};
