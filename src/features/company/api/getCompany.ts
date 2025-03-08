import { getJWT } from "@/helper";
import { Company } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getCompany = async (companyId: number): Promise<Company|null|never> => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/company/${companyId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
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

        throw new Error( `Failed fetch company. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const company: Company = await res.json();

    return company;
}
