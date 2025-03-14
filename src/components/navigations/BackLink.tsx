"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const BackLink = ({ className } : { className?: string }) => {
    const router = useRouter();

    return (
        <div className={`w-full sm:max-w-lg max-w-sm p-4 mx-auto ${className ? className : ''}`}>
            <button onClick={ () => router.back() } className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faChevronLeft} />
                <span className="ml-1">前の画面に戻る</span>
            </button>
        </div>
    )
}

export default BackLink;
