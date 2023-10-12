import { firebaseStorage } from "@/config/firebase";
import { uploadBytesResumable } from "firebase/storage";
import React from "react";

const upLoadProgress = (file, subFolder, imageName, setProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(firebaseStorage, `${subFolder}/${imageName}`);
    const upload = uploadBytesResumable(storageRef, file);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 * 3.6
        );
        setProgress(progress);
      },
      (error) => {
        reject(error);
        console.log(error);
      },
      async () => {
        try {
          const urls = getDownloadURL(storageRef);
          resolve(urls);
        } catch (error) {
          reject(error);
          console.log("error", error);
        }
      }
    );
  });
};

export default upLoadProgress;
