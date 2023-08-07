import React, { useEffect, useState } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";

const About = () => {
  return (
    <div>
      <CommonSection title={"About"} />
      <section>
        <div
          style={{
            fontSize: "30px",
            color: "white",
          }}
        >
          About
        </div>
      </section>
    </div>
  );
};

export default About;
