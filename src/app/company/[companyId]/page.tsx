import ActionContainer from "@/components/containers/ActionContainer";
import FormItem from "@/components/containers/FormItem";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import Textarea from "@/components/elements/Textarea";
import { getCompany } from "@/features/company/api/getCompany";
import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const CompanyDetailPage = async ({ params } : { params : Promise<{ companyId: number }> }) => {
    const companyId = (await params).companyId;

    const company = await getCompany(companyId);

    // トークンリフレッシュが必要な場合
    if ( company === null ) return;

    return (
        <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto rounded-lg">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold">企業詳細</h2>
                <div className="flex text-nowrap space-x-1">
                    <ActionContainer>
                        <Link href={`/company/${companyId}/edit`}>
                            <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                        </Link>
                    </ActionContainer>
                    <ActionContainer>
                        <CompanyDeleteButton companyId={companyId}>
                            <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                        </CompanyDeleteButton>
                    </ActionContainer>
                </div>
            </div>

            <FormItem>
                <Label label="企業名" />
                <Input
                    type="text"
                    name="name"
                    value={ company.name }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="企業URL" />
                <Input
                    type="text"
                    name="url"
                    value={ company.url ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="社長名" />
                <Input
                    type="text"
                    name="president"
                    value={ company.president ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="住所" />
                <Input
                    type="text"
                    name="address"
                    value={ company.address ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="設立年月日" />
                <Input
                    type="date"
                    name="establish_date"
                    value={ company.establish_date ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="従業員数" />
                <Input
                    type="number"
                    name="employee_number"
                    value={ company.employee_number ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="上場区分" />
                <Input
                    type="text"
                    name="listing_class"
                    value={ company.listing_class ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="福利厚生" />
                <Textarea
                    name="benefit"
                    value={ company.benefit ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="メモ" />
                <Textarea
                    name="memo"
                    value={ company.memo ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
        </div>
    );
}

export default CompanyDetailPage;
