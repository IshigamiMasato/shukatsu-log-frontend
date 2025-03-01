"use client";

import FormItem from "@/components/containers/FormItem";
import Label from "@/components/elements/Label";
import Select from "@/components/elements/Select";
import ExamForm from "@/features/exam/components/ExamForm";
import FinalResultForm from "@/features/final_result/components/FinalResultForm";
import InterviewForm from "@/features/interview/components/InterviewForm";
import OfferForm from "@/features/offer/components/OfferForm";
import { APPLY_STATUS, DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
import DocumentForm from "@/features/document/components/DocumentForm";
import { use, useState } from "react";

const ProcessCreatePage = ({ params } : { params : Promise<{ applyId: number }> }) => {
    const { applyId } = use(params); // use()はawaitのように動作するため、use(params)の処理が完了するまでそれ以降の処理は実行されない
    const [status, setStatus] = useState<number>();

    return (
        <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto">
            <h2 className="text-lg font-semibold mb-5">選考履歴登録フォーム</h2>
            <FormItem>
                <Label label="ステータス" />
                <Select
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
                </Select>
            </FormItem>

            { status == DOCUMENT_SELECTION  && <DocumentForm applyId={applyId}/> }
            { status == EXAM_SELECTION  && <ExamForm applyId={applyId}/> }
            { status == INTERVIEW_SELECTION  && <InterviewForm applyId={applyId}/> }
            { status == OFFER  && <OfferForm applyId={applyId} /> }
            { status == FINAL_RESULT && <FinalResultForm applyId={applyId} /> }
        </div>
    )
}

export default ProcessCreatePage;
