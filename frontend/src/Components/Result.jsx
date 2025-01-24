import React from "react";
import { useLocation } from "react-router-dom";
import * as XLSX from 'xlsx'; // Import XLSX for Excel download

const Result = () => {
  const location = useLocation();
  const { processedImage, resultTable } = location.state; // Get data passed from Upload_popup

  // Extract the file name from the processed image path
  const fileName = processedImage ? processedImage.split('/').pop() : 'No file';

  // Function to download the result table as an Excel file
  const handleDownload = () => {
    // Parse the resultTable HTML into a plain text string
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(resultTable, 'text/html');
    const table = htmlDoc.querySelector('table');

    // Convert the table into an array format
    const rows = Array.from(table.querySelectorAll('tr')).map(tr =>
      Array.from(tr.querySelectorAll('th, td')).map(td => td.innerText)
    );

    // Create a workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Results");

    // Generate the Excel file
    XLSX.writeFile(wb, `${fileName.replace(/\.[^/.]+$/, "")}_detection_results.xlsx`);
  };

  return (
    <div className="fixed top-20 left-0 w-full h-full result_bg_overlay caret-transparent"> {/* Set fixed background */}
      <div className="pt-[35%] w-full h-full overflow-y-auto flex justify-center items-center text-white scrollbar-hide"> {/* Scrollable main container */}

        {/* Glassmorphism container for file name, image, and table */}
        <div className="w-[60%] bg-[rgba(255,255,255,0.1)] backdrop-filter backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-lg p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mt-20">

          {/* Display uploaded file name */}
          {fileName && (
            <div className="relative text-center bg-[rgba(255,255,255,0.1)] rounded-lg py-4 px-6 mb-8 border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
              {/* Glowing bar at the top-middle of the file name section */}
              <div className="z-10 absolute top-[-5px] left-1/2 transform -translate-x-1/2 w-[40%] h-[10px] bg-[#AC68FF] rounded-full shadow-[0_0_15px_5px_rgba(172,104,255,0.6)]"></div>

              <h2 className="text-2xl text-gray-300">File Name: {fileName}</h2>
            </div>
          )}

          {/* Display processed image */}
          {processedImage && (
            <div className="text-center mb-8 bg-[rgba(255,255,255,0.1)] rounded-lg p-6 border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
              <img
                src={`http://localhost:5000/static/${processedImage}`} // Adjust if needed for your backend URL
                alt="Processed"
                className="mx-auto max-w-full rounded-lg"
              />
            </div>
          )}

          {/* Display result table */}
          {resultTable && (
            <div className="relative mt-10 text-center bg-[rgba(255,255,255,0.1)] rounded-lg p-6 border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
              {/* Glowing bar at the top-middle of the result table section */}
              <div className="z-10 absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-[40%] h-[10px] bg-[#AC68FF] rounded-full shadow-[0_0_15px_5px_rgba(172,104,255,0.6)]"></div>

              <h2 className="text-2xl mb-4 text-gray-300">Detection Results Table</h2>

              {/* Center table and apply justify-around for columns */}
              <div className="flex justify-center">
                <div
                  className="table-container"
                  dangerouslySetInnerHTML={{ __html: resultTable }} // Display HTML from Flask
                />
              </div>
            </div>
          )}

          {/* Download button for result table */}
          {resultTable && (
            <div className="text-center mt-6">
              <button
                onClick={handleDownload}
                className="border-4 border-[#AC68FF] text-white font-medium py-2 px-8 text-xl rounded-lg hover:bg-[#AC68FF] hover:transition-colors mb-4 mt-4 hover:shadow-[0_0_15px_5px_rgba(172,104,255,0.6)]"
              >
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;

