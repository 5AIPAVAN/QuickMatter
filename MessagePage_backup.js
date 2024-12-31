// import React, { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Link, useParams } from 'react-router-dom'
// import Avatar from './Avatar'
// import { HiDotsVertical } from "react-icons/hi";
// import { FaAngleLeft } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa6";
// import { FaImage } from "react-icons/fa6";
// import { FaVideo } from "react-icons/fa6";
// import uploadFile from '../helpers/uploadFile';
// import { IoClose } from "react-icons/io5";
// import Loading from './Loading';
// import backgroundImage from '../assets/wallapaper.jpeg'
// import { IoMdSend } from "react-icons/io";
// import moment from 'moment'

// const MessagePage = () => {
//   const params = useParams()
//   const socketConnection = useSelector(state => state?.user?.socketConnection)
//   const user = useSelector(state => state?.user)
//   const [dataUser,setDataUser] = useState({
//     name : "",
//     email : "",
//     profile_pic : "",
//     online : false,
//     _id : ""
//   })
//   const [openImageVideoUpload,setOpenImageVideoUpload] = useState(false)
//   const [message,setMessage] = useState({
//     text : "",
//     imageUrl : "",
//     videoUrl : ""
//   })
//   const [loading,setLoading] = useState(false)
//   const [allMessage,setAllMessage] = useState([])
//   const currentMessage = useRef(null)

//   useEffect(()=>{
//       if(currentMessage.current){
//           currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
//       }
//   },[allMessage])

//   const handleUploadImageVideoOpen = ()=>{
//     setOpenImageVideoUpload(preve => !preve)
//   }

//   const handleUploadImage = async(e)=>{
//     const file = e.target.files[0]

//     setLoading(true)
//     const uploadPhoto = await uploadFile(file)
//     setLoading(false)
//     setOpenImageVideoUpload(false)

//     setMessage(preve => {
//       return{
//         ...preve,
//         imageUrl : uploadPhoto.url
//       }
//     })
//   }
//   const handleClearUploadImage = ()=>{
//     setMessage(preve => {
//       return{
//         ...preve,
//         imageUrl : ""
//       }
//     })
//   }

//   const handleUploadVideo = async(e)=>{
//     const file = e.target.files[0]

//     setLoading(true)
//     const uploadPhoto = await uploadFile(file)
//     setLoading(false)
//     setOpenImageVideoUpload(false)

//     setMessage(preve => {
//       return{
//         ...preve,
//         videoUrl : uploadPhoto.url
//       }
//     })
//   }
//   const handleClearUploadVideo = ()=>{
//     setMessage(preve => {
//       return{
//         ...preve,
//         videoUrl : ""
//       }
//     })
//   }

//   useEffect(()=>{
//       if(socketConnection){
//         socketConnection.emit('message-page',params.userId)

//         socketConnection.emit('seen',params.userId)

//         socketConnection.on('message-user',(data)=>{
//           setDataUser(data)
//         }) 
        
//         socketConnection.on('message',(data)=>{
//           console.log('message data',data)
//           setAllMessage(data)
//         })


//       }
//   },[socketConnection,params?.userId,user])

//   const handleOnChange = (e)=>{
//     const { name, value} = e.target

//     setMessage(preve => {
//       return{
//         ...preve,
//         text : value
//       }
//     })
//   }

//   const handleSendMessage = (e)=>{
//     e.preventDefault()

//     if(message.text || message.imageUrl || message.videoUrl){
//       if(socketConnection){
//         socketConnection.emit('new message',{
//           sender : user?._id,
//           receiver : params.userId,
//           text : message.text,
//           imageUrl : message.imageUrl,
//           videoUrl : message.videoUrl,
//           msgByUserId : user?._id
//         })
//         setMessage({
//           text : "",
//           imageUrl : "",
//           videoUrl : ""
//         })
//       }
//     }
//   }


//   return (
//     <div style={{ backgroundImage : `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
//           <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
//               <div className='flex items-center gap-4'>
//                   <Link to={"/"} className='lg:hidden'>
//                       <FaAngleLeft size={25}/>
//                   </Link>
//                   <div>
//                       <Avatar
//                         width={50}
//                         height={50}
//                         imageUrl={dataUser?.profile_pic}
//                         name={dataUser?.name}
//                         userId={dataUser?._id}
//                       />
//                   </div>
//                   <div>
//                      <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
//                      <p className='-my-2 text-sm'>
//                       {
//                         dataUser.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>
//                       }
//                      </p>
//                   </div>
//               </div>

//               <div >
//                     <button className='cursor-pointer hover:text-primary'>
//                       <HiDotsVertical/>
//                     </button>
//               </div>
//           </header>

//           {/***show all message */}
//           <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
                  
                
//                   {/**all message show here */}
//                   <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
//                     {
//                       allMessage.map((msg,index)=>{
//                         return(
//                           <div className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}>
//                             <div className='w-full relative'>
//                               {
//                                 msg?.imageUrl && (
//                                   <img 
//                                     src={msg?.imageUrl}
//                                     className='w-full h-full object-scale-down'
//                                   />
//                                 )
//                               }
//                               {
//                                 msg?.videoUrl && (
//                                   <video
//                                     src={msg.videoUrl}
//                                     className='w-full h-full object-scale-down'
//                                     controls
//                                   />
//                                 )
//                               }
//                             </div>
//                             <p className='px-2'>{msg.text}</p>
//                             <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
//                           </div>
//                         )
//                       })
//                     }
//                   </div>


