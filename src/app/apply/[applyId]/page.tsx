import ApplyDeleteButton from "@/components/ApplyDeleteButton";
import { APPLY_STATUS } from "@/constants/const";
import { getJWT } from "@/helper";
import Link from "next/link";

const ApplyDetailPage = async ({ params } : { params : Promise<{ applyId: string }> }) => {
    const applyId = (await params).applyId;

    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply/${applyId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch apply. (status=${res.status})`);
    }

    const apply = await res.json();

    return (
        <div>
            <div>
                <h1>企業情報</h1>
                <p>企業名: { apply.company.name }</p>
                <p>企業URL: { apply.company.url }</p>
            </div>

            <div>
                <h1>応募情報</h1>
                <p>選考ステータス：{ APPLY_STATUS.find(status => status.id == apply.status)?.name }</p>
                <p>応募経路：{ apply.apply_route }</p>
                <p>メモ：{ apply.memo }</p>
            </div>

            <ApplyDeleteButton applyId={Number(applyId)}/>
            <Link href={`/apply/${applyId}/edit`}>編集</Link>
            <Link href="/apply">応募一覧へ</Link>
        </div>
    );
}

export default ApplyDetailPage;
