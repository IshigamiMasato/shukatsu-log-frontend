import { getJWT } from "@/helper";
import { Company } from "@/types";
import Link from "next/link";

const CompanyPage: React.FC = async () => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/company`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch companies. (status=${res.status})`);
    }

    const companies = await res.json();

    return (
        <>
            <Link href='/company/create'>企業登録</Link>
            <table>
                <thead>
                    <tr>
                        <th scope="col">企業ID</th>
                        <th scope="col">企業名</th>
                        <th scope="col">登録日時</th>
                        <th scope="col">更新日時</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company: Company) => {
                        return (
                            <tr key={ company.company_id }>
                                <td>{ company.company_id }</td>
                                <td>
                                    <Link href={`/company/${company.company_id}`}>{ company.name }</Link>
                                </td>
                                <td>{ company.created_at }</td>
                                <td>{ company.updated_at }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default CompanyPage;
