import CompanyDeleteButton from "@/components/CompanyDeleteButton";
import { getJWT } from "@/helper";
import Link from "next/link";

const CompanyDetailPage = async ({ params } : { params : Promise<{ companyId: string }> }) => {
    const companyId = (await params).companyId;

    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/company/${companyId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch company. (status=${res.status})`);
    }

    const company = await res.json();

    return (
        <div>
            <h1>企業情報</h1>
            <p>企業名: { company.name }</p>
            <p>企業URL: { company.url }</p>
            <p>社長: { company.president }</p>
            <p>住所: { company.address }</p>
            <p>設立年月日: { company.establish_date }</p>
            <p>従業員数: { company.employee_number }</p>
            <p>上場区分: { company.listing_class }</p>
            <p>福利厚生: { company.benefit }</p>
            <p>備考: { company.memo }</p>
            <CompanyDeleteButton companyId={Number(companyId)}/>
            <Link href="/company">企業一覧へ</Link>
        </div>
    );
}

export default CompanyDetailPage;
