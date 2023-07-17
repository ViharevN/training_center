import React from 'react'
import { CircularProgress } from '@mui/material';
 
export function Loader() {
    return (
        <>
        <div className='text-center text-2xl flex flex-col items-center'>
          <h1 className='m-5'>Загрузка, пожалуйста подождите ...</h1>
          <CircularProgress color="inherit"/>
        </div>
      </>
    )
}

