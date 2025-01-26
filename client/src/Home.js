import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import "./home.css";
import DropDownSelect from "./util/DropDownSelect";

const Home = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [thing, setThing] = useState("");
  const [numQeustions, setNumQuestions] = useState(1);
  const [proficiency, setProficiency] = useState("");
  const [language, setLanguage] = useState("");
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

  const handleSubmit = async () => {
    console.log("handling submit", youtubeLink);
    console.log(youtubeLink.split("=")[1]);
    const requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId: youtubeLink.split("=")[1],
      }),
    };
    const response = await fetch("http://localhost:8080/youtube", requestBody);
    const data = await response.text();
    console.log(data);
  };

  return (
    <div className="container">
      <div>{thing}</div>
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
            onSelect={setProficiency}
          ></DropDownSelect>
          <DropDownSelect
            selectionCategory="Language"
            selections={languages}
            onSelect={setLanguage}
          ></DropDownSelect>
          <input className="num-input"></input>
        </div>
        <Button className="searchButton" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Home;
