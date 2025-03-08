import { getUser } from "@/features/user/api/getUser";

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
