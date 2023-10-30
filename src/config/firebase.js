import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAEIMjevWJJQM3E81h14QZx0YIssKwBXMo",
  authDomain: "ktbeauty-53a2b.firebaseapp.com",
  projectId: "ktbeauty-53a2b",
  storageBucket: "ktbeauty-53a2b.appspot.com",
  messagingSenderId: "304105739187",
  appId: "1:304105739187:web:d9d60ed12286bf07a8f1c6",
  measurementId: "G-B6RN0ETW4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const authFisebase = getAuth(app);
export const firebaseStore = getFirestore(app);
export const firebaseStorage = getStorage(app);
export const uploadImagesFirebase = (files, folder) => {
  let progressCurrent = "";
  let URLs = [];
  const promises = [];
  if (files?.length >= 1) {
    files.map((file) => {
      console.log("file", file);
      const storageRef = ref(firebaseStorage, `${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100 * 3.6
          );
          // setProcess(progress);
          progressCurrent = progress;
          return progressCurrent;
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            await getDownloadURL(uploadTask?.snapshot?.ref).then(
              (downloadURL) => {
                console.log("downloadURL", downloadURL);
                URLs = URLs.push(downloadURL);
                // setURLs((prevState) => [...prevState, downloadURL]);
                return downloadURL;
              }
            );
          } catch (error) {
            console.log("error", error);
          }
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        message.success("All images uploaded");
      })
      .catch((err) => console.log(files));
  } else {
    console.log("folder", folder);
    console.log("files", files);
    const storageRef = ref(firebaseStorage, `${folder}/${files?.name}`);
    return uploadBytes(storageRef, files).then(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          console.log("url", url);
          return (URLs = url);
        })
        .catch((error) => console.log("error", error));
    });
  }
  console.log("URLs", URLs);
};
