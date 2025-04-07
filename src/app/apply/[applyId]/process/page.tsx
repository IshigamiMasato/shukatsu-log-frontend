import DocumentDeleteButton from "@/features/apply/document/components/DocumentDeleteButton";
import ExamDeleteButton from "@/features/apply/exam/components/ExamDeleteButton";
import FinalResultDeleteButton from "@/features/apply/final_result/components/FinalResultDeleteButton";
import InterviewDeleteButton from "@/features/apply/interview/components/InterviewDeleteButton";
import OfferDeleteButton from "@/features/apply/offer/components/OfferDeleteButton";
import { DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, FINAL_RESULT_STATUS, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
import { Document, Exam, FinalResult, Interview, Offer } from "@/types";
import { faCircleCheck, faCirclePlus, faDownload, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ActionContainer from "@/components/containers/ActionContainer";
import FileDownloadButton from "@/features/apply/document/file/components/FileDownloadButton";
import { getProcess } from "@/features/apply/process/api/getProcess";
import TitleContainer from "@/components/containers/TitleContainer";
import FormItem from "@/components/forms/FormItem";
import Label from "@/components/elements/Label";
import Textarea from "@/components/elements/Textarea";
import Input from "@/components/elements/Input";
import moment from "moment";
import CompanyDetail from "@/features/apply/process/components/CompanyDetail";
import { getApply } from "@/features/apply/api/getApply";
import BackLink from "@/components/navigations/BackLink";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `選考履歴一覧 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const ProcessPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    await verifyAuth();

    const applyId = (await params).applyId;
    const apply = await getApply(applyId);

    const process = await getProcess(applyId);

    return (
        <>
            <BackLink className="!container px-8" />
            <TitleContainer main="選考履歴一覧" />
            <div className="container mx-auto px-8 py-6 rounded-lg">
                <CompanyDetail company={apply.company} />

                <Link href={`/apply/${applyId}/process/create`}>
                    <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white mb-3">
                            <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">選考履歴登録</span>
                    </ActionContainer>
                </Link>

                { process.length > 0 ?
                    (
                        <ol className="relative border-s border-gray-200">
                            { process.map((value) => {
                                if ( value.type == DOCUMENT_SELECTION ) {
                                    const document: Document = value;
                                    return (
                                        <li key={`document_${document.document_id}`} className="mb-10 ms-6">
                                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-slate-100" />
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400">応募書類提出日 { document.submission_date }</time>
                                            <div className="p-4 shadow-sm border border-gray-200 rounded-lg bg-white">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">応募書類提出</h3>
                                                { document.files.length > 0 && (
                                                    <div className="mb-5 space-y-2">
                                                        {document.files.map(file => {
                                                            return (
                                                                <div key={`file_${file.file_id}`} className="border p-4 rounded-md overflow-x-auto">
                                                                    <FormItem>
                                                                        <Label>応募書類</Label>
                                                                        <Input
                                                                            type="text"
                                                                            name="name"
                                                                            value={ file.name }
                                                                            disabled={true}
                                                                            className="text-gray-500 bg-gray-100"
                                                                        />
                                                                    </FormItem>
                                                                    <div className="flex flex-wrap text-nowrap space-x-1">
                                                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                                            <FileDownloadButton applyId={applyId} documentId={document.document_id} fileId={file.file_id}>
                                                                                <FontAwesomeIcon icon={faDownload} /><span className="ml-1">ダウンロード</span>
                                                                            </FileDownloadButton>
                                                                        </ActionContainer>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                                <FormItem>
                                                    <Label>メモ</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ document.memo ?? "" }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
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
                                            </div>
                                        </li>
                                    )
                                }

                                if ( value.type == EXAM_SELECTION ) {
                                    const exam: Exam = value;
                                    return (
                                        <li key={`exam_${exam.exam_id}`} className="mb-10 ms-6">
                                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-slate-100" />
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400">試験日 { exam.exam_date }</time>
                                            <div className="p-4 shadow-sm border border-gray-200 rounded-lg bg-white">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">試験情報</h3>
                                                <FormItem>
                                                    <Label>試験内容</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ exam.content }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>メモ</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ exam.memo ?? "" }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
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
                                            </div>
                                        </li>
                                    )
                                }

                                if ( value.type == INTERVIEW_SELECTION ) {
                                    const interview: Interview = value;
                                    return (
                                        <li key={`interview_${interview.interview_id}`} className="mb-10 ms-6">
                                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-slate-100" />
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400">面接日 { interview.interview_date }</time>
                                            <div className="p-4 shadow-sm border border-gray-200 rounded-lg bg-white">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">面接情報</h3>
                                                <FormItem>
                                                    <Label>面接官情報</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ interview.interviewer_info ?? "" }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>メモ</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ interview.memo ?? "" }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
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
                                            </div>
                                        </li>
                                    )
                                }

                                if ( value.type == OFFER ) {
                                    const offer: Offer = value;
                                    return (
                                        <li key={`offer_${offer.offer_id}`} className="mb-10 ms-6">
                                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-slate-100" />
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400">内定通知日 { offer.offer_date }</time>
                                            <div className="p-4 shadow-sm border border-gray-200 rounded-lg bg-white">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">内定情報</h3>
                                                <FormItem>
                                                    <Label>年収</Label>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        value={ offer.salary ? offer.salary.toLocaleString() : '' }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>条件</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ offer.condition ?? "" }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>メモ</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ offer.memo ?? "" }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
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
                                            </div>
                                        </li>
                                    )
                                }

                                if ( value.type == FINAL_RESULT ) {
                                    const finalResult: FinalResult = value;
                                    return (
                                        <li key={`final_result_${finalResult.final_result_id}`} className="mb-10 ms-6">
                                            <div className="absolute w-3 h-3 bg-purple-500 rounded-full mt-1.5 -start-1.5 border border-slate-100" />
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400">選考終了情報作成日 { moment(finalResult.created_at).format('YYYY-MM-DD') }</time>
                                            <div className="p-4 shadow-sm border border-gray-200 rounded-lg bg-white">
                                                <h3 className="text-lg font-semibold text-white bg-purple-500 rounded-3xl p-1.5 mb-1 inline-block">
                                                    <FontAwesomeIcon icon={faCircleCheck} />
                                                    <span className="ml-1">選考終了</span>
                                                </h3>
                                                <FormItem>
                                                    <Label>ステータス</Label>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        value={ FINAL_RESULT_STATUS.find(status => status.id == finalResult.status)?.name }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>メモ</Label>
                                                    <Textarea
                                                        name="memo"
                                                        value={ finalResult.memo ?? "" }
                                                        disabled={true}
                                                        className="text-gray-500 bg-gray-100"
                                                    />
                                                </FormItem>
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
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ol>
                    )
                    : (
                        <h3 className="text-base font-medium mb-2">選考履歴はまだ登録されていません。</h3>
                    )
                }
            </div>
        </>
    )
}

export default ProcessPage;
