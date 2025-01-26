import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import "./home.css";
import DropDownSelect from "./util/DropDownSelect";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [proficiency, setProficiency] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    console.log(youtubeLink.split("=")[1]);

    console.log(proficiency);
    console.log(language);
    console.log(numQuestions);

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId: youtubeLink.split("=")[1],
        proficiency,
        numQuestions,
        language,
      }),
      redirect: "follow",
    };
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:8080/youtube",
      requestOptions
    );
    const questions = await response.json();
    console.log(questions);
    setIsLoading(false);
    navigate("/player", { state: { questions, youtubeLink } });
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">-MumboJumbo.</h1>
        {!isLoading ? (
          <>
            <input
              className="textfield"
              type="text"
              placeholder="Enter youtube url"
              onChange={(event) => setYoutubeLink(event.target.value)}
            ></input>
            <div className="dropdowns-container">
              <DropDownSelect
                selectionCategory="Language"
                selections={languages}
                onSelect={setLanguage}
              ></DropDownSelect>
              <DropDownSelect
                selectionCategory="Proficiency"
                selections={proficiencies}
                onSelect={setProficiency}
              ></DropDownSelect>
            </div>
            <div>
              <input
                className="num-input"
                placeholder="Enter number of questions"
                onChange={(event) => setNumQuestions(event.target.value)}
              ></input>
            </div>
            <Button className="searchButton" onClick={handleSubmit}>
              Search
            </Button>
          </>
        ) : (
          <svg
            className="loading-bar"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
          >
            <radialGradient
              id="a11"
              cx=".66"
              fx=".66"
              cy=".3125"
              fy=".3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stop-color="#FFFFFF"></stop>
              <stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop>
              <stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop>
              <stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop>
              <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop>
            </radialGradient>
            <circle
              transform-origin="center"
              fill="none"
              stroke="url(#a11)"
              stroke-width="15"
              stroke-linecap="round"
              stroke-dasharray="200 1000"
              stroke-dashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle
              transform-origin="center"
              fill="none"
              opacity=".2"
              stroke="#FFFFFF"
              stroke-width="15"
              stroke-linecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        )}
      </div>
    </div>
  );
};

export default Home;
