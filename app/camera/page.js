"use client"
import React, { useState, useRef } from 'react';

export default function CameraPage(){
    const [image, setImage] = useState(null); // لتخزين الصورة الملتقطة
    const [isFrontCamera, setIsFrontCamera] = useState(false); // للتحقق من نوع الكاميرا المستخدمة
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  

  // تشغيل الكاميرا بناءً على نوع الكاميرا (أمامية أو خلفية)
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: isFrontCamera ? 'user' : 'environment', // اختيار الكاميرا الأمامية أو الخلفية
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  };

  // إيقاف الكاميرا
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // التقاط الصورة
  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/png');
    setImage(imageDataURL);

    // إيقاف الكاميرا بعد التقاط الصورة
    stopCamera();
  };

  // تبديل الكاميرا بين الأمامية والخلفية
  const toggleCamera = () => {
    stopCamera(); // إيقاف الكاميرا الحالية
    setIsFrontCamera((prev) => !prev); // تبديل نوع الكاميرا
    startCamera(); // إعادة تشغيل الكاميرا بالإعداد الجديد
  };



    return (
        <>
        <div>
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Camera Page</span> 0.2.1</h1>
        </div>
        <div style={{ textAlign: 'center' }}>
      {!image ? (
        <>
          <video height={"50%"} ref={videoRef} style={{ display: 'inline' }} /> {/* إخفاء الفيديو */}
          <button onClick={startCamera}>فتح الكاميرا</button>
          <button onClick={takePicture}>التقاط الصورة</button>
          <button onClick={toggleCamera}>
            تبديل إلى الكاميرا {isFrontCamera ? 'الخلفية' : 'الأمامية'}
          </button>
        </>
      ) : (
        <>
          <h3>الصورة الملتقطة:</h3>
          <img src={image} alt="Captured" style={{ maxWidth: '100%' }} />
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'inline' }} /> {/* إخفاء الكانفاس */}
    </div>

        </>
      );
    
}