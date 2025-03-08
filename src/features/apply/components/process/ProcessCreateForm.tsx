"use client";

import FormContainer from "@/components/containers/FormContainer";
import FormItem from "@/components/containers/FormItem";
import FormTitle from "@/components/containers/FormTitle";
import Label from "@/components/elements/Label";
import Select from "@/components/elements/Select";
import { APPLY_STATUS, DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
import DocumentCreateForm from "@/features/apply/document/components/DocumentCreateForm";
import ExamCreateForm from "@/features/exam/components/ExamCreateForm";
import FinalResultCreateForm from "@/features/final_result/components/FinalResultCreateForm";
import InterviewCreateForm from "@/features/interview/components/InterviewCreateForm";
import OfferCreateForm from "@/features/offer/components/OfferCreateForm";
import { useState } from "react";

const ProcessCreateForm = ({ applyId } : { applyId : number }) => {
    const [status, setStatus] = useState<number>();

    return (
        <FormContainer>
            <FormTitle>選考履歴登録フォーム</FormTitle>
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

            { status == DOCUMENT_SELECTION  && <DocumentCreateForm applyId={applyId}/> }
            { status == EXAM_SELECTION  && <ExamCreateForm applyId={applyId}/> }
            { status == INTERVIEW_SELECTION  && <InterviewCreateForm applyId={applyId}/> }
            { status == OFFER  && <OfferCreateForm applyId={applyId} /> }
            { status == FINAL_RESULT && <FinalResultCreateForm applyId={applyId} /> }
        </FormContainer>
    )
}

export default ProcessCreateForm;
