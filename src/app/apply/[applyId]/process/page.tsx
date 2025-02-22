import DocumentDeleteButton from "@/components/DocumentDeleteButton";
import { DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, FINAL_RESULT_STATUS, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
import { getJWT } from "@/helper";
import { Document, Exam, FinalResult, Interview, Offer } from "@/types";

const ProcessPage = async ({ params } : { params : Promise<{ applyId: string }> }) => {
    const applyId = (await params).applyId;

    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply/${applyId}/process`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch process. (status=${res.status})`);
    }

    const process = await res.json();

    return (
        <>
            {process.map((value : any) => {
                if ( value.type == DOCUMENT_SELECTION ) {
                    const document:Document = value;
                    return (
                        <div key={`document_${document.document_id}`} style={{ border: "1px solid #000", margin: "10px" }}>
                            <p>書類提出</p>
                            <p>書類提出日：{ document.submission_date }</p>
                            <p>メモ：{ document.memo }</p>
                            <p>作成日時：{ document.created_at }</p>
                            <p>更新日時：{ document.updated_at }</p>
                            <div>
                                {document.files.map(file => {
                                    return (
                                        <div key={`file_${file.file_id}`} style={{ border: "1px solid #000", margin: "10px" }}>
                                            <p>提出書類名：{ file.name }</p>
                                            <p>提出書類パス：{ file.path }</p>
                                            <p>作成日時：{ file.created_at }</p>
                                            <p>更新日時：{ file.updated_at }</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <DocumentDeleteButton applyId={Number(applyId)} documentId={Number(document.document_id)} />
                        </div>
                    )
                }

                if ( value.type == EXAM_SELECTION ) {
                    const exam:Exam = value;
                    return (
                        <div key={`exam_${exam.exam_id}`} style={{ border: "1px solid #000", margin: "10px" }}>
                            <p>試験情報</p>
                            <p>試験日：{ exam.exam_date }</p>
                            <p>試験内容：{ exam.content }</p>
                            <p>メモ：{ exam.memo }</p>
                            <p>作成日時：{ exam.created_at }</p>
                            <p>更新日時：{ exam.updated_at }</p>
                        </div>
                    )
                }

                if ( value.type == INTERVIEW_SELECTION ) {
                    const interview:Interview = value;
                    return (
                        <div key={`interview_${interview.interview_id}`} style={{ border: "1px solid #000", margin: "10px" }}>
                            <p>面接情報</p>
                            <p>面接日：{ interview.interview_date }</p>
                            <p>面接官情報：{ interview.interviewer_info }</p>
                            <p>メモ：{ interview.memo }</p>
                            <p>作成日時：{ interview.created_at }</p>
                            <p>更新日時：{ interview.updated_at }</p>
                        </div>
                    )
                }

                if ( value.type == OFFER ) {
                    const offer:Offer = value;
                    return (
                        <div key={`offer_${offer.offer_id}`} style={{ border: "1px solid #000", margin: "10px" }}>
                            <p>内定情報</p>
                            <p>内定通知日：{ offer.offer_date }</p>
                            <p>年収：{ offer.salary }</p>
                            <p>条件：{ offer.condition }</p>
                            <p>メモ：{ offer.memo }</p>
                            <p>作成日時：{ offer.created_at }</p>
                            <p>更新日時：{ offer.updated_at }</p>
                        </div>
                    )
                }

                if ( value.type == FINAL_RESULT ) {
                    const finalResult:FinalResult = value;
                    return (
                        <div key={`final_result_${finalResult.final_result_id}`} style={{ border: "1px solid #000", margin: "10px" }}>
                            <p>選考終了情報</p>
                            <p>ステータス：{ FINAL_RESULT_STATUS.find(status => status.id == finalResult.status)?.name }</p>
                            <p>メモ：{ finalResult.memo }</p>
                            <p>作成日時：{ finalResult.created_at }</p>
                            <p>更新日時：{ finalResult.updated_at }</p>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default ProcessPage;
