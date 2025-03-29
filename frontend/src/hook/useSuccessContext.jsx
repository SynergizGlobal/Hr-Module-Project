import { useContext } from "react";
import { SuccessContext } from "../context/SuccessContext";

export const useSuccessContext = () => {
    const context = useContext(SuccessContext);

    if (!context) {
        throw Error("useSuccessContext must be used inside the SuccessProvider");
    }

    return context;
};
