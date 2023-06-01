import React from 'react';
import { Button, Card } from 'antd';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Main } from '../../../styled';

function Finish()
{
    return (
        <>
        <Main>
        <h1>Finish</h1>
        <Card>
                <h1>Thank you</h1>
                <Button className="btn-create" type="primary" size="large">
                    <NavLink to="/signin">Login</NavLink>
                </Button>
        </Card>
        </Main>
        </>
    );
}

export default Finish;