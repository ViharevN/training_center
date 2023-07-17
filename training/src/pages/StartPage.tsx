import React from 'react'
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { LoginForm } from '../components/LoginForm';
 
export function StartPage() {
    return (
        <div className='container mx-auto max-w-full h-full'>
          <Header/>
          <LoginForm/>
          <Footer/>
        </div>
    );
}