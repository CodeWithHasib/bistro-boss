import React from 'react';

const PageCover = ({ img }) => {
    return (
        <div className=' md:h-[550px] h-[450px] relative  bg-cover bg-fixed' style={{backgroundImage : `url(${img})`}}>
            <div className="absolute text-white flex flex-col items-center justify-center inset-20 text-center md:inset-36 bg-[#15151599]">
                <h1 className='text-5xl font-bold uppercase font-Cinzel'>our menu</h1>
                <p className='uppercase font-Cinzel my-4'>Would you like to try a dish</p>
            </div>
        </div>
    );
};

export default PageCover;