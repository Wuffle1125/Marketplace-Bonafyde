import React, { useEffect, useState } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";

const Blog = () => {
  return (
    <div>
      <CommonSection title={"Blog"} />
      <section>
        <div
          style={{
            fontSize: "30px",
            color: "white",
          }}
        >
          Blog
        </div>
      </section>
    </div>
  );
};

export default Blog;
