import { NextRequest, NextResponse } from "next/server";
import getAuthStatus from "./server/utils/getAuthStatus";
import refreshToken from "./server/utils/refreshToken";

const unsignedPagePaths = ['/login'];

/**
 * middlewareで認証チェックを実施
 * 予期せぬエラーが発生した場合はサーバコンポーネント側でエラーハンドリング
 */
export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const status = await getAuthStatus();
    const isUnsignedPage = unsignedPagePaths.includes(pathname);

    if ( status === 'loggedIn' ) {
        // 認証済ユーザがログイン画面にアクセスした場合
        if ( pathname === '/login' ) {
            return NextResponse.redirect( new URL('/', request.url) );
        }

        return NextResponse.next();
    }

    if ( status === 'loggedOut' ) {
        // 未ログインユーザが要認証ページにアクセスした場合
        if ( ! isUnsignedPage ) {
            return NextResponse.redirect( new URL('/login', request.url) );
        }

        return NextResponse.next();
    }

    if ( status === "expiredToken" ) {
        // トークン有効期限切れで要認証ページにアクセスした場合
        if ( ! isUnsignedPage ) {
            try {
                const newAccessToken = await refreshToken();
                if ( newAccessToken ) {
                    const response = NextResponse.next();
                    response.cookies.set({ name: 'jwt', value: newAccessToken, httpOnly: true });
                    return response;
                }
            } catch ( error ) {
                console.error(error);
                return NextResponse.next();
            }
        }

        // トークン期限切れの状態でログイン画面に遷移した場合
        if ( pathname === '/login' ) {
            try {
                const newAccessToken = await refreshToken();
                if ( newAccessToken ) {
                    const response = NextResponse.redirect( new URL('/', request.url) );
                    response.cookies.set({ name: 'jwt', value: newAccessToken, httpOnly: true });
                    return response;
                }
            } catch ( error ) {
                console.error(error);
                return NextResponse.next();
            }
        }

        return NextResponse.next();
    }

    // 会員情報が見つからなかった場合
    if ( status === "notFound" ) {
        return NextResponse.rewrite( new URL('/not-found', request.url) );
    }

    return NextResponse.next();
}

export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
};
