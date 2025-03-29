export default function StageButton ({ icon, status, onClick, highlighted }) {
    const colorMap = {1: "bg-theme_passed", 2: "bg-theme_rejected", 3: "bg-theme_ongoing", 4:"bg-blue-400"}
    const highlightedBorder = "border-2 border-black"

    return (
        <button className={!highlighted ? `rounded-full mx-1 w-9 h-9 flex justify-center items-center ${colorMap[status.id]}` : `rounded-full mx-1 w-9 h-9 flex justify-center items-center ${colorMap[status.id]} ${highlightedBorder}`} onClick={onClick} >
            <img src={icon} className="w-5 h-5" />
        </button>
    )
}