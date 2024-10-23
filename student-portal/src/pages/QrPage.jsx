import React from 'react'
import QrCard from '@/components/qr/QrCard'
import Header from '@/components/nav/Header';
const QrPage = () => {
  return (
    <div className='h-screen flex justify-center items-center p-10'>
        <Header/>
        <QrCard/>
    </div>
  )
}

export default QrPage