//                   {/**upload Image display */}
//                   {
//                     message.imageUrl && (
//                       <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
//                         <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadImage}>
//                             <IoClose size={30}/>
//                         </div>
//                         <div className='bg-white p-3'>
//                             <img
//                               src={message.imageUrl}
//                               alt='uploadImage'
//                               className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
//                             />
//                         </div>
//                       </div>
//                     )
//                   }

//                   {/**upload video display */}
//                   {
//                     message.videoUrl && (
//                       <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
//                         <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo}>
//                             <IoClose size={30}/>
//                         </div>
//                         <div className='bg-white p-3'>
//                             <video 
//                               src={message.videoUrl} 
//                               className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
//                               controls
//                               muted
//                               autoPlay
//                             />
//                         </div>
//                       </div>
//                     )
//                   }

//                   {
//                     loading && (
//                       <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
//                         <Loading/>
//                       </div>
//                     )
//                   }
//           </section>

//           {/**send message */}
//           <section className='h-16 bg-white flex items-center px-4'>
//               <div className='relative '>
//                   <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
//                     <FaPlus size={20}/>
//                   </button>

//                   {/**video and image */}
//                   {
//                     openImageVideoUpload && (
//                       <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
//                       <form>
//                           <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
//                               <div className='text-primary'>
//                                   <FaImage size={18}/>
//                               </div>
//                               <p>Image</p>
//                           </label>
//                           <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
//                               <div className='text-purple-500'>
//                                   <FaVideo size={18}/>
//                               </div>
//                               <p>Video</p>
//                           </label>

//                           <input 
//                             type='file'
//                             id='uploadImage'
//                             onChange={handleUploadImage}
//                             className='hidden'
//                           />

//                           <input 
//                             type='file'
//                             id='uploadVideo'
//                             onChange={handleUploadVideo}
//                             className='hidden'
//                           />
//                       </form>
//                       </div>
//                     )
//                   }
                  
//               </div>

//               {/**input box */}
//               <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
//                   <input
//                     type='text'
//                     placeholder='Type here message...'
//                     className='py-1 px-4 outline-none w-full h-full'
//                     value={message.text}
//                     onChange={handleOnChange}
//                   />
//                   <button className='text-primary hover:text-secondary'>
//                       <IoMdSend size={28}/>
//                   </button>
//               </form>
              
//           </section>



//     </div>
//   )
// }

// export default MessagePage





import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Avatar from './Avatar';
import Loading from './Loading';
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaVideo } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import uploadFile from '../helpers/uploadFile';
import { IoClose } from 'react-icons/io5';
import wallapaper from '../assets/wallapaper.jpeg';
import { IoMdSend } from "react-icons/io";
import moment from 'moment';
import axios from 'axios';


function Message({ msg, userId, onTranslate }) {
  const [showTranslate, setShowTranslate] = useState(false);
  const [translatedText, setTranslatedText] = useState(null);



  const handleTranslate = async () => {
    const translation = await onTranslate(msg.text);
    setTranslatedText(translation);
  };


  return (
    <div
      className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${userId === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}
      onMouseEnter={() => setShowTranslate(true)}
      onMouseLeave={() => setShowTranslate(false)}
    >
      <div className='w-full relative'>
        {msg?.imageUrl && (
          <img 
            src={msg?.imageUrl}
            className='w-full h-full object-scale-down'
          />
        )}
        {msg?.videoUrl && (
          <video
            src={msg.videoUrl}
            className='w-full h-full object-scale-down'
            controls
          />
        )}
      </div>
      <p className='px-2'>{translatedText || msg.text}</p>
      {showTranslate && !translatedText && (
        <button 
          className='text-blue-500 text-xs underline px-2'
          onClick={handleTranslate}
        >
          See Translation
        </button>
      )}
      <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
    </div>
  );
}

