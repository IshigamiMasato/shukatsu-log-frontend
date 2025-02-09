"use client";

import useAuthInit from "@/hooks/useAuthInit";
import { RootState } from "@/store";
import { dispToast } from "@/store/modules/toast";
import { Company } from "@/types";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CompanyDetailPage = ({ params } : { params : Promise<{ companyId: string }> }) => {
    const { companyId } = use(params); // use()はawaitのように動作するため、use(params)の処理が完了するまでそれ以降の処理は実行されない

    /************ 認証 ************/
    useAuthInit(); // 状態を保持した状態でページ遷移後、再度認証をしているかチェック
    const { isAuthenticated, authStatusChecked } = useSelector( (state: RootState) => state.auth );
    /************ 認証 ************/

    useEffect(() => {
        console.log(`company_detail.tsx:authStatusChecked ${ authStatusChecked ? 'true' : 'false' }`)
        console.log(`company_detail.tsx:isAuthenticated ${ isAuthenticated ? 'true' : 'false' }`)

        if ( authStatusChecked ) {
            // 認証状態確認後、未認証だった場合はログイン画面へリダイレクト
            if ( ! isAuthenticated ) {
                redirect("/login");
            }

            const getCompany = async () => {
                const res = await fetch(`/api/company/${companyId}`, {method: 'GET'});

                if ( res.ok ) {
                    const data = await res.json();
                    setCompany(data);
                }
            }

            getCompany();
        }
    }, [authStatusChecked, isAuthenticated]);

    const [company, setCompany] = useState<Company|null>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleCompanyDelete = (companyId: number) => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            fetch(`/api/company/${companyId}`, {
                method: "DELETE",
            }).then(res => {
                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `企業の削除に失敗しました。もう一度お試しください。` }) );
                    return;
                }

                dispatch( dispToast({ status: "success", message: `企業を削除しました。` }) );
                router.push('/company');
            });
        }
    }

    return (
        <>
            { company === null
                ? ( ( <div>Loading...</div> ) )
                : (
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
                        <button onClick={ () => handleCompanyDelete(company.company_id) }>削除</button>
                        <Link href="/company">企業一覧へ</Link>
                    </div>
                )
            }
        </>
    );
}

export default CompanyDetailPage;
