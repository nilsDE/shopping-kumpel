import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import VocabularyItem from './VocabularyItem';

const VocabularyBody = ({ currentList }) => {
    const [wordPair, setWordPair] = useState({
        lang1: '',
        lang2: ''
    });
    const [coverLang1, setCoverLang1] = useState(new Array(currentList.vocabularies.length).fill(false));
    const [coverLang2, setCoverLang2] = useState(new Array(currentList.vocabularies.length).fill(false));

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

    return (
        <>
            <button
                onClick={() => {
                    const newList = coverLang1.map(() => true);
                    setCoverLang1(newList);
                }}
                type="button"
            >
                Cover Lang 1
            </button>
            <button
                onClick={() => {
                    const newList = coverLang2.map(() => true);
                    setCoverLang2(newList);
                }}
                type="button"
            >
                Cover Lang 2
            </button>
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
            {currentList.vocabularies.map((v, index) => (
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
