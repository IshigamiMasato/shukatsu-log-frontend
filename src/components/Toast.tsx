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
                dispatch( removeToast() );
            }, 5000); // 5秒後にトーストを削除
        }

        // 5秒後にtoastが非表示となった時にsetIntervalを解除
        return () => {
            console.log('clean up.');
            console.log('clearInterval called.');
            window.clearInterval(intervalId);
        };

    // トーストの表示・非表示の状態変化を捕捉
    }, [isDisp, dispatch]);

    return (
        <>
            { isDisp && (
                <div className={ `fixed flex items-center divide-x rtl:divide-x-reverse bottom-5 right-1 mx-auto p-2 rounded-lg shadow-md mb-3 z-50 ${ status === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white" }` }>
                    { status === "success"
                        ? <FontAwesomeIcon icon={faCircleCheck} className="text-white bg-green-600 rounded-lg m-2" />
                        : <FontAwesomeIcon icon={faCircleXmark} className="text-white bg-red-600 rounded-lg m-2" />
                    }
                    { message }
                </div>
            )}
        </>
    );
};

export default Toast;
