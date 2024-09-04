import React, { useEffect } from "react";

function CricketLive() {
  useEffect(() => {
    // Set the necessary global variables
    window.app = "www.cricwaves.com";
    window.mo = "ExtNotf";
    window.nt = "8";
    window.mats = "";
    window.tor = "";
    window.Width = "292px";
    window.Height = "170px";
    window.wi = "w";
    window.co = "ExtNotf";
    window.ad = "1";

    // Create the external script element
    const script = document.createElement("script");
    script.src = "//www.cricwaves.com/cricket/widgets/script/scoreWidgets.js";
    script.type = "text/javascript";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup: remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Placeholder for the cricket widget */}
      <div className="ws-block-body">
        {/* Inline script should be avoided */}
        <iframe
          src="//www.cricwaves.com/cricket/widgets/!/f1_kzd/peptechtime.com/1/flash/All/All/All/flash/w?dtab=&amp;hrInt12="
          width="302px"
          height="252px"
          scrolling="no"
          frameBorder="0"
          marginHeight="0"
          style={{ margin: '0', padding: '0' }}
          marginWidth="0"
        ></iframe>
      </div>
    </div>
  );
}

export default CricketLive;
