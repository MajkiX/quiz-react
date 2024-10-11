import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultPage = () => {
    let location = useLocation()
    const { points } = location.state

    return (
        <div>
            <p>resutls: {points} / 10</p>
            <button><Link to='/'>Main Page</Link></button>
        </div>
    );
}

export default ResultPage;