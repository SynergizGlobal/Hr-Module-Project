import axios from "axios";
import { useErrorContext } from "../hook/useErrorContext";

export const downloadFile = (resumeFilename, candidateId, errorDispatch) => {
  if (!resumeFilename) {
    errorDispatch({ type: "ERROR", payload: "No resume uploaded" });
    return;
  }

  // Encode both candidateId and resumeFilename to ensure special characters don't break the URL
  const encodedFilename = encodeURIComponent(resumeFilename);
  const encodedCandidateId = encodeURIComponent(candidateId.toString());

  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}resume/download/${encodedCandidateId + encodedFilename}`, {
      withCredentials: true,
      responseType: "blob",
    })
    .then((response) => {
      if (response.data) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: response.headers["content-type"] })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", resumeFilename);
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        errorDispatch({ type: "ERROR", payload: "Failed to download resume" });
      }
    })
    .catch(() => {
      errorDispatch({ type: "ERROR", payload: "Failed to download resume" });
    });
};
