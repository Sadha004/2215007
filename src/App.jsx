import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("links")) || [];
    setLinks(saved);
  }, []);

  const generateCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleShorten = () => {
    if (!url.startsWith("http")) {
      alert("Enter a valid URL with http or https");
      return;
    }
    const code = generateCode();
    const shortLink = window.location.origin + "/" + code;

    const newLink = { code, url, shortLink };
    const updatedLinks = [...links, newLink];

    localStorage.setItem("links", JSON.stringify(updatedLinks));

    setLinks(updatedLinks);
    setShortUrl(shortLink);
    setUrl("");
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🔗 URL Shortener</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleShorten}>Shorten</button>
        </div>

        {shortUrl && (
          <div className="result">
            <p>Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        )}

        <h2>📌 Saved Links</h2>
        <ul>
          {links.map((l, i) => (
            <li key={i}>
              <a href={l.shortLink} target="_blank" rel="noreferrer">
                {l.shortLink}
              </a>{" "}
              →{" "}
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
