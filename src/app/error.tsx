"use client";

import Button from "@/components/elements/Button";
import { useEffect } from "react";

const Error = ({ error, reset } : { error: Error & { digest?: string }, reset: () => void }) =>  {
    useEffect(() => {
        console.error(error)

      }, [error])

      return (
        <div className="w-full sm:max-w-lg max-w-sm p-16 bg-white mx-auto rounded-lg border">
            <h2 className="text-3xl font-bold mb-3">500 Internal Server Error</h2>
            <p className="text-sm">サーバ側で問題が発生したため、画面が表示できません。</p>
            <p className="text-sm">時間をおいて再度お試しください。</p>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3" onClick={() => reset()} >
                再読み込み
            </Button>
        </div>
    );
}

export default Error;