export default function MessagePage() {
  const params = useParams();

    // translation language
    const [selectedLanguage, setSelectedLanguage] = useState('te'); // Default to Telugu
    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
      console.log('Selected Language Code:', event.target.value); // Log the selected language code
    };
  

  // you details(logged in user details)
  const user = useSelector(state => state?.user);

  // obtain T/F whether socket is connected or not from redux
  const socketConnection = useSelector(state => state?.user?.socketConnection);

  console.log("Params :", params.userId); // params is an object containing userId 

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  });

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  });

  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(prev => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);
    setMessage(prev => {
      return {
        ...prev,
        imageUrl: uploadPhoto?.url
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadVideo = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);
    setMessage(prev => {
      return {
        ...prev,
        videoUrl: uploadVideo?.url
      };
    });
  };

  const handleClearUploadImage = () => {
    setMessage(prev => {
      return {
        ...prev,
        imageUrl: ""
      };
    });
  };

  const handleClearUploadVideo = () => {
    setMessage(prev => {
      return {
        ...prev,
        videoUrl: ""
      };
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setMessage(prev => {
      return {
        ...prev,
        text: value
      };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id
        });
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        });
      }
    }
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);

      socketConnection.on('message-user', (data_of_that_person) => {
        setDataUser(data_of_that_person);
      });

      socketConnection.on('message', (data) => {
        setAllMessage(data);
      });
    }
  }, [socketConnection, params.userId, user]);

  const currentMessage = useRef(null);
  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [allMessage]);



  // const translateMessage = async (text) => {
  //   // Placeholder for translation logic
  //   return `Translated: ${text}`;
  // };


  const translateMessage = async (text) => {
    try {
      // Define your target language code (e.g., 'en', 'te', 'es')
      const targetLanguage = 'te'; // Example: Translate to English
      
      // Use the translateText function to get the translated text
      const translatedText = await translateText(text, targetLanguage);
      
      // Return the translated text
      return translatedText;
    } catch (error) {
      console.error('Error in translating message:', error.message);
      
      // Return a fallback message if translation fails
      return 'Translation not available.';
    }
  };
  


  // Import the Axios library for making HTTP requests
// const axios = require('axios');

// Replace this with your Google Cloud API key
const API_KEY = 'AIzaSyCf_Knl1wpapXGgdO733G3j8Kj-FiLL54s';

/**
 * Translates the given text using the Google Translate API.
 *
 * @param {string} text - The text to translate.
 * @param {string} targetLanguage - The target language code (e.g., 'en', 'es', 'te').
 * @returns {Promise<string>} - A promise that resolves to the translated text.
 */
async function translateText(text, targetLanguage) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      q: text, // Text to be translated
      target: targetLanguage, // Target language code
      format: 'text' // Optional: Specify format (e.g., "text" or "html")
    });

    // Extract the translated text from the API response
    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error('Error while translating text:', error.response?.data || error.message);
    throw new Error('Translation failed. Please try again later.');
  }
}

// Example usage
(async () => {
  const inputText = 'Hello, how are you?';
  const targetLanguage = 'te'; // Telugu (change to any target language code)

  try {
    const translatedText = await translateText(inputText, targetLanguage);
    console.log('Translated text:', translatedText);
  } catch (error) {
    console.error('Translation failed:', error.message);
  }
})();




  return (
    <div style={{ 'backgroundImage': `url(${wallapaper})` }} className='bg-no-repeat bg-cover bg-opacity-50'>

      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden'>
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              ProfilePicUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2 text-sm'>
              {dataUser.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>}
            </p>
          </div>
        </div>

        <div>
        <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="ml-2 p-2 border rounded cursor-pointer"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
      </select>
          <button className='cursor-pointer hover:text-primary'>
            <HiDotsVertical />
          </button>
        </div>
      </header>

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>

        <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
          {allMessage.map((msg, index) => (
            <Message 
              key={index} 
              msg={msg} 
              userId={user._id} 
              onTranslate={translateMessage} 
            />
          ))}
        </div>

        {message.imageUrl && (
          <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
            <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadImage}>
              <IoClose size={30} />
            </div>
            <div className='bg-white p-3'>
              <img
                src={message.imageUrl}
                alt='uploadImage'
                className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
              />
            </div>
          </div>
        )}

        {message.videoUrl && (
          <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
            <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo}>
              <IoClose size={30} />
            </div>
            <div className='bg-white p-3'>
              <video 
                src={message.videoUrl} 
                className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}
        {loading && (
          <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
            <Loading />
          </div>
        )}
      </section>

      <section className='h-16 bg-white flex items-center px-4'>
        <div className='realtive '>
          <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center rounded-full w-11 h-11 hover:bg-primary hover:text-white'> 
            <FaPlus size={20} />
          </button>

          {openImageVideoUpload && (<div className='bg-white shadow rounded absolute bottom-20 w-36 p-2'>
            <form>
              <label htmlFor='uploadImage' className='flex items-center p-2 px-2 gap-3 hover:bg-slate-200 cursor-pointer'>
                <div className='text-primary'>
                  <FaImage size={18} />
                </div>
                <p> Image </p>
              </label>

              <label htmlFor='uploadVideo' className='flex items-center p-2 px-2 gap-3 hover:bg-slate-200 cursor-pointer'>
                <div className='text-purple-500'>
                  <FaVideo size={18} />
                </div>
                <p> Video </p>
              </label>

              <input type='file'
                id='uploadImage'
                onChange={handleUploadImage}
                className='hidden' />

              <input type='file'
                id='uploadVideo'
                onChange={handleUploadVideo}
                className='hidden' />

            </form>
          </div>
          )}

        </div>

        <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
          <input
            type='text'
            placeholder='Type here message...'
            className='py-1 px-4 outline-none w-full h-full'
            value={message.text}
            onChange={handleOnChange}
          />
          <button className='text-primary hover:text-secondary'>
            <IoMdSend size={28} />
          </button>
        </form>

      </section>

    </div>
  );
}
