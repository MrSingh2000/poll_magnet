import React from 'react';

function AllPolls({db}) {
    // const 

    return (
        <>
            <div>
                these are all polls
            </div>
        </>
    )
}

function Dashboard({db}) {
    return (
        <div className='container w-full m-auto'>
            <div>
                Dashboard
            </div>
            <AllPolls db={db}/>
        </div>
    )
}

export default Dashboard