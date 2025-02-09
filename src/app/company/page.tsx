"use client";

import useAuthInit from "@/hooks/useAuthInit";
import { RootState } from "@/store";
import { Company } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CompanyPage: React.FC = () => {
    /************ 認証 ************/
    useAuthInit(); // 状態を保持した状態でページ遷移後、再度認証をしているかチェック
    const { isAuthenticated, user, authStatusChecked } = useSelector( (state: RootState) => state.auth );
    /************ 認証 ************/

    useEffect(() => {
        console.log(`company.tsx:authStatusChecked ${ authStatusChecked ? 'true' : 'false' }`)
        console.log(`company.tsx:isAuthenticated ${ isAuthenticated ? 'true' : 'false' }`)

        if ( authStatusChecked ) {
            // 認証状態確認後、未認証だった場合はログイン画面へリダイレクト
            if ( ! isAuthenticated ) {
                redirect("/login");
            }

            const getCompanies = async () => {
                const res = await fetch('/api/company', {method: 'GET'});

                if ( res.ok ) {
                    const data = await res.json();
                    setCompanies(data);
                }
            }

            getCompanies();
        }
    }, [authStatusChecked, isAuthenticated]);

    const [companies, setCompanies] = useState<Company[]>([]);

    return (
        <>
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
                    {companies.map(company => {
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
