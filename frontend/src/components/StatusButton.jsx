export default function StatusButton ({ status, icon }) {
    const colorMap = { "Passed":"green", "Rejected":"red", "Ongoing":"orange", "Hold":"yellow" }

    return (
        <div className={`rounded-full h-5 bg-${colorMap.status}`}>
            <img src={icon} />
        </div>
    )
}