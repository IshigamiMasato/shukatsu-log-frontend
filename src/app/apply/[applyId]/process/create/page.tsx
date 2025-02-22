"use client";

import DocumentForm from "@/components/DocumentForm";
import ExamForm from "@/components/ExamForm";
import InterviewForm from "@/components/InterviewForm";
import OfferForm from "@/components/OfferForm";
import { APPLY_STATUS, DOCUMENT_SELECTION, EXAM_SELECTION, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
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
            { status == EXAM_SELECTION  && <ExamForm applyId={applyId}/> }
            { status == INTERVIEW_SELECTION  && <InterviewForm applyId={applyId}/> }
            { status == OFFER  && <OfferForm applyId={applyId} /> }

            {status == 5  && (
                <div>選考終了</div>
            )}
        </>
    )
}

export default ProcessCreatePage;
