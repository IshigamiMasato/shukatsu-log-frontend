import BackLink from "@/components/BackLink";
import ActionContainer from "@/components/containers/ActionContainer";
import FormItem from "@/components/containers/FormItem";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import Textarea from "@/components/elements/Textarea";
import { APPLY_STATUS } from "@/constants/const";
import { getApply } from "@/features/apply/api/getApply";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import { faClockRotateLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ApplyDetailPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    const applyId = (await params).applyId;

    const apply = await getApply(applyId);

    // トークンリフレッシュが必要な場合
    if ( apply === null ) return;

    return (
        <>
            <BackLink />
            <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto rounded-lg">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-semibold text-nowrap">応募詳細</h2>
                    <div className="flex flex-wrap justify-end text-nowrap space-x-1">
                        <Link href={`/apply/${apply.apply_id}/process`}>
                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                    <FontAwesomeIcon icon={faClockRotateLeft} /><span className="ml-1">選考履歴</span>
                            </ActionContainer>
                        </Link>
                        <Link href={`/apply/${applyId}/edit`}>
                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                    <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                            </ActionContainer>
                        </Link>
                        <ApplyDeleteButton applyId={applyId}>
                            <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                    <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                            </ActionContainer>
                        </ApplyDeleteButton>
                    </div>
                </div>

                <FormItem>
                    <Label label="企業名" />
                    <Input
                        type="text"
                        name="name"
                        value={ apply.company.name }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label label="企業URL" />
                    <Input
                        type="text"
                        name="url"
                        value={ apply.company.url ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label label="職種" />
                    <Input
                        type="text"
                        name="occupation"
                        value={ apply.occupation ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label label="選考ステータス" />
                    <Input
                        type="text"
                        name="status"
                        value={ APPLY_STATUS.find(status => status.id == apply.status)?.name }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label label="応募経路" />
                    <Input
                        type="text"
                        name="apply_route"
                        value={ apply.apply_route ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label label="メモ" />
                    <Textarea
                        name="memo"
                        value={ apply.memo ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
            </div>
        </>
    );
}

export default ApplyDetailPage;
