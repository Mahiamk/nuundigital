import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadMedia, saveContent } from "./api";

const CMS = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleTextChange = (value) => setText(value);
  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setMedia(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    let mediaUrl = "";
    if (media) {
      const uploadResponse = await uploadMedia(media, token);
      mediaUrl = uploadResponse.mediaUrl;
    }

    const response = await saveContent(text, mediaUrl, token);
    alert(response.message);
  };

  return (
    <div>
      <h1>Admin CMS</h1>
      <form onSubmit={handleSubmit}>
        <ReactQuill value={text} onChange={handleTextChange} />
        <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
        {preview && <img src={preview} alt="Preview" />}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CMS;
