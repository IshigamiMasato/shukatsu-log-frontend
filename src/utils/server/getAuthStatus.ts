import getJWT from "./getJWT";

type AuthStatus =
    | "loggedIn"
    | "loggedOut"
    | "expiredToken"
    | "notFound"
    | "internalError";

/* JWTから認証状態を取得 */
const getAuthStatus = async (): Promise<AuthStatus> => {
    try {
        const jwt = await getJWT();
        const res = await fetch(`${process.env.API_URL}/api/user`, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` }
        });

        if ( ! res.ok ) {
            const data = await res.json();

            if ( res.status == 401 ) {
                if (data.code === "EXPIRED_TOKEN") return "expiredToken";
                return "loggedOut";
            }

            if ( res.status == 404 ) return "notFound";

            return "internalError";
        }

        return "loggedIn";

    } catch ( error ) {
        console.error(error);
        return "internalError";
    }
}

export default getAuthStatus;
