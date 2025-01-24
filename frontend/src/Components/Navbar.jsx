import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const MovetoLanding = () => {
        navigate("/"); // Navigate to Upload_popup
      };

    return (
        <div className="z-50 flex h-20 justify-between items-center px-20 text-white bg-white/0 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[20px] backdrop-filter fixed w-full top-0 left-0 caret-transparent">
            <div>
                <button onClick={MovetoLanding} className="bg-[#AC68FF] text-lg font-normal px-8 py-1 rounded-3xl border-0 cursor-pointer hover:bg-[#AC68FF] hover:text-white hover:shadow-[0_0_15px_5px_rgba(172,104,255,0.6)] transition-shadow">
                    Logo
                </button>
            </div>
            <div className="flex gap-14 p-4">
                {/* Links with glowing border-bottom effect */}
                <p className="cursor-pointer relative transition-all duration-300 hover:text-[#AC68FF]  after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px] after:bg-[#AC68FF] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:shadow-[0_0_10px_2px_rgba(172,104,255,0.6)]">
                    Home
                </p>
                <p className="cursor-pointer relative transition-all duration-300 hover:text-[#AC68FF] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px] after:bg-[#AC68FF] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:shadow-[0_0_10px_2px_rgba(172,104,255,0.6)]">
                    About Us
                </p>
                <p className="cursor-pointer relative transition-all duration-300 hover:text-[#AC68FF] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px] after:bg-[#AC68FF] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:shadow-[0_0_10px_2px_rgba(172,104,255,0.6)]">
                    Contact Us
                </p>

                <p className="bg-[#AC68FF] text-lg font-normal px-6 py-1 rounded-3xl border-0 cursor-pointer hover:bg-[#AC68FF] hover:text-white hover:shadow-[0_0_15px_5px_rgba(172,104,255,0.6)] transition-shadow">
                    Profile
                </p>
            </div>
        </div>
    );
}
