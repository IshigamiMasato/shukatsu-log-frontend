import LogoutButton from "@/components/LogoutButton";
import { getJWT } from "@/helper";
import Link from "next/link";

const User: React.FC = async () => {
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
        <div>
            <h1>ユーザ情報</h1>
            <p>名前： { user.name }</p>
            <p>メールアドレス： { user.email }</p>
            <LogoutButton />
            <Link href="/calender">カレンダー</Link>
        </div>
    );
}

export default User;
