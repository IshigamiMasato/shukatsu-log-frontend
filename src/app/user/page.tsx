import { getUser } from "@/features/user/api/getUser";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `会員情報 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const UserPage = async () => {
    await verifyAuth();
    const user = await getUser();

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
