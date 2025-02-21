"use client";

import DocumentForm from "@/components/DocumentForm";
import { APPLY_STATUS, DOCUMENT_SELECTION } from "@/constants/const";
import { use, useState } from "react";

const ProcessCreatePage = ({ params } : { params : Promise<{ applyId: number }> }) => {
    const { applyId } = use(params); // use()はawaitのように動作するため、use(params)の処理が完了するまでそれ以降の処理は実行されない
    const [status, setStatus] = useState<number>();

    return (
        <>
            <div>
                <label>ステータス</label>
                <select
                    name="status"
                    value={ status }
                    onChange={ (e) => setStatus( Number(e.target.value) ) }
                >
                    <option value="">選択してください</option>
                    {APPLY_STATUS.map(apply => {
                        return (
                            <option key={ apply.id } value={ apply.id }>
                                { apply.name }
                            </option>
                        )
                    })}
                </select>
            </div>

            { status == DOCUMENT_SELECTION  && <DocumentForm applyId={applyId}/> }

            {status == 2  && (
                <div>筆記試験選考中</div>
            )}

            {status == 3  && (
                <div>面接選考中</div>
            )}

            {status == 4  && (
                <div>内定</div>
            )}

            {status == 5  && (
                <div>選考終了</div>
            )}
        </>
    )
}

export default ProcessCreatePage;
