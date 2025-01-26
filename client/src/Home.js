import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import "./home.css";
import DropDownSelect from "./util/DropDownSelect";

const Home = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const proficiencies = ["Beginner", "Intermediate", "Advanced"];
  const languages = [
    "English - English",
    "Mandarin Chinese - 中文",
    "Hindi - हिंदी",
    "Spanish - Español",
    "French - Français",
    "Arabic - العربية",
    "Bengali - বাংলা",
    "Portuguese - Português",
    "Russian - Русский ",
    "Urdu - اردو",
    "Indonesian - Bahasa Indonesia",
    "German - Deutsch",
    "Japanese - 日本語 ",
    "Swahili - Kiswahili",
    "Marathi - मराठी ",
  ];

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
        <div className="dropdowns-container">
          <DropDownSelect
            selectionCategory="Proficiency"
            selections={proficiencies}
          ></DropDownSelect>
          <DropDownSelect
            selectionCategory="Language"
            selections={languages}
          ></DropDownSelect>
        </div>
        <Button className="searchButton" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Home;
