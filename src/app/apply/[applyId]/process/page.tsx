import DocumentDeleteButton from "@/features/document/components/DocumentDeleteButton";
import ExamDeleteButton from "@/features/exam/components/ExamDeleteButton";
import FinalResultDeleteButton from "@/features/final_result/components/FinalResultDeleteButton";
import InterviewDeleteButton from "@/features/interview/components/InterviewDeleteButton";
import OfferDeleteButton from "@/features/offer/components/OfferDeleteButton";
import { DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, FINAL_RESULT_STATUS, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
import { getJWT } from "@/helper";
import { Document, Exam, FinalResult, Interview, Offer } from "@/types";
import { faCheck, faFile, faFilePen, faHeart, faPenToSquare, faPeopleArrows, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProcessContainer from "@/components/containers/ProcessContainer";

const ProcessPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
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
        <div className="container mx-auto px-8 py-6">
            <Link href={`/apply/${applyId}/process/create`} className="bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block mb-3">選考履歴登録</Link>

            {process.map((value : any) => {
                if ( value.type == DOCUMENT_SELECTION ) {
                    const document:Document = value;
                    return (
                        <ProcessContainer key={`document_${document.document_id}`}>
                            <div className="mb-3">
                                <div className="flex space-x-1 mb-1">
                                    <div className="bg-blue-500 text-white w-6 h-6 text-center align-middle rounded-full">
                                        <FontAwesomeIcon icon={faFile} />
                                    </div>
                                    <h3 className="text-lg font-semibold">応募書類</h3>
                                </div>

                                <p className="text-sm text-gray-600">書類提出日：{ document.submission_date }</p>
                                <p className="text-sm text-gray-600">メモ：{ document.memo }</p>
                                <p className="text-sm text-gray-600">作成日時：{ document.created_at }</p>
                                <p className="text-sm text-gray-600">更新日時：{ document.updated_at }</p>
                            </div>

                            { document.files.length > 0 && (
                                <div className="mb-3 space-y-2">
                                    {document.files.map(file => {
                                        return (
                                            <div key={`file_${file.file_id}`} className="border p-3 rounded-md overflow-x-auto">
                                                <p className="text-sm text-gray-600">ファイル名：{ file.name }</p>
                                                <p className="text-sm text-gray-600">ファイルパス：{ file.path }</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            <div className="flex flex-wrap text-nowrap space-x-1">
                                <Link href={`/apply/${applyId}/document/${document.document_id}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                                    <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                </Link>
                                <DocumentDeleteButton applyId={applyId} documentId={document.document_id}>
                                    <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                </DocumentDeleteButton>
                            </div>
                        </ProcessContainer>
                    )
                }

                if ( value.type == EXAM_SELECTION ) {
                    const exam:Exam = value;
                    return (
                        <ProcessContainer key={`exam_${exam.exam_id}`}>
                            <div className="mb-3">
                                <div className="flex space-x-1 mb-1">
                                    <div className="bg-blue-500 text-white w-6 h-6 text-center align-middle rounded-full">
                                        <FontAwesomeIcon icon={faFilePen} />
                                    </div>
                                    <h3 className="text-lg font-semibold">試験情報</h3>
                                </div>

                                <p className="text-sm text-gray-600">試験日：{ exam.exam_date }</p>
                                <p className="text-sm text-gray-600">試験内容：{ exam.content }</p>
                                <p className="text-sm text-gray-600">メモ：{ exam.memo }</p>
                                <p className="text-sm text-gray-600">作成日時：{ exam.created_at }</p>
                                <p className="text-sm text-gray-600">更新日時：{ exam.updated_at }</p>
                            </div>

                            <div className="flex flex-wrap text-nowrap space-x-1">
                                <Link href={`/apply/${applyId}/exam/${exam.exam_id}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                                    <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                </Link>
                                <ExamDeleteButton applyId={applyId} examId={exam.exam_id}>
                                    <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                </ExamDeleteButton>
                            </div>
                        </ProcessContainer>
                    )
                }

                if ( value.type == INTERVIEW_SELECTION ) {
                    const interview:Interview = value;
                    return (
                        <ProcessContainer key={`interview_${interview.interview_id}`}>
                            <div className="mb-3">
                                <div className="flex space-x-1 mb-1">
                                    <div className="bg-blue-500 text-white w-6 h-6 text-center align-middle rounded-full">
                                        <FontAwesomeIcon icon={faPeopleArrows} />
                                    </div>
                                    <h3 className="text-lg font-semibold">面接情報</h3>
                                </div>

                                <p className="text-sm text-gray-600">面接日：{ interview.interview_date }</p>
                                <p className="text-sm text-gray-600">面接官情報：{ interview.interviewer_info }</p>
                                <p className="text-sm text-gray-600">メモ：{ interview.memo }</p>
                                <p className="text-sm text-gray-600">作成日時：{ interview.created_at }</p>
                                <p className="text-sm text-gray-600">更新日時：{ interview.updated_at }</p>
                            </div>

                            <div className="flex flex-wrap text-nowrap space-x-1">
                                <Link href={`/apply/${applyId}/interview/${interview.interview_id}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                                    <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                </Link>
                                <InterviewDeleteButton applyId={applyId} interviewId={interview.interview_id}>
                                    <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                </InterviewDeleteButton>
                            </div>
                        </ProcessContainer>
                    )
                }

                if ( value.type == OFFER ) {
                    const offer:Offer = value;
                    return (
                        <ProcessContainer key={`offer_${offer.offer_id}`}>
                            <div className="mb-3">
                                <div className="flex space-x-1 mb-1">
                                    <div className="bg-blue-500 text-white w-6 h-6 text-center align-middle rounded-full">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                    <h3 className="text-lg font-semibold">内定情報</h3>
                                </div>

                                <p className="text-sm text-gray-600">内定通知日：{ offer.offer_date }</p>
                                <p className="text-sm text-gray-600">年収：{ offer.salary }</p>
                                <p className="text-sm text-gray-600">条件：{ offer.condition }</p>
                                <p className="text-sm text-gray-600">作成日時：{ offer.created_at }</p>
                                <p className="text-sm text-gray-600">更新日時：{ offer.updated_at }</p>
                            </div>

                            <div className="flex flex-wrap text-nowrap space-x-1">
                                <Link href={`/apply/${applyId}/offer/${offer.offer_id}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                                    <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                </Link>

                                <OfferDeleteButton applyId={applyId} offerId={offer.offer_id}>
                                    <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                </OfferDeleteButton>
                            </div>
                        </ProcessContainer>
                    )
                }

                if ( value.type == FINAL_RESULT ) {
                    const finalResult:FinalResult = value;
                    return (
                        <ProcessContainer key={`final_result_${finalResult.final_result_id}`}>
                            <div className="mb-3">
                                <div className="flex space-x-1 mb-1">
                                    <div className="bg-blue-500 text-white w-6 h-6 text-center align-middle rounded-full">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                    <h3 className="text-lg font-semibold">選考終了情報</h3>
                                </div>

                                <p className="text-sm text-gray-600">ステータス：ステータス：{ FINAL_RESULT_STATUS.find(status => status.id == finalResult.status)?.name }</p>
                                <p className="text-sm text-gray-600">メモ：{ finalResult.memo }</p>
                                <p className="text-sm text-gray-600">作成日時：{ finalResult.created_at }</p>
                                <p className="text-sm text-gray-600">更新日時：{ finalResult.updated_at }</p>
                            </div>

                            <div className="flex flex-wrap text-nowrap space-x-1">
                                <Link href={`/apply/${applyId}/final_result/${finalResult.final_result_id}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                                    <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                </Link>
                                <FinalResultDeleteButton applyId={applyId} finalResultId={finalResult.final_result_id}>
                                    <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                </FinalResultDeleteButton>
                            </div>
                        </ProcessContainer>
                    )
                }
            })}
        </div>
    )
}

export default ProcessPage;
