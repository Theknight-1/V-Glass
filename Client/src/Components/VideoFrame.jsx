import React, { useRef, useState } from 'react'
import {XCircleIcon} from '@heroicons/react/24/solid'
import axios from 'axios';
import io from 'socket.io-client';
import './VideoFrame.moudle.css'


const VideoFrame = ({handleCheckStatus}) => {
  const [stream , setStream] = useState();
  const [loading , setLoading] = useState(false);
  const videoRef = useRef(null);
  const socket = useRef(null);


    //Now convert the each frame of the video so that we can send it to the backend
    const sendFrame = () => {
      if (videoRef.current && socket.current) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');
    
        // Ensure video metadata is loaded
        if (videoRef.current.readyState < 2) {
          videoRef.current.onloadedmetadata = () => {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imgData = canvas.toDataURL('image/jpeg');
            console.log(imgData);
            sendDataToBackend(imgData); 
          };
        } else {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imgData = canvas.toDataURL('image/jpeg');
          console.log(imgData);
          sendDataToBackend(imgData);
        }

        // Request next frame
        requestAnimationFrame(sendFrame);
      }
    }
    
    const sendDataToBackend = (imgData) => {
      axios.post('http://localhost:3000/start', { imgData })
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        })
    }



    const handleStartStreaming=async()=>{
        try {
          setLoading(pre=>!pre)
          // Initialize Socket.IO connection
          socket.current = io();

          //Get access to user's camera
          navigator.mediaDevices.getUserMedia({video:true})
          .then((mediaStream)=>{
            setStream(mediaStream);
            if(videoRef.current){
              videoRef.current.srcObject = mediaStream;
            }
            setLoading(pre=>!pre);
          }).then(()=>sendFrame());
        } catch (error) {
            console.log('Error accessing camera:' , error);
        }
    }
    const handleEndStreaming=()=>{
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        if (socket.current) {
          socket.current.disconnect();
        }
      };


      const handleCloseButton = ()=>{
        handleEndStreaming();
        handleCheckStatus();
      }



  return (
    <div className="border-[1px] border-gray-700 h-[90%] w-[80%] flex justify-center items-center relative rounded-xl p-1">
                  <button className='absolute top-2 right-2'  onClick={handleCloseButton}><XCircleIcon className="h-8 w-8 text-blue-300"/></button>
                  <div className=' h-[100%] w-[70%]'>
                    <div className='bg-black h-[90%] w-[70%] border-[1px]  block m-auto rounded-lg mt-1 overflow-hidden'>
                      {/* Video stream */}
                        <video src="" ref={videoRef}  style={{ height: '100%' }} autoPlay playsInline muted/>
                    </div>
                    <div className='h-[10%] flex justify-evenly items-center'>
                      <button onClick={handleStartStreaming} className='text-white bg-gradient-to-br from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-10 px-3 py-2 rounded-md'>
                        {
                          loading ? (
                            <div className='startLoading'></div>
                          ):(
                            <span>start</span>
                          )
                        }
                      </button>
                      <button onClick={handleEndStreaming} className='bg-red-600 h-10 text-white px-3 rounded-lg hover:bg-red-700'>End</button>
                    </div>
                  </div>
              </div>
  )
}

export default VideoFrame
