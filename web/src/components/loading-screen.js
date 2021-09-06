import React, {useState, useEffect}  from "react";
import LogoIcon from "./icon/logo";

const LoadingScreen = ({ animate }) => {
  const [dismissed, setDismissed] = useState(false)
  
  useEffect(() => {
    if (localStorage.getItem('dismissed')) {
      setDismissed(true)
    }
  }, [])


  return (
    <>
    {true &&
      <>
        <div
          style={{ zIndex: "9999" }}
          className="w-full pointer-events-none fixed top-0 left-0 h-screen">
          <div
            className={`${animate !== false ? "load-animate-out-logo" : ""} 
            mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative}mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative overflow-hidden`}>
              <LogoIcon />
          </div>
    
          <div
            className={`${animate !== false ? "load-animate-out-bg" : ""} 
            w-full pointer-events-none absolute top-0 left-0 h-screen bg-white z-1 overflow-hidden`}>
          </div>
        </div>
        </>
       }
    </>
  );
};

export default LoadingScreen;
