import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRandom,
    faEyeSlash,
    faSortAlphaDown,
    faSortAlphaDownAlt,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import VocabularyItem from './VocabularyItem';
import ListContext from '../../../context/list/listContext';

const VocabularyBody = ({ currentList }) => {
    const listContext = useContext(ListContext);
    const { createVocabularyItem } = listContext;

    const [wordPair, setWordPair] = useState({
        lang1: '',
        lang2: ''
    });
    const [coverLang1, setCoverLang1] = useState(new Array(currentList.vocabularies.length).fill(false));
    const [coverLang2, setCoverLang2] = useState(new Array(currentList.vocabularies.length).fill(false));
    const [vocabularies, setVocabularies] = useState(currentList.vocabularies);

    const uncoverWord = (index, list) => {
        let newList;
        if (list === 1) {
            newList = [...coverLang1];
            newList[index] = false;
            setCoverLang1(newList);
        } else {
            newList = [...coverLang2];
            newList[index] = false;
            setCoverLang2(newList);
        }
    };

    const shuffle = array => {
        const result = [...array];
        let currentIndex = result.length;
        let temporaryValue;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = result[currentIndex];
            result[currentIndex] = result[randomIndex];
            result[randomIndex] = temporaryValue;
        }
        setVocabularies(result);
    };

    const sortAlphabet = (array, reverse = false, lang2 = false) => {
        const result = [...array];
        if (lang2) {
            if (reverse) {
                result.sort((a, b) => (a.lang2.toLowerCase() > b.lang2.toLowerCase() ? -1 : 1));
            } else {
                result.sort((a, b) => (a.lang2.toLowerCase() > b.lang2.toLowerCase() ? 1 : -1));
            }
        } else if (reverse) {
            result.sort((a, b) => (a.lang1.toLowerCase() > b.lang1.toLowerCase() ? -1 : 1));
        } else {
            result.sort((a, b) => (a.lang1.toLowerCase() > b.lang1.toLowerCase() ? 1 : -1));
        }
        setVocabularies(result);
    };

    return (
        <>
            <Form>
                <div className="enter-vocabulary-container">
                    <Form.Control
                        className="mb-4"
                        name="new-lang-1"
                        type="text"
                        value={wordPair.lang1}
                        placeholder="Enter new word..."
                        onChange={e => setWordPair({ ...wordPair, lang1: e.target.value })}
                    />
                    <div className="d-flex">
                        <Form.Control
                            className="mb-4 ml-1"
                            name="new-lang-2"
                            type="text"
                            value={wordPair.lang2}
                            placeholder="Enter new word..."
                            onChange={e => setWordPair({ ...wordPair, lang2: e.target.value })}
                        />
                        <button
                            className="edit-btn-overview mb-4"
                            onClick={() =>
                                createVocabularyItem(wordPair.lang1, wordPair.lang2, currentList.id)
                            }
                            type="button"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            </Form>
            <div className="btn-row-container">
                <div className="btn-left">
                    <button
                        className="edit-btn-overview"
                        onClick={() => {
                            const newList = coverLang1.map(() => true);
                            setCoverLang1(newList);
                        }}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faEyeSlash} />
                    </button>
                    <button
                        className="edit-btn-overview"
                        onClick={() => sortAlphabet(vocabularies)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faSortAlphaDown} />
                    </button>
                    <button
                        className="edit-btn-overview"
                        onClick={() => sortAlphabet(vocabularies, true)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faSortAlphaDownAlt} />
                    </button>
                </div>
                <div className="btn-middle">
                    <button className="edit-btn-overview" onClick={() => shuffle(vocabularies)} type="button">
                        <FontAwesomeIcon icon={faRandom} />
                    </button>
                </div>
                <div className="btn-right">
                    <button
                        className="edit-btn-overview"
                        onClick={() => sortAlphabet(vocabularies, true, true)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faSortAlphaDownAlt} />
                    </button>
                    <button
                        className="edit-btn-overview"
                        onClick={() => sortAlphabet(vocabularies, false, true)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faSortAlphaDown} />
                    </button>
                    <button
                        className="edit-btn-overview"
                        onClick={() => {
                            const newList = coverLang2.map(() => true);
                            setCoverLang2(newList);
                        }}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faEyeSlash} />
                    </button>
                </div>
            </div>
            {vocabularies.map((v, index) => (
                <VocabularyItem
                    key={v.id}
                    uncoverWord={(wordIndex, list) => uncoverWord(wordIndex, list)}
                    wordIndex={index}
                    vocabulary={v}
                    coverLang1={coverLang1[index]}
                    coverLang2={coverLang2[index]}
                />
            ))}
        </>
    );
};

export default VocabularyBody;

VocabularyBody.propTypes = {
    currentList: PropTypes.object.isRequired
};
