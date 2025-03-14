import Button from "@/components/elements/Button";
import Link from "next/link";

const NotFound = () =>  {
    return (
        <div className="w-full sm:max-w-lg max-w-sm p-16 bg-white mx-auto rounded-lg border">
            <h2 className="text-3xl font-bold mb-3">404 Not Found</h2>
            <p className="text-sm">ご指定のページが存在しませんでした。</p>
            <p className="text-sm">URLに問題があるか、ページが削除された可能性があります。</p>
            <Link href='/'>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">
                    トップページへ戻る
                </Button>
            </Link>
        </div>
    )
}

export default NotFound;
