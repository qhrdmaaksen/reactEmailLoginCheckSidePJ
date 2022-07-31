import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {AuthContextProvider} from "./Store/auth-context";

/*AuthContextProvider 로 감싸줘서 로그인 인증 처리에대한 전역처리 설정*/
ReactDOM.render(<AuthContextProvider><App/></AuthContextProvider>,document.getElementById('root'));