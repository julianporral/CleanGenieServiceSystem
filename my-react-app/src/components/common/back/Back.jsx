import React from 'react';
import { withRouter } from 'react-router-dom';

const Back = ({ title, location }) => {
    return (
        <>
            <section className='back'>
                <h2>home / {location.pathname.split("/")[1]}</h2>
                <h1>{title}</h1>
            </section>
            <div className='margin'></div>
        </>
    )
}

export default withRouter(Back);
