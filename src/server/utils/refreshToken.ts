import getJWT from "./getJWT";

const refreshToken = async (): Promise<string|undefined> => {
    try {
        const jwt = await getJWT();
        const res = await fetch(`${process.env.API_URL}/api/token/refresh`, {
            method: "POST",
            headers: {
                "Content-Type"  : "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        });

        if ( res.ok ) {
            const { access_token: newAccessToken } = await res.json();
            return newAccessToken;
        }

    } catch ( error ) {
        console.error(error);
    }
}

export default refreshToken;
