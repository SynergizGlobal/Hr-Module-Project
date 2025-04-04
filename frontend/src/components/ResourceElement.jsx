import { useNavigate } from "react-router-dom"
import downloadIcon from "../assets/download.png"
import { useErrorContext } from "../hook/useErrorContext"
import { downloadFile } from "../utils/FileUtils"

export default function ResourceElement({ candidate, index }) {
    const navigate = useNavigate();
    const { errorDispatch } = useErrorContext();

    if (!candidate) {
        return <div className="text-red-500">Error: Candidate data is missing.</div>;
    }

    return (
        <div className="w-full flex justify-between items-center my-2">
            <div className="w-1/16">
                {index + 1}
            </div>

            <div
                className="w-2/16 text-left cursor-pointer"
                onClick={() => navigate(`/candidates/${candidate?.id}`)}
            >
                {candidate?.firstName + " " + candidate?.lastName}
            </div>

            <div className="w-2/16 text-center">
                {candidate?.category?.name || "N/A"}
            </div>

            <div className="w-2/16 text-center">
                {candidate?.phoneNo || "N/A"}
            </div>

            <div className="w-2/16 text-center">
                {candidate?.candidateStatus?.name || "N/A"}
            </div>

            <div className="w-4/16 text-center max-h-16 overflow-y-scroll hidden-scroll">
                {candidate?.remarks || "No remarks"}
            </div>

            <div className="w-2/16 text-center">
                {candidate?.ctcFinal || "N/A"}
            </div>

            <div className="w-1/16 flex justify-center items-center">
                {candidate?.resumeFilename ? (
                    <img
                        src={downloadIcon}
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => downloadFile(candidate.resumeFilename, candidate.id, errorDispatch)}
                    />
                ) : (
                    <span className="text-gray-400">No File</span>
                )}
            </div>
        </div>
    );
}
