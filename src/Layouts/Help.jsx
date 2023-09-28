
import React, { useState, useEffect,useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios';
import Pdf from "../Assets/Pdf.png";
import Openbook1 from "../Assets/Openbook1.png";
import search2 from "../Assets/search2.png";
import folder2 from "../Assets/folder2.png";
import { Dialog } from 'primereact/dialog';
import { Toast } from "primereact/toast";


function VideoList() {
 const [selectedVideo, setSelectedVideo] = useState(null);
 const [displayBasic, setDisplayBasic] = useState(false);
  
 const [videoName, setVideoName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploadedBy,  setLoginUser] = useState();
  const [position, setPosition] = useState('center');
  const toast = useRef(null);



  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
   
}


const onClick = (name, position) => {

  console.log("position:",position);
    dialogFuncMap[`${name}`](true);

    if (position) {
      // console.log(position,"????????????/")
        setPosition(position);
setVideoName(position)
        
        try {
     
          if(position==="Document Upload.mp4"){
          setSelectedVideo(`http://dams.anemoi.co.in/api/help/api/${encodeURIComponent("Document Upload.mp4")}`);
          // setSelectedVideo(`${process.env.REACT_APP_API_KEY}/help/api/${encodeURIComponent("Document Upload.mp4")}`);
          }
          else if(position==="Financial Manual.mp4"){
          setSelectedVideo(`http://dams.anemoi.co.in/api/help/api/${encodeURIComponent("Financial Manual.mp4")}`);
          // setSelectedVideo(`${process.env.REACT_APP_API_KEY}/help/api/${encodeURIComponent("Financial Manual.mp4")}`);
          }
          else if(position==="Search Bot.mp4"){
          setSelectedVideo(`http://dams.anemoi.co.in/api/help/api/${encodeURIComponent("Search Bot.mp4")}`);
          // setSelectedVideo(`${process.env.REACT_APP_API_KEY}/help/api/${encodeURIComponent("Search Bot.mp4")}`);
          }
          else{
            alert("error")
          }
    
    
        } catch (error) {
          console.error('Error fetching video:', error);
        }
    }

}

const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
}


  useEffect(() => {
   
setLoginUser(sessionStorage.getItem('userName'));
    
  }, []);



  const getPdf = async () => {
    console.log("inside get videos");
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);
      // setPdfUrl(pdfUrl);
      // toast.current.show({
      //   severity: "success",
      //   summary: "Loading...!! ",
      //   detail: "Wait for a while",
      // });

      window.open(pdfUrl, '_blank');

    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const handleOpenPdf = () => {
    getPdf();
  };

  

  const fetchVideos = async (data) => {
    console.log(data, "data");
    try {
     
      if(data==="Document Upload.mp4"){
        setSelectedVideo(`${process.env.REACT_APP_API_KEY}/help/api/${encodeURIComponent("Document Upload.mp4")}`);
        }
        else if(data==="Financial Manual.mp4"){
        setSelectedVideo(`${process.env.REACT_APP_API_KEY}/help/api/${encodeURIComponent("Financial Manual.mp4")}`);
  
        }
        else if(data==="Search Bot.mp4"){
        setSelectedVideo(`${process.env.REACT_APP_API_KEY}/help/api/${encodeURIComponent("Search Bot.mp4")}`);
  
        }
      else{
        alert("error")
      }


    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

//   const header = (
//     <Card style={{background:"#7BCCB5",width:"100%",height:"25vh", display: "flex",borderRadius:'2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    
//      justifyContent: "center",
//      aligntems: "center",
//      color:"white"
//      }}>
//       <h1>Hii {uploadedBy},what can i help you find today?</h1>
//     </Card>
    
//   )
//   const footer = (
//     <span>
       
//     </span>
// );


  return (

    <>
   
     <Card style={{height:"550px"}}   >

     <div class="grid">
    <div class="col-12 md:col-6 lg:col-3">
      {/* header={header} */}

    <Card style={{height:"300px",backgroundColor:"#F5FFFA"}}>
<img style={{height:"150px",width:"70%",marginLeft:"10%", objectFit:"contain"}}  src={Pdf} alt="Pdf" />

<br/>
          <b>This PDF will help you with your Search Combination.</b>
          <br/>
          <br/>
          
          <Button
            style={{ backgroundColor: '#203570' ,borderRadius:"2px"}}
            className="p-button-sm"
            onClick={handleOpenPdf}
          >
            Open PDF
          </Button>
        </Card>
    </div>
    <div class="col-12 md:col-6 lg:col-3">
    <Card style={{height:"300px",backgroundColor:"#F5FFFA"}}>
        <img style={{height:"140px",width:"60%",marginLeft:"20%"}}  src={folder2} alt="folder2" />
        <br/>
       <b>Document Upload specifies the complete flow of how the document is being added to the Application . </b>
       <br/>
       <br/>
        <Button
                      style={{ backgroundColor: '#203570',borderRadius:"2px" }}
                      className="p-button-sm"
                      onClick={() => onClick('displayBasic','Document Upload.mp4')}

                    >
                      Watch Video
                    </Button>
        </Card>

    </div>
    <div class="col-12 md:col-6 lg:col-3">
    <Card style={{height:"300px",backgroundColor:"#F5FFFA"}}>
        <img style={{height:"140px",width:"90%",marginLeft:"5%"}}  src={Openbook1} alt="Openbook1" />
        <br/>

        <b>TOC[Table of Content]-Financial Manual displays the all Content of your Document. </b>
        <br/>
        <br/>
       
        <Button
                      style={{ backgroundColor: '#203570',borderRadius:"2px" }}
                      className="p-button-sm"
                      onClick={() => onClick('displayBasic','Financial Manual.mp4')}
                    >                      

                      Watch Video
                    </Button>
        </Card>
    </div>
    <div class="col-12 md:col-6 lg:col-3">
    <Card style={{height:"300px",backgroundColor:"#F5FFFA"}} >
      <img style={{height:"130px",width:"100%"}}  src={search2} alt="search2" />
        <br/>
        <br/>
        <b>SearchBot demonstrates various search action is that can be performed on Approved Document. </b>
        <br/>
        <br/>
        <Button
                      style={{ backgroundColor: '#203570',borderRadius:"2px" }}
                      className="p-button-sm"
                      onClick={() => onClick('displayBasic','Search Bot.mp4')}
                      // onMouseDown={()=>fetchVideos('Search Bot.mp4')}
                    >
                      Watch Video
                    </Button>
        </Card>
      
    </div>
</div>
      
        
      


        
      
        
        
      
    
 <div>
      

        {selectedVideo ? (

          <div>
          


<div>
{/* header="Header" */}
                <Dialog header={videoName} visible={displayBasic} style={{ width: '80vw' }}  onHide={() => onHide('displayBasic')}>
  

                <video style={{ width: '100%', height: '410px' }} controls>
              <source src={selectedVideo} type="video/mp4" />
            </video>
                </Dialog>


</div>
            
          
          
          </div>
        ) : (
          <></>
          

          
        )}

       
      </div>
      </Card>
      <Toast ref={toast} />

    </>
  );

}

export default VideoList;













// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import { ProgressSpinner } from 'primereact/progressspinner';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showVideos, setShowVideos] = useState(false); // Add showVideos state

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
 
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       // Create a new instance of JSZip
//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       // Get the list of file names inside the zip
//       const fileNames = Object.keys(zipFile.files);

//       // Filter out only video files (e.g., .mp4)
//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       // Extract the videos and get their URLs
//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );


     
//       setVideos(videoURLs);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     }
//   };

//   const handleVideoClick = (video) => {
//     // setLoading(false);
//     setSelectedVideo(video);
//   };
//   const handleClick = () => {
//     // setLoading(false);
//     // setSelectedVideo(video);
//   };

//   const handleViewVideos = () => {
//     setLoading(true);
//     setShowVideos(true);
//   };

//   return (
//     <div>

// {loading ? (
//           <span className="loading">
//             <ProgressSpinner />
//           </span>
//                   ) : null}
     
//         {selectedVideo ? (
            
//           <div>
//             <h5>{selectedVideo.fileName}</h5>
//             <video style={{ width: '100%', height: '500px' }} controls>
//               <source src={selectedVideo.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <button onClick={() => setSelectedVideo(null)}>Back to List</button>
//           </div>
//         ) : (
          
//           <div onClick={handleClick}>
            
//             {showVideos ? (

//               videos.map((video) => (
                
//                 <div key={video.fileName}>
//                   <h2>{video.fileName}</h2>
                  
//                   <Button
//                     style={{ backgroundColor: '#203570' }}
//                     className="p-button-sm"
//                     onClick={() => handleVideoClick(video)}
//                   >
//                     Watch Video
//                   </Button>
//                 </div>
                
//               ))
//             ) : (
//               <Button
//                 style={{ backgroundColor: '#203570' }}
//                 className="p-button-sm"
//                 onClick={handleViewVideos}
//               >
//                 View Videos
//               </Button>
//             )}
//           </div>
          
//         )}
     
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
     
//       <VideoList />
     
//     </div>
//   );
// }

// export default App;








// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [pdfData, setPdfData] = useState(null);

//   useEffect(() => {
//     fetchVideos();

//     fetchData();
  
//   }, []);

  
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//         responseType: 'blob', // Set the response type to 'blob' to receive binary data
//       });
//       setPdfData(response.data);
//     } catch (error) {
//       console.error('Error fetching PDF data:', error);
//     }
//   };

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       // Create a new instance of JSZip
//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       // Get the list of file names inside the zip
//       const fileNames = Object.keys(zipFile.files);

//       // Filter out only video files (e.g., .mp4)
//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       // Extract the videos and get their URLs
//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setSelectedVideo(video);
//   };

  
//   const downloadPdf = () => {
//     if (pdfData) {
//       const url = window.URL.createObjectURL(new Blob([pdfData]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'document.pdf');
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       ) : null}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={() => setSelectedVideo(null)}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {videos.map((video) => (
//             <div key={video.fileName}>
//               <h2>{video.fileName}</h2>
//               <Button
//                 style={{ backgroundColor: '#203570' }}
//                 className="p-button-sm"
//                 onClick={() => handleVideoClick(video)}
//               >
//                 Watch Video
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

// <div>
//       {/* <button onClick={fetchData}>Fetch PDF</button> */}
//       <Button label="Download PDF" onClick={downloadPdf} >
       
//       </Button>
//     </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <VideoList />
//     </div>
//   );
// }

// export default App;
















// import React, { useState } from 'react';
// import axios from 'axios';

// const PdfDisplay = () => {
//   const [pdfData, setPdfData] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//         responseType: 'blob', // Set the response type to 'blob' to receive binary data
//       });
//       setPdfData(response.data);
//     } catch (error) {
//       console.error('Error fetching PDF data:', error);
//     }
//   };

//   const downloadPdf = () => {
//     if (pdfData) {
//       const url = window.URL.createObjectURL(new Blob([pdfData]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'document.pdf');
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     }
//   };

//   return (
//     <div>
//       {/* <button onClick={fetchData}>Fetch PDF</button> */}
//       <button onClick={downloadPdf} >
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default PdfDisplay;







// import React, { useState } from 'react';

// const DownloadPDF = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const downloadPDF = () => {
//     const url = `${process.env.REACT_APP_API_KEY}/help/images`; // Replace with your API endpoint URL

//     setLoading(true);

//     fetch(url)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'example.pdf';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <button onClick={downloadPDF} disabled={loading}>
//         {loading ? 'Downloading...' : 'Download PDF'}
//       </button>
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// };

// export default DownloadPDF;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

 

// const PdfViewer = () => {
//   const [pdfUrl, setPdfUrl] = useState('');

 

//   useEffect(() => {
//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

 

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

 

//     getPdf();
//   }, []);

 

//   return (
// <div>
// <h1>PDF Viewer</h1>
//       {pdfUrl && (
// <embed
//           src={pdfUrl}
//           type="application/pdf"
//           width="100%"
//           height="500px"
//         />
//       )}
// </div>
//   );
// };

 

// export default PdfViewer;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PdfViewer = () => {
//   const [pdfUrl, setPdfUrl] = useState('');

//   useEffect(() => {
//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   return (
//     <div>
//       {/* <h1>PDF Viewer</h1> */}
//       {/* {pdfUrl && (
//         <div>
//           <embed
//             src={pdfUrl}
//             type="application/pdf"
//             width="100%"
//             height="500px"
//           /> */}
//           <button onClick={handleOpenPdf}>Open PDF</button>
//         {/* </div>
//       )} */}
//     </div>
//   );
// };

// export default PdfViewer;








// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {videos.map((video) => (
//             <div key={video.fileName}>
//                 <Card>
//               <h2>{video.fileName}</h2>
//               <Button
//                 style={{ backgroundColor: '#203570' }}
//                 className="p-button-sm"
//                 onClick={() => handleVideoClick(video)}
//               >
//                 Watch Video
//               </Button>
//               </Card>
//             </div>
//           ))}
//         </div>
//       )}

//       <br />
// <Card style={{width:"20%"}}>
//       <Button
//         style={{ backgroundColor: '#203570' }}
//         className="p-button-sm"
//         onClick={handleOpenPdf}
//       >
//         Open PDF
//       </Button>
//       </Card>
//     </div>
//   );
// }

// export default VideoList;







// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
// //   const [loading1, setLoading1] = useState(false);
//   const [loading, setLoading] = useState(false)
// //   const [loading, setLoading] = useState(true); // Initialize loading state as true
//   const [showVideos, setShowVideos] = useState(false); // Add showVideos state
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   useEffect(() => {
//     fetchVideos();



//     const getPdf = async () => {
//         try {
//           const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//             responseType: 'arraybuffer',
//           });
  
//           const blob = new Blob([response.data], { type: 'application/pdf' });
//           const pdfUrl = URL.createObjectURL(blob);
//           setPdfUrl(pdfUrl);
//         } catch (error) {
//           console.error('Error fetching PDF:', error);
//         }
//       };
  
//       getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     // setLoading(true);
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       // Create a new instance of JSZip
//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       // Get the list of file names inside the zip
//       const fileNames = Object.keys(zipFile.files);

//       // Filter out only video files (e.g., .mp4)
//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       // Extract the videos and get their URLs
//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false); // Set loading to false after videos are fetched
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);// Set loading to false in case of an error
//     }
//   };


//   const handleVideoClick = (video) => {
//     setSelectedVideo(video);
//   };

//   const handleViewVideos = () => {
//     setLoading(true);
    
//     setTimeout(() => {
//       setShowVideos(true);
//       setLoading(false);
//     },5000); // Assuming a 2-second delay for demonstration purposes
//   };
  
//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };



  


//   return (
//     <div>
//       {loading && ( // Show the loader only if loading is true
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//                 <h2>{video.fileName}</h2>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <Button
//               style={{ backgroundColor: '#203570' }}
//               className="p-button-sm"
//               onClick={handleViewVideos}
//             >
//               View Videos
//             </Button>
//           )}
//         </div>
//       )}



// <br/>


// <Button style={{ backgroundColor: '#203570' }} className='p-button-sm' onClick={handleOpenPdf}>Open PDF</Button>

//     </div>
//   );
// }

// export default  VideoList;








// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {videos.map((video) => (
//             <div key={video.fileName}>
//               <h2>{video.fileName}</h2>
//               <Button
//                 style={{ backgroundColor: '#203570' }}
//                 className="p-button-sm"
//                 onClick={() => handleVideoClick(video)}
//               >
//                 Watch Video
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

//       <br />

//       <Button
//         style={{ backgroundColor: '#203570' }}
//         className="p-button-sm"
//         onClick={handleOpenPdf}
//       >
//         Open PDF
//       </Button>
//     </div>
//   );
// }

// export default VideoList;





// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showVideos, setShowVideos] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
    
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleViewVideos = () => {
//     setLoading(true);

//     // setTimeout(() => {
//       setShowVideos(true);
//     //   setLoading(false);
//     // }, 15000);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//                 <h2>{video.fileName}</h2>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <Button
//               style={{ backgroundColor: '#203570' }}
//               className="p-button-sm"
//               onClick={handleViewVideos}
//             >
//               View Videos
//             </Button>
//           )}
//         </div>
//       )}

//       <br />

//       <Button
//         style={{ backgroundColor: '#203570' }}
//         className="p-button-sm"
//         onClick={handleOpenPdf}
//       >
//         Open PDF
//       </Button>
//     </div>
//   );
// }

// export default VideoList;









// import React, { useRef } from 'react';
// import { TieredMenu } from 'primereact/tieredmenu';
// import { Button } from 'primereact/button';

// const TieredMenuDemo = () => {
//     const menu = useRef(null);
//     const items = [
//         {
//             label:'File',
//             icon:'pi pi-fw pi-file',
//             items:[
//                 {
//                     label:'New',
//                     icon:'pi pi-fw pi-plus',
                  
//                 },
//                 {
//                     label:'Delete',
//                     icon:'pi pi-fw pi-trash'
//                 },
//                 {
//                     separator:true
//                 },
//                 {
//                     label:'Export',
//                     icon:'pi pi-fw pi-external-link'
//                 }
//             ]
//         },
//         {
//             label:'Edit',
//             icon:'pi pi-fw pi-pencil',
           
//         }
    
//     ];

//     return (
//         <div>
//             <div className="card">
              
              

//                 <h5>Overlay</h5>
//                 <TieredMenu model={items} popup ref={menu} id="overlay_tmenu" />
//                 <Button label="Show" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-haspopup aria-controls="overlay_tmenu"/>
//             </div>
//         </div>
//     );
// }
//                  export default TieredMenuDemo;




// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { TieredMenu } from 'primereact/tieredmenu';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Button } from 'primereact/button';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showVideos, setShowVideos] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleViewVideos = () => {
//     setLoading(true);
//     setShowVideos(true);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };



//   const pdfMenuItems = [
//     {
//         label: 'View Videos',
//         command: handleViewVideos,
//         items:[
//             {
//                 label:'New',
//                 icon:'pi pi-fw pi-plus',
              
//             },
//             {
//                 label:'Delete',
//                 icon:'pi pi-fw pi-trash'
//             },
//             {
//                 separator:true
//             },
//             {
//                 label:'Export',
//                 icon:'pi pi-fw pi-external-link'
//             }
//         ]
//     },
//     {
//         label: 'Open PDF',
//         command: handleOpenPdf,
       
//     }

// ];


//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
            
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//               &nbsp;  <Card style={{width:"25%"}}>
//                 <h4>{video.fileName}</h4>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             <TieredMenu model={pdfMenuItems}  className="p-button-sm" />
//           )}
//         </div>
//       )}
// {/* 
//       <br /> */}

//       {/* <TieredMenu model={pdfMenuItems} style={{ backgroundColor: '#203570' }} className="p-button-sm" /> */}
//     </div>
//   );
// }

// export default VideoList;



// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { TieredMenu } from 'primereact/tieredmenu';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Button } from 'primereact/button';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showVideos, setShowVideos] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');
//   const [showMenu, setShowMenu] = useState(false); // New state variable

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleViewVideos = () => {
//     setLoading(true);
//     setShowVideos(true);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   const handleButtonClick = () => {
//     setShowMenu(!showMenu);
//   };

//   const pdfMenuItems = [
//     {
//       label: 'View Videos',
//       command: handleViewVideos,
//       items: [
//         {
//           label: 'New',
//           icon: 'pi pi-fw pi-plus',
//         },
//         {
//           label: 'Delete',
//           icon: 'pi pi-fw pi-trash',
//         },
//         {
//           separator: true,
//         },
//         {
//           label: 'Export',
//           icon: 'pi pi-fw pi-external-link',
//         },
//       ],
//     },
//     {
//       label: 'Open PDF',
//       command: handleOpenPdf,
//     },
//   ];

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//                 <h2>{video.fileName}</h2>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <div>
//               <Button
//                 label="Help"
//                 className="p-button-sm"
//                 onClick={handleButtonClick}
//               />
//               {showMenu && (
//                 <TieredMenu
//                   model={pdfMenuItems}
//                 //   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoList;





// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { TieredMenu } from 'primereact/tieredmenu';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Button } from 'primereact/button';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showVideos, setShowVideos] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');
//   const [showMenu, setShowMenu] = useState(false);

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

// //   const handleViewVideos = () => {
// //     setLoading(true);
// //     setShowVideos(true);
// //   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   const handleButtonClick = () => {
//     setShowMenu(!showMenu);
//   };

//   const pdfMenuItems = [
//     {
//       label: 'View Videos',
//       items: videos.map((video) => ({
//         label: video.fileName,
//         icon: 'pi pi-fw pi-video',
//         command: () => handleVideoClick(video),
//       })),
//     },
//     {
//       label: 'Open PDF',
//       command: handleOpenPdf,
//     },
//   ];

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//                 <h2>{video.fileName}</h2>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <div>
//               <Button
//                 label="Help"
//                 className="p-button-sm"
//                 onClick={handleButtonClick}
//               />
//               {showMenu && (
//                 <TieredMenu
//                   model={pdfMenuItems}
//                   className="p-button-sm"
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoList;




// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { TieredMenu } from 'primereact/tieredmenu';

// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Button } from 'primereact/button';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showVideos, setShowVideos] = useState(false);
//   const [loadingVideos, setLoadingVideos] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState('');
//   const [showMenu, setShowMenu] = useState(false);

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleViewVideos = () => {
//     setLoading(true);
//     setLoadingVideos(true); // Set loading state for videos
//     setShowVideos(true);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   const handleButtonClick = () => {
//     setLoadingVideos(true); // Set loading state for videos
//     setShowMenu(!showMenu);
//   };

//   const pdfMenuItems = [
//     {
//       label: 'View Videos',
//       items: videos.map((video) => ({
//         label: video.fileName,
//         icon: 'pi pi-fw pi-video',
//         command: () => handleVideoClick(video),
//       })),
//     },
//     {
//       label: 'Open PDF',
//       command: handleOpenPdf,
//     },
//   ];

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//                 <h2>{video.fileName}</h2>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <div>
//               <Button
//                 label="Help"
//                 className="p-button-sm"
//                 onClick={handleButtonClick}
//               />
//               {showMenu && (
//                 <TieredMenu
//                   model={pdfMenuItems}
//                   className="p-button-sm"
//                 >
//                   {loadingVideos && ( // Conditionally render the loader
//                     <div className="loader">
//                       <ProgressSpinner />
//                     </div>
//                   )}
//                 </TieredMenu>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoList;






// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { TieredMenu } from 'primereact/tieredmenu';

// import axios from 'axios';

// import { Button } from 'primereact/button';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   const [showVideos, setShowVideos] = useState(false);

//   const [pdfUrl, setPdfUrl] = useState('');


//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
    
//     } catch (error) {
//       console.error('Error fetching videos:', error);
  
//     }
//   };

//   const handleVideoClick = (video) => {
 
//     setSelectedVideo(video);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   const pdfMenuItems = [
//     {
//       label: 'View Videos',
//       items: videos.map((video) => ({
//         label: video.fileName,
//         icon: 'pi pi-fw pi-video',
//         command: () => handleVideoClick(video),
//       })),
//     },
//     {
//       label: 'Open PDF',
//       command: handleOpenPdf,
//     },
//   ];

//   return (
//     <div>
      

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//                 <h2>{video.fileName}</h2>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <div>
//               <TieredMenu
//                 model={pdfMenuItems}
//                 className="p-button-sm"
//               >
                
//               </TieredMenu>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoList;








// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { TieredMenu } from 'primereact/tieredmenu';
// // import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Button } from 'primereact/button';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showVideos, setShowVideos] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');
//   const [showMenu, setShowMenu] = useState(false);

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleViewVideos = async () => {
//     setLoading(true);
//     setShowVideos(true);
//     await fetchVideos();
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   const handleButtonClick = () => {
//     setShowMenu(!showMenu);
//   };

//   const pdfMenuItems = [
//     {
//       label: 'View Videos',
//       command: handleViewVideos,
//     },
//     {
//       label: 'Open PDF',
//       command: handleOpenPdf,
//     },
//   ];

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {showVideos ? (
//             videos.map((video) => (
//               <div key={video.fileName}>
//                 <h2>{video.fileName}</h2>
//                 <Button
//                   style={{ backgroundColor: '#203570' }}
//                   className="p-button-sm"
//                   onClick={() => handleVideoClick(video)}
//                 >
//                   Watch Video
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <div>
//               <Button
//                 label="Help"
//                 className="p-button-sm"
//                 onClick={handleButtonClick}
//               />
//               {showMenu && (
//                 <TieredMenu
//                   model={pdfMenuItems}
//                   className="p-button-sm"
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoList;









// import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import axios from 'axios';
// import { ProgressSpinner } from 'primereact/progressspinner';

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   useEffect(() => {
//     fetchVideos();

//     const getPdf = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_KEY}/help/images`, {
//           responseType: 'arraybuffer',
//         });

//         const blob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     getPdf();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_KEY}/help/api`);
//       const arrayBuffer = await response.arrayBuffer();

//       const zip = new JSZip();
//       const zipFile = await zip.loadAsync(arrayBuffer);

//       const fileNames = Object.keys(zipFile.files);

//       const videoFiles = fileNames.filter((fileName) =>
//         fileName.toLowerCase().endsWith('.mp4')
//       );

//       const videoURLs = await Promise.all(
//         videoFiles.map(async (fileName) => {
//           const file = zipFile.file(fileName);
//           const videoBlob = await file.async('blob');
//           const videoURL = URL.createObjectURL(videoBlob);
//           return { fileName, url: videoURL };
//         })
//       );

//       setVideos(videoURLs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const handleVideoClick = (video) => {
//     setLoading(false);
//     setSelectedVideo(video);
//   };

//   const handleBackToList = () => {
//     setSelectedVideo(null);
//   };

//   const handleOpenPdf = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   return (
//     <div>
//       {loading && (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       )}

//       {selectedVideo ? (
//         <div>
//           <h5>{selectedVideo.fileName}</h5>
//           <video style={{ width: '100%', height: '500px' }} controls>
//             <source src={selectedVideo.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleBackToList}>Back to List</button>
//         </div>
//       ) : (
//         <div>
//           {videos.map((video) => (
//             <div key={video.fileName}>
//               <h4>{video.fileName}</h4>
//               <Button
//                 style={{ backgroundColor: '#203570',borderRadius:"2px" }}
//                 className="p-button-sm"
//                 onClick={() => handleVideoClick(video)}
//               >
//                 Watch Video
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

//       <br />

//       <Button
//         style={{ backgroundColor: '#203570',borderRadius:"2px" }}
//         className="p-button-sm"
//         onClick={handleOpenPdf}
//       >
//         Open PDF
//       </Button>
//     </div>
//   );
// }

// export default VideoList;



// function Help(){
//   return(
//     <></>
//   )
// }

// const MyComponent = () => {
//   const docView = "This is a&nbsp;&bull;&nbsp;sample text.";

//   return (
//     <div>
//       <span dangerouslySetInnerHTML={{ __html: docView }} />
//     </div>
//   );
// };
// export default Help ;



