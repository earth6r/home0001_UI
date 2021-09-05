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
    {!dismissed &&
      <>
        <div
          style={{ zIndex: "9999" }}
          className="w-full pointer-events-none fixed top-0 left-0 h-screen">
          {/* <div
            className={`${animate !== false ? "load-animation" : ""} 
            mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative}mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative`}>
              <LogoIcon />
          </div> */}
    
          <div
            className={`${animate !== false ? "load-animate-out" : ""} 
            w-full pointer-events-none absolute top-0 left-0 h-screen bg-black z-0`}>
          </div>
        </div>
        </>
       }
    </>
  );
};

export default LoadingScreen;
