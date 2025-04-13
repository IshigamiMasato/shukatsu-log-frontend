"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const LoadingOverlay = () => {
    const { isDisp } = useSelector((state: RootState) => state.loading);

    return (
        <>
            { isDisp && (
                <div className="fixed inset-0 bg-white bg-opacity-50 z-50 pointer-events-auto">
                    <Loading />
                </div>
            )}
        </>
    );
}

export default LoadingOverlay;
