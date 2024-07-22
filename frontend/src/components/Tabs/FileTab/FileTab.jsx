import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./FileTab.scss";
import Loader from "../../../pages/Loader/Loader";
import toast from "react-hot-toast";
import { useStore } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "../../../constant.js";

const FileTab = () => {
  const { finalResult, setFinalResult, setImageSet, imageSet,wallet } = useStore();
  const [fid, setfId] = useState();
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*, video/*, .gif", // Accept images, videos, and GIFs
    multiple: false, // Allow only one file to be uploaded
  });

  const getInfo = async (id) => {
    const res = await fetch(`${baseUrl}/unmask/${wallet}/${id}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const result = await res.json();
    console.log(result);
    return result;
  };

  async function uploadFile() {
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoader(true);
      const response = await fetch(`${baseUrl}/file/${wallet}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setfId(result.id);
      const info = await getInfo(result.id);

      if (info?.status == "pending" && info?.type == "video") {
        // toast.success("video");
        // handle video
        const getImages = async () => {
          const res = await fetch(`${baseUrl}/split_vid?fid=${result.id}`, {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          });
          const images = await res.json();
          console.log(images.snap);
          setResult(images.snap);
        };
        await getImages();
      } else if (info?.type == "image") {
        // handle image
        setFinalResult(info);
        navigate("/result");
      } else {
        toast.error("type not defined");
      }
      setLoader(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("can't upload the file");
    } finally {
      setLoader(false);
    }
    // Now you can handle uploading the file formData to your server
  }

  // for image from video

  const imageRedirect = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/unmask/${wallet}/${id}`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const result = await res.json();
      setFinalResult(result);
      navigate("/result");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("can't upload the file");
    }
  };

  return result?.length > 0 ? (
    <div className="popup">
      <div className="popup-window">
        <div className="img-container">
          {result?.map((item, index) => (
            <img
              key={index}
              src={`${baseUrl}/dwd/${item}`}
              alt="shot-img"
              className="img-shot"
              onClick={() => imageRedirect(item)}
            ></img>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="tab-content">
      {loader ? (
        <Loader />
      ) : (
        <div className="upload-container">
          <div className="preview-container">
            {file && (
              <div>
                {file.type.startsWith("image/") ? (
                  <img
                    className="preview"
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                  />
                ) : file.type.startsWith("video/") ? (
                  <video controls className="preview video-preview">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : file.type === "image/gif" ? (
                  <img
                    className="preview"
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                  />
                ) : (
                  <p>Unsupported file type</p>
                )}
              </div>
            )}
            {!file && (
              <div {...getRootProps()} className="upload-preview-grp">
                <input {...getInputProps()} />
                {/* Your upload SVG icon and text here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={66}
                  height={44}
                  fill="none"
                >
                  <path
                    fill="#7879F1"
                    d="M53.213 16.61C51.343 7.123 43.01 0 33 0c-7.948 0-14.85 4.51-18.287 11.11C6.434 11.99 0 19.003 0 27.5 0 36.603 7.398 44 16.5 44h35.75C59.84 44 66 37.84 66 30.25c0-7.26-5.638-13.145-12.788-13.64M52.25 38.5H16.5c-6.078 0-11-4.922-11-11 0-5.637 4.208-10.34 9.79-10.917l2.943-.303 1.375-2.613C22.22 8.636 27.335 5.5 33 5.5c7.205 0 13.42 5.115 14.822 12.183l.825 4.125 4.208.302c4.29.275 7.645 3.878 7.645 8.14 0 4.538-3.712 8.25-8.25 8.25M22 24.75h7.012V33h7.975v-8.25H44l-11-11z"
                  />
                </svg>

                <p>Drag & drop a file here</p>
              </div>
            )}
          </div>
          <div className="create-btn" onClick={uploadFile}>
            Upload
          </div>
        </div>
      )}
    </div>
  );
};

export default FileTab;
