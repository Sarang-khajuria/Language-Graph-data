import React from 'react';
import './selfie.css';

const Selfie = () => {

  const videoRef = React.useRef();
  const canvasRef = React.useRef();
  const imageRef = React.useRef();
  const startButton = React.useRef();
  let width = 520; // We will scale the photo width to this
  let height = 0; // This will be computed based on the input stream

  let streaming = false;

  const [permission, setPermission] = React.useState('pending');

  const startup = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    // on success, stream it in video tag
    .then(function(stream) {
      setPermission('fulfilled')
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    })
    .catch(function(err) {
        setPermission('rejected')
    });
    if(permission !== 'rejected') {
      videoRef.current.addEventListener('canplay', function stream(ev) {
        if (!streaming) {
            height = videoRef.current.videoHeight / (videoRef.current.videoWidth / width);
            if (isNaN(height)) {
                height = width / (4 / 3);
            }
            videoRef.current.setAttribute('width', width);
            videoRef.current.setAttribute('height', height);
            canvasRef.current.setAttribute('width', width);
            canvasRef.current.setAttribute('height', height);
            streaming = true;
        }
      }, false);
      startButton.current.addEventListener('click', function(ev) {
        takepicture();
        ev.preventDefault();
      }, false);
    }
  }

  const takepicture = ()=> {
    let context = canvasRef.current.getContext('2d');
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      context.drawImage(videoRef.current, 0, 0, width, height);
  }

  React.useEffect(() => {
    startup();
  },[])
  return (
    <div className="contentarea">
      {
        permission === 'rejected' ?
        <h1> Permission denied by the user</h1>
        :
        <>
          <div className="wpr">
            <video id="video" style={{width: '520px'}} ref={videoRef}>Video stream not available.</video>
          </div>
          <div><button id="startbutton" ref={startButton}>Take photo</button></div>
          <div className="wpr">
            <div className='label'> The captured image will be reflected here</div>
            <canvas id="canvas" ref={canvasRef}></canvas>
          </div>
        </>
      }
    </div>
  )


}



export default Selfie;