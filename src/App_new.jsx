import React, { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);

  // Load stored links
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("links")) || [];
    setLinks(saved);
  }, []);

  // Generate random short code
  const generateCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Shorten function
  const handleShorten = () => {
    if (!url.startsWith("http")) {
      alert("Enter a valid URL with http or https");
      return;
    }
    const code = generateCode();
    const shortLink = window.location.origin + "/" + code;

    const newLink = { code, url, shortLink };
    const updatedLinks = [...links, newLink];

    // Save to localStorage
    localStorage.setItem("links", JSON.stringify(updatedLinks));

    setLinks(updatedLinks);
    setShortUrl(shortLink);
    setUrl("");
  };

  return (
    <div style={{ 
      fontFamily: "Arial",
      backgroundColor: "white",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: "600px",
        width: "100%"
      }}>
        <h1>React URL Shortener</h1>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: "300px", padding: "8px", marginRight: "10px" }}
          />
          <button onClick={handleShorten} style={{ padding: "8px 16px" }}>
            Shorten
          </button>
        </div>

        {shortUrl && (
          <p style={{ marginBottom: "20px" }}>
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
        )}

        <h2>Saved Links</h2>
        <ul style={{ 
          listStyle: "none", 
          padding: 0,
          textAlign: "left",
          maxWidth: "500px",
          margin: "0 auto"
        }}>
          {links.map((l, i) => (
            <li key={i} style={{ 
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px"
            }}>
              <strong>{l.shortLink}</strong> → <a href={l.url} target="_blank">{l.url}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
