import DocumentDeleteButton from "@/features/apply/document/components/DocumentDeleteButton";
import ExamDeleteButton from "@/features/apply/exam/components/ExamDeleteButton";
import FinalResultDeleteButton from "@/features/apply/final_result/components/FinalResultDeleteButton";
import InterviewDeleteButton from "@/features/apply/interview/components/InterviewDeleteButton";
import OfferDeleteButton from "@/features/apply/offer/components/OfferDeleteButton";
import { DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, FINAL_RESULT_STATUS, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
import { Document, Exam, FinalResult, Interview, Offer } from "@/types";
import { faCheck, faCirclePlus, faFileLines, faFilePen, faHeart, faPenToSquare, faPeopleArrows, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProcessContainer from "@/components/containers/ProcessContainer";
import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import FileDownloadButton from "@/features/apply/document/file/components/FileDownloadButton";
import { getProcess } from "@/features/apply/api/process/getProcess";

const ProcessPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    const applyId = (await params).applyId;

    const process = await getProcess(applyId);

    // トークンリフレッシュが必要な場合
    if ( process === null ) return;

    return (
        <>
            <TitleContainer main="選考履歴一覧" />
            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <Link href={`/apply/${applyId}/process/create`}>
                    <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white mb-3">
                            <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">選考履歴登録</span>
                    </ActionContainer>
                </Link>

                {process.map((value : any) => {
                    if ( value.type == DOCUMENT_SELECTION ) {
                        const document:Document = value;
                        return (
                            <ProcessContainer key={`document_${document.document_id}`}>
                                <div className="mb-3">
                                    <div className="flex space-x-1 mb-1">
                                        <div className="text-gray-400 bg-gray-100 w-6 h-6 text-center align-middle rounded-full">
                                            <FontAwesomeIcon icon={faFileLines} />
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
                                                    <FileDownloadButton applyId={applyId} documentId={document.document_id} fileId={file.file_id}>
                                                        ファイルをダウンロード
                                                    </FileDownloadButton>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                <div className="flex flex-wrap text-nowrap space-x-1">
                                    <Link href={`/apply/${applyId}/document/${document.document_id}/edit`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                        </ActionContainer>
                                    </Link>
                                    <DocumentDeleteButton applyId={applyId} documentId={document.document_id}>
                                        <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                                <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                        </ActionContainer>
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
                                        <div className="text-gray-400 bg-gray-100 w-6 h-6 text-center align-middle rounded-full">
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
                                    <Link href={`/apply/${applyId}/exam/${exam.exam_id}/edit`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                        </ActionContainer>
                                    </Link>
                                    <ExamDeleteButton applyId={applyId} examId={exam.exam_id}>
                                        <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                                <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                        </ActionContainer>
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
                                        <div className="text-gray-400 bg-gray-100 w-6 h-6 text-center align-middle rounded-full">
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
                                    <Link href={`/apply/${applyId}/interview/${interview.interview_id}/edit`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                        </ActionContainer>
                                    </Link>
                                    <InterviewDeleteButton applyId={applyId} interviewId={interview.interview_id}>
                                        <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                            <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                        </ActionContainer>
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
                                        <div className="text-red-400 bg-gray-100 w-6 h-6 text-center align-middle rounded-full">
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
                                    <Link href={`/apply/${applyId}/offer/${offer.offer_id}/edit`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                        </ActionContainer>
                                    </Link>
                                    <OfferDeleteButton applyId={applyId} offerId={offer.offer_id}>
                                        <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                                <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                        </ActionContainer>
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
                                        <div className="text-gray-400 bg-gray-100 w-6 h-6 text-center align-middle rounded-full">
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
                                    <Link href={`/apply/${applyId}/final_result/${finalResult.final_result_id}/edit`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                                        </ActionContainer>
                                    </Link>
                                    <FinalResultDeleteButton applyId={applyId} finalResultId={finalResult.final_result_id}>
                                        <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                            <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                                        </ActionContainer>
                                    </FinalResultDeleteButton>
                                </div>
                            </ProcessContainer>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default ProcessPage;
