import { getJWT } from "@/helper";
import { User } from "@/types";
import { notFound, redirect } from "next/navigation";

const getUser = async (): Promise<User|null|never> => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) {
            // トークン有効期限切れはフロントのクライアントコンポーネント側でリフレッシュ処理を実施し、再チャレンジするため特にエラーは返さずNULL返却
            if ( data.code === "EXPIRED_TOKEN" ) {
                return null;
            }

            redirect('/login');
        }

        if ( res.status == 404 ) {
            notFound();
        }

        throw new Error( `Failed fetch user. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const user: User = await res.json();

    return user;
}

const UserPage = async () => {
    const user = await getUser();

    // トークンリフレッシュが必要な場合
    if ( user === null ) return;

    return (
        <section className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm mx-auto">
            <dl className="space-y-2">
                <div className="flex justify-between pb-1">
                    <dt className="font-medium">名前</dt>
                    <dd>{ user.name }</dd>
                </div>
                <div className="flex justify-between pb-1">
                    <dt className="font-medium">メールアドレス</dt>
                    <dd>{ user.email }</dd>
                </div>
            </dl>
        </section>
    );
}

export default UserPage;
