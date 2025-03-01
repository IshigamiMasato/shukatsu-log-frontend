import FormItem from "@/components/containers/FormItem";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import Textarea from "@/components/elements/Textarea";
import { APPLY_STATUS } from "@/constants/const";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import { getJWT } from "@/helper";
import { faClockRotateLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ApplyDetailPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    const applyId = (await params).applyId;

    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply/${applyId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch apply. (status=${res.status})`);
    }

    const apply = await res.json();

    return (
        <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold text-nowrap">応募詳細</h2>
                <div className="flex flex-wrap justify-end text-nowrap space-x-1">
                    <Link href={`/apply/${apply.apply_id}/process`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                        <FontAwesomeIcon icon={faClockRotateLeft} /><span className="ml-1">選考履歴</span>
                    </Link>
                    <Link href={`/apply/${applyId}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                        <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                    </Link>
                    <ApplyDeleteButton applyId={applyId}>
                        <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
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
                    className="text-gray-500"
                />
            </FormItem>
            <FormItem>
                <Label label="企業URL" />
                <Input
                    type="text"
                    name="url"
                    value={ apply.company.url ?? "" }
                    disabled={true}
                    className="text-gray-500"
                />
            </FormItem>
            <FormItem>
                <Label label="職種" />
                <Input
                    type="text"
                    name="occupation"
                    value={ apply.occupation ?? "" }
                    disabled={true}
                    className="text-gray-500"
                />
            </FormItem>
            <FormItem>
                <Label label="選考ステータス" />
                <Input
                    type="text"
                    name="status"
                    value={ APPLY_STATUS.find(status => status.id == apply.status)?.name }
                    disabled={true}
                    className="text-gray-500"
                />
            </FormItem>
            <FormItem>
                <Label label="応募経路" />
                <Input
                    type="text"
                    name="apply_route"
                    value={ apply.apply_route ?? "" }
                    disabled={true}
                    className="text-gray-500"
                />
            </FormItem>
            <FormItem>
                <Label label="メモ" />
                <Textarea
                    name="memo"
                    value={ apply.memo ?? "" }
                    disabled={true}
                    className="text-gray-500"
                />
            </FormItem>
        </div>
    );
}

export default ApplyDetailPage;
