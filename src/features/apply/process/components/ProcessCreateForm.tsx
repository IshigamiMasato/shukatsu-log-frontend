"use client";

import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import FormTitle from "@/components/forms/FormTitle";
import Label from "@/components/elements/Label";
import Select from "@/components/elements/Select";
import { APPLY_STATUS, DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER, UNREGISTERED_SELECTION_PROCESS } from "@/constants/const";
import DocumentCreateForm from "@/features/apply/document/components/DocumentCreateForm";
import ExamCreateForm from "@/features/apply/exam/components/ExamCreateForm";
import FinalResultCreateForm from "@/features/apply/final_result/components/FinalResultCreateForm";
import InterviewCreateForm from "@/features/apply/interview/components/InterviewCreateForm";
import OfferCreateForm from "@/features/apply/offer/components/OfferCreateForm";
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
                    {APPLY_STATUS.filter(status => status.id !== UNREGISTERED_SELECTION_PROCESS).map(status => {
                        return (
                            <option key={ status.id } value={ status.id }>
                                { status.name }
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
