import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./FileTab.scss";
import Loader from "../../../pages/Loader/Loader";
import toast from "react-hot-toast";
import { useStore } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

import {baseUrl} from '../../../constant.js'

const FileTab = () => {
  const { finalResult, setFinalResult, setImageSet, imageSet } = useStore();
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
    const res = await fetch(`${baseUrl}/unmask?fid=${id}`, {
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
      const response = await fetch(`${baseUrl}/file/upload`, {
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
      const res = await fetch(`${baseUrl}/unmask?fid=${id}`, {
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
              onClick={()=>imageRedirect(item)}
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
                  width={64}
                  height={65}
                  fill="none"
                >
                  <path
                    fill="#007AFF"
                    d="M51.6 27.273c-1.813-9.2-9.893-16.106-19.6-16.106-7.707 0-14.4 4.373-17.733 10.773C6.24 22.793 0 29.593 0 37.833c0 8.827 7.173 16 16 16h34.667C58.027 53.833 64 47.86 64 40.5c0-7.04-5.467-12.747-12.4-13.227m-14.267 7.894v10.666H26.667V35.167h-8l12.4-12.4a1.32 1.32 0 0 1 1.893 0l12.373 12.4z"
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
