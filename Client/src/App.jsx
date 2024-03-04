import { useState } from 'react'
import backGroundImage from './assets/background-img.png';
import VideoFrame from './Components/VideoFrame';

function App() {
  const [checkStatus, setCheckStatus] = useState(false);

  const handleCheckStatus = ()=>{
    setCheckStatus(pre=>(!pre))
  }

  return (
    <>
    <div className="bg-[#120826] h-[100vh] w-[100%] ">
        <div className='flex justify-center items-center '>
          <img src="/images/logo.png" alt="logo" style={{height:"60px"}} className='bg-gray-800 rounded-xl'/>
          <h1 className="text-center text-4xl text-white p-2 font-bold">Welcome to V-Glass</h1>
        </div>
        <div className='flex justify-center items-center h-[90%] '>
        {
          !checkStatus ? (
            <div className=" h-[95%] w-[100%] flex justify-center items-center gap-10">
          <div className=" h-[90%] w-[50%] flex justify-end items-center">
              <div className="border-[1px] h-[90%] w-[80%] relative rounded-xl" style={{ backgroundImage: `url(${backGroundImage})` , backgroundPosition:"center" , backgroundBlendMode:"color" , backgroundRepeat:"no-repeat" , backgroundSize:"100%" }}>
                <h1 className='text-gray-400 text-xl text-center p-4'>Here you can try some awsome looking filters</h1>
                <div className=' w-[100%] h-[10%] text-white flex justify-evenly bottom-2 absolute'>
                  <button className='h-8 px-5 rounded-lg hover:bg-gray-600'>Login</button>
                  <button className='h-8 px-5 rounded-lg hover:bg-gray-600'>Google Login</button>
                </div>
              </div>
          </div>
          <div className="h-[90%] w-[50%] flex justify-start items-center">
              <div className="border-[1px] h-[90%] w-[80%] flex justify-center items-center relative rounded-xl">
                  <button className='text-white bg-gradient-to-br from-blue-600 to-green-600 px-3 py-2 rounded-md '  onClick={handleCheckStatus}>Start Your Trial</button>
              </div>
          </div>
        </div>
          ) : (
            <VideoFrame handleCheckStatus={handleCheckStatus}/>
          )
        }
        </div>
    </div>
    </>
  )
}

export default App
