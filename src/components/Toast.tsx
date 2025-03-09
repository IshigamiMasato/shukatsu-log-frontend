"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store";
import { removeToast } from "@/store/modules/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Toast = () => {
    const dispatch = useDispatch();
    const { isDisp, message, status } = useSelector((state: RootState) => state.toast);

    useEffect(() => {
        let intervalId = undefined;

        if ( isDisp ) {
            intervalId = window.setInterval(() => {
                console.log('setInterval called.');
                dispatch( removeToast({}) );
            }, 5000); // 5秒後にトーストを削除
        }

        // 5秒後にtoastが非表示となった時にsetIntervalを解除
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
                <div className={ `fixed flex items-center divide-x rtl:divide-x-reverse bottom-5 right-5 w-full max-w-sm sm:max-w-lg mx-auto p-2 rounded-lg shadow-md mb-3 ${ status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700" }` }>
                    { status === "success"
                        ? <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 bg-green-100 rounded-lg p-2 m-2" />
                        : <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 bg-red-100 rounded-lg p-2 m-2" />
                    }
                    { message }
                </div>
            )}
        </>
    );
};

export default Toast;
