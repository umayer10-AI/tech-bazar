import Sidebar from '@/components/Sidebar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <div className='w-full ml-10'>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default layout;