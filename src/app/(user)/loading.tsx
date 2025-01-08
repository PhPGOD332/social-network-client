'use client'
import React from 'react';
import '../globals.scss';
import Script from "next/script";

const Loading = () => {
    return (
        <div className='loadingBlock'>
            <img src="../../../public/gifs/f16947ca6a616349ed63771804d16250.gif" alt="loading"/>
        </div>
    );
};

export default Loading;