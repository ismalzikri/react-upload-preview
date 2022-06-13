import { useState, useRef } from "react";

export default function FilePreviewer() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const filePicekerRef = useRef<HTMLInputElement>(null);

  const previewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = (readerEvent) => {
        if (selectedFile.type.includes("image")) {
          const res = readerEvent.target?.result;
          if (typeof res === "string" || res === null) {
            setImagePreview(res);
          }
        } else if (selectedFile.type.includes("video")) {
          const res = readerEvent.target?.result;
          if (typeof res === "string" || res === null) {
            setVideoPreview(res);
          }
        }
      };
    }
  };

  const clearFiles = () => {
    setImagePreview(null);
    setVideoPreview(null);
  };

  const handleChoose = () => {
    if (filePicekerRef.current !== null) {
      filePicekerRef.current.click();
    }
  };

  return (
    <div>
      <h2>React upload with Preview images</h2>
      <div className="btn-container">
        <input
          ref={filePicekerRef}
          type="file"
          accept="image/*, video/*"
          onChange={previewFile}
          hidden
        />
        <button className="btn" onClick={handleChoose}>
          Choose
        </button>
        {(imagePreview || videoPreview) && (
          <button className="btn" onClick={clearFiles}>
            x
          </button>
        )}
      </div>
      <div className="preview">
        <figure>
          {imagePreview != null && <img src={imagePreview} alt="" />}
          {videoPreview != null && <video controls src={videoPreview}></video>}
        </figure>
      </div>
    </div>
  );
}
