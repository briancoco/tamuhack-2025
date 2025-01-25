import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import "./home.css";

const Home = () => {
  const [youtubeLink, setYoutubeLink] = useState("");

  const handleSubmit = () => {
    console.log("handling submit", youtubeLink);
    // route to other page
    // send youtube link data
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">-MumboJumbo.</h1>
        <input
          className="textfield"
          type="text"
          placeholder="Enter youtube url"
          onChange={(event) => setYoutubeLink(event.target.value)}
        ></input>
        <Button className="searchButton" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Home;
