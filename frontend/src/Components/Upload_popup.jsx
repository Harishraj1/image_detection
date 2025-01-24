import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cloud_img from '../Asserts/Vector.png'; // Existing icon
import bg_img from '../Asserts/bg_vector.png';  // Background image
import { useNavigate } from 'react-router-dom';

export default function Upload_popup() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(""); // State to store the selected file name
  const [selectedFile, setSelectedFile] = useState(null); // State to store the actual file
  const [isLoading, setIsLoading] = useState(false); // State for loading animation
  const [isVisible, setIsVisible] = useState(false); // State for zoom-in animation visibility

  // Trigger zoom-in animation when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/'); // Delay navigation to allow animation to finish
    }, 300); // Match the animation duration
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // Programmatically trigger file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Update the state with the selected file name
      setSelectedFile(file); // Set the selected file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setIsLoading(true); // Start loading spinner

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Send file to backend
      const response = await axios.post("http://localhost:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Navigate to the result page with response data
      setIsLoading(false); // Stop loading spinner
      navigate('/result', { state: { processedImage: response.data.all_processed_images[0], resultTable: response.data.result_table } });

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to process the image.");
      setIsLoading(false); // Stop loading spinner if there's an error
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center text-white relative caret-transparent"
      style={{
        backgroundImage: `url(${bg_img})`, // Add background image
        backgroundSize: 'cover', // Ensure the image covers the whole screen
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent the background from repeating
      }}
    >
      {/* Main Container with Glassmorphism */}
      <div
        className={`relative p-8 text-center w-2/5 transform transition-transform duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        style={{
          background: 'rgba(255, 255, 255, 0.1)', // Light translucent background
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Soft shadow
          backdropFilter: 'blur(20px)', // Background blur effect
          WebkitBackdropFilter: 'blur(20px)', // Safari support for backdrop-filter
          borderRadius: '10px', // Rounded corners
          border: '1px solid rgba(255, 255, 255, 0.18)', // Light border with transparency
          zIndex: 100, // Ensure the container is above the glowing bar
        }}
      >

        {/* Glowing Bar at the top-middle of the container */}
        <div className="absolute top-[-4px] left-1/2 transform -translate-x-1/2 w-[40%] h-[10px] bg-[#AC68FF] rounded-full shadow-[0_0_15px_5px_rgba(172,104,255,0.6)]"></div>

        {/* File Upload text at top-left border */}
        <h1 className="absolute top-[-2.5rem] left-4 text-xl font-bold text-white">
          File Upload
        </h1>

        {/* Close button with FontAwesome */}
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-4 right-4 cursor-pointer text-[#696565] hover:text-white text-2xl duration-200"
          onClick={handleClose}
        />

        {/* Cloud Image Centered */}
        <div className="mb-6 flex justify-center">
          <img src={cloud_img} alt="Cloud Icon" className="w-20 h-20" />
        </div>

        <p className="mb-2 text-[#696565]">Drag and Drop your file here</p>
        <p className="text-[#696565]">OR</p>

        {/* Larger Browse Button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="border-4 border-[#AC68FF] text-white font-medium py-2 px-8 text-xl rounded-lg hover:bg-[#AC68FF] hover:transition-colors mb-4 mt-4 hover:shadow-[0_0_15px_5px_rgba(172,104,255,0.6)]"
            onClick={handleBrowseClick}
          >
            Browse File
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the input field
          onChange={handleFileChange}
        />

        {fileName && !isLoading && (
          <>
            <p className="mt-2 mb-4 text-[#AC68FF]">Selected File: {fileName}</p>
            {/* Show Submit button only after file selection */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="mt-4 border-4 border-[#AC68FF] text-white font-medium py-2 px-8 text-xl rounded-lg hover:bg-[#AC68FF] hover:transition-colors hover:shadow-[0_0_15px_5px_rgba(172,104,255,0.6)]"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="flex justify-center items-center mt-6">
            <div className="w-12 h-12 border-4 border-[#AC68FF] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-[#AC68FF] ml-4">Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
}

