import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/auth-context";

const Home = () => {
  const contextLogInOut = useContext(AuthContext)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={contextLogInOut.onLogout}>로그아웃</Button>
    </Card>
  );
};

export default Home;
