import { APPLY_STATUS } from "@/constants/const";
import { getJWT } from "@/helper";
import { Apply } from "@/types";
import Link from "next/link";

const ApplyPage = async () => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch applies. (status=${res.status})`);
    }

    const applies = await res.json();

    return (
        <>
            <Link href='/apply/create'>応募登録</Link>
            <table>
                <thead>
                    <tr>
                        <th scope="col">応募ID</th>
                        <th scope="col">企業名</th>
                        <th scope="col">職種</th>
                        <th scope="col">選考ステータス</th>
                        <th scope="col">応募経路</th>
                        <th scope="col">登録日時</th>
                        <th scope="col">更新日時</th>
                    </tr>
                </thead>
                <tbody>
                    {applies.map((apply: Apply) => {
                        return (
                            <tr key={ apply.apply_id }>
                                <td>
                                    <Link href={`/apply/${apply.apply_id}`}>{ apply.apply_id }</Link>
                                </td>
                                <td>
                                    <Link href={`/company/${apply.company_id}`}>{ apply.company.name }</Link>
                                </td>
                                <td>{ apply.occupation }</td>
                                <td>{ APPLY_STATUS.find(status => status.id == apply.status)?.name }</td>
                                <td>{ apply.apply_route }</td>
                                <td>{ apply.created_at }</td>
                                <td>{ apply.updated_at }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ApplyPage;
