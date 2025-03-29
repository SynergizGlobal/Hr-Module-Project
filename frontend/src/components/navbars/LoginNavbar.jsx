import SyntrackLogo from "../../assets/syntrack.png"

export default function LoginNavbar ()
{
    return (
        <div className="flex w-full justify-center items-center bg-primary h-14">
            <div className="flex justify-start items-center w-2/3">
                <img src={SyntrackLogo}></img>
            </div>
        </div>
    )
}