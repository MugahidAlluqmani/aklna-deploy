"use client"
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { database, ref, push, set, onValue, remove, update, auth, provider, signInWithPopup, signOut,requestPermission, onMessageListener } from './firebaseConfig';
import { getMessaging, getToken, onMessage} from "firebase/messaging";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDwRmXALG8cE3U2pGio670j27N0HFXAnWs",
  authDomain: "aklna-62ccc.firebaseapp.com",
  databaseURL: "https://aklna-62ccc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aklna-62ccc",
  storageBucket: "aklna-62ccc.appspot.com",
  messagingSenderId: "999018453356",
  appId: "1:999018453356:web:5f318ce94a5bf62610bb49",
  measurementId: "G-Q0E0GZ1H31"
};

export default function Home() {
  useEffect(() => {
    // طلب الإذن
    requestPermission();

    // الاستماع للإشعارات
    onMessageListener()
      .then((payload) => {
        console.log("Message received: ", payload);
      })
      .catch((err) => console.error("Failed to receive message: ", err));
  }, []);

/*
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      // تسجيل Service Worker
      navigator.serviceWorker.register("/firebase-messaging-sw.js").then((registration) => {
        getToken(messaging, {
          vapidKey: "BF5aiNgR55vkSFThnnyn9GEoD97NmSgCxRkykaaeN1NATWjX1bgI96khLuXeVCf1lPdVjiMta9AZiCdOGMFmfPs",
          serviceWorkerRegistration: registration,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
            } else {
              console.warn("No registration token available.");
            }
          })
          .catch((err) => console.error("Error getting FCM token: ", err));
      });

      // طلب الإذن للإشعارات
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.warn("Notification permission denied.");
        }
      });

      // استقبال الرسائل في المقدمة
      onMessage(messaging, (payload) => {
        console.log("Message received in foreground: ", payload);

        // عرض إشعار يدوي
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: payload.notification.icon,
        };

        new Notification(notificationTitle, notificationOptions);
      });
    }
  }, []);
*/

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskSelectOption, setTaskSelectOption] = useState('');
  const [imageInput, setImageInput] = useState(null); // For uploaded or captured images
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editTaskSelectOption, setEditTaskSelectOption]= useState('');
  const [editImageInput, setEditImageInput] = useState(null); // For editing images
  const [cameraMode, setCameraMode] = useState(false); // To control camera mode
  const [isEditingCamera, setIsEditingCamera] = useState(false); // To track if the camera is used during editing
  const [user, setUser] = useState(null); // To track authenticated user


  const videoRef = useRef(null); // Ref to the video element
  const canvasRef = useRef(null); // Ref to the canvas to capture the image


  useEffect(() => {
    // جلب المهام الخاصة بالمستخدم بعد تسجيل الدخول فقط
    if (user) {
      const tasksRef = ref(database, `tasks/${user.uid}`);
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedTasks = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTasks(formattedTasks);
        } else {
          setTasks([]); // إذا لم يكن هناك بيانات، تعيين المهام كقائمة فارغة
        }
      });
    }
  }, [user]);

  // Google Sign-In
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Login error: ", error);
      });
  };

  // Google Sign-Out
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout error: ", error);
      });
  };



  // DATE
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }
   // Handle image upload
   const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageInput(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 // Handle taking a picture from the camera
 const handleTakePicture = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  // Draw the current frame from the video to the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // Convert the canvas image to a data URL
  const imageDataURL = canvas.toDataURL('image/png');
  if (isEditingCamera) {
    setEditImageInput(imageDataURL); // Set the image in edit mode
  } else {
    setImageInput(imageDataURL); // Set the image when adding a new task
  }
  setCameraMode(false); // Exit camera mode
  setIsEditingCamera(false); // Reset camera editing mode
};

  // Start the camera stream
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('Error accessing the camera', err);
      });
    setCameraMode(true); // Enable camera mode
  };

  // Stop the camera stream
  const stopCamera = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop()); // Stop all camera tracks
    setCameraMode(false); // Disable camera mode

  };
  // Start camera for editing task
  const startEditCamera = () => {
    setIsEditingCamera(true);
    startCamera();
  };

  // Add a new task
  
  const addTask = () => {
    if (taskInput.trim() && imageInput && user) {
      const tasksRef = ref(database, `tasks/${user.uid}`);
      const newTaskRef = push(tasksRef);
      set(newTaskRef, {
        text: taskInput,
        selectOption: taskSelectOption,
        imageUrl: imageInput,
        user: user.uid, // حفظ المهمة تحت معرف المستخدم (UID)
      });
      setTaskInput('');
      setImageInput(null);
    }
  };



  // Delete a task

  const deleteTask = (id) => {
    const taskRef = ref(database, `tasks/${user.uid}/${id}`);
    remove(taskRef);
  };


  // Start editing a task
  const editTask = (id, text, selectOption, imageUrl) => {
    setIsEditing(id);
    setEditInput(text);
    setEditTaskSelectOption(selectOption);
    setEditImageInput(imageUrl);
  };

  // Save the edited task

  const saveTask = (id) => {
    const taskRef = ref(database, `tasks/${user.uid}/${id}`);
    update(taskRef, {
      text: editInput,
      selectOption: editTaskSelectOption,
      imageUrl: editImageInput || tasks.find((task) => task.id === id).imageUrl,
    });
    setIsEditing(null);
  };



  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Test Firebase Cloud Messaging</h2>
      <h1>To-Do List</h1>
            {/* User is not logged in */}
            {!user ? (
        <div>
          <p>Please log in with Google to access your tasks.</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      ) : (
        <>
          {/* User is logged in */}  
      <div>
      <p>Welcome, {user.displayName}! <button onClick={handleLogout}>Logout</button></p>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          style={{ marginRight: '10px' }}
        />
        <form className="max-w-sm mx-auto">
          <label for="SelectOption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
          <select onChange={(e)=>setTaskSelectOption(e.target.value)} id="SelectOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose Level</option>
            <option value="Hard">Hard</option>
            <option value="Mediam">Mediam</option>
            <option value="Easy">Easy</option>
          </select>
        </form>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginRight: '10px' }}
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={startCamera}>Take Picture</button>
      </div>
        </>
      )}
      {/* Camera Mode */}
      {cameraMode && (
        <div>
          <video ref={videoRef} style={{ width: '300px', height: '200px' }}></video>
          <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="200"></canvas>
          <button onClick={handleTakePicture}>Capture</button>
          <button onClick={stopCamera}>Close Camera</button>
        </div>
      )}
      {/* Preview the captured image */}
      {imageInput && !cameraMode && (
        <div>
          <h3>Captured/Uploaded Image:</h3>
          <img src={imageInput} alt="Captured" style={{ width: '100px', height: '100px' }} />
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '20px' }}>
            {isEditing === task.id ? (
              <div>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  placeholder="Edit task"
                  style={{ marginRight: '10px' }}
                />
                <form className="max-w-sm mx-auto">
                  <label for="SelectOption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                  <select onChange={(e)=>setEditTaskSelectOption(e.target.value)} id="SelectOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose Level</option>
                    <option value="Hard">Hard</option>
                    <option value="Mediam">Mediam</option>
                    <option value="Easy">Easy</option>
                  </select>
                </form>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ marginRight: '10px' }}
                />
                <button onClick={startEditCamera}>Retake Picture</button> {/* New Retake Picture button */}
                <button onClick={() => saveTask(task.id)}>Save</button>
                <img
                    src={editImageInput}
                    alt="Edit Preview"
                    style={{ width: '50px', height: '50px', marginTop: '10px' }}
                  />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={task.imageUrl}
                  alt={task.text}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {task.text}  
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {task.selectOption}  
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
                <button
                  onClick={() => editTask(task.id, task.text, task.selectOption, task.imageUrl)}
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div>
    </div>
    </div>
    
);
}
