import { getJWT } from "@/helper";

const UserPage: React.FC = async () => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/user`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch user. (status=${res.status})`);
    }

    const user = await res.json();

    return (
        <section className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm mx-auto">
            <h2 className="text-xl font-medium mb-4">会員情報</h2>
            <dl className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                    <dt className="font-medium">名前</dt>
                    <dd>{ user.name }</dd>
                </div>
                <div className="flex justify-between border-b pb-1">
                    <dt className="font-medium">メールアドレス</dt>
                    <dd>{ user.email }</dd>
                </div>
            </dl>
        </section>
    );
}

export default UserPage;
