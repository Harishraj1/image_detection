import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import frame_img from '../Asserts/Frame.png';
import './Landing.css';  // Assuming we'll add the CSS in a separate file

const Landing = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Trigger the animation once when the component loads
    setShowText(true);
  }, []);

  const handleGetStarted = () => {
    navigate("/upload"); // Navigate to Upload_popup
  };

  return (
    <div className="h-screen pt-32 flex flex-col justify-center items-center text-center text-white bg-overlay caret-transparent">
      <h1 className="text-7xl font-semibold">
        {showText && (
          <span className="typewriter">
            OBJECT <span className="text-[#AC68FF] flipping-text">DETECTION</span> IN IMAGES
          </span>
        )}
      </h1>
      <p className="text-3xl mt-6">
        Upload A Room image And Identify All Object Instantly!
      </p>
      <button
        onClick={handleGetStarted}
        className="mt-8 text-2xl border-4 border-[#AC68FF] text-white py-2 px-6 rounded-2xl hover:bg-[#AC68FF] hover:transition-colors hover:shadow-[0_0_15px_5px_rgba(172,104,255,0.6)]"
      >
        Get Started <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {/* Frame image container */}
      <div className="frame-container w-[25%]">
        <img src={frame_img} alt="frame_img" className="bouncing-zoom" />
      </div>
    </div>
  );
};

export default Landing;

