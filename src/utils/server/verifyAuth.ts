import { notFound, redirect } from "next/navigation";
import getAuthStatus from "./getAuthStatus";
import getJWT from "./getJWT";

const verifyAuth = async (): Promise<true|never> => {
    const jwt = await getJWT();
    if ( ! jwt ) redirect('/login');

    const status = await getAuthStatus();

    switch (status) {
        case 'loggedIn':
            return true;

        case 'loggedOut':
        case 'expiredToken':
            redirect('/login');

        case 'notFound':
            notFound();

        case 'internalError':
            throw new Error( 'Failed get auth status.' );

        default:
            throw new Error( 'Undifined auth status.' );
    }
}

export default verifyAuth;
