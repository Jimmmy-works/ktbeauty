import { v4 as uuidv4 } from "uuid";

async function convertUrlToFile(url, type) {
  if (typeof window === "undefined") return; // make sure we are in the browser
  const response = await fetch(url);
  console.log("response", response);
  const data = await response.blob();
  console.log("data", data);
  const metadata = {
    type: type || "image/jpg",
  };
  console.log("fileURLs", url?.replace?.(window.location.origin, ""));
  console.log(
    "new File([data], url, metadata)",
    new File([data], url, metadata)
  );
  const newFile = new File([data], `${url}-${uuidv4()}`, metadata);
  return newFile;
}
export default convertUrlToFile;
