import React, { useContext } from 'react';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';

import './loadingSpinner.css';

export default function useLoadingSpinner(type) {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const { loading: listLoading } = listContext;
    const { loading: authLoading } = authContext;

    const loading = listLoading || authLoading;

    return {
        loadingSpinner: <div className={`loading-animation ${type === 'dark' ? 'dark-spinner' : ''}`} />,
        isLoading: loading
    };
}
