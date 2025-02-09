"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store";
import { removeToast } from "@/store/modules/toast";

const Toast = () => {
    const dispatch = useDispatch();
    const { isDisp, message, status } = useSelector((state: RootState) => state.toast);

    useEffect(() => {
        let intervalId = undefined;

        if ( isDisp ) {
            intervalId = window.setInterval(() => {
                console.log('setInterval called.');
                dispatch( removeToast({}) );
            }, 3000); // 3秒後にトーストを削除
        }

        // 3秒後にtoastが非表示となった時にsetIntervalを解除
        return () => {
            console.log('clean up.');
            console.log('clearInterval called.');
            window.clearInterval(intervalId);
        };

    // トーストの表示・非表示の状態変化を捕捉
    }, [isDisp]);

    return (
        <>
            { isDisp && (
                <div className={ `${ status === "success" ? "bg-green-100" : "bg-red-100" }` }>
                    { message }
                </div>
            )}
        </>
    );
};

export default Toast;
