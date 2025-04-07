import BackLink from "@/components/navigations/BackLink";
import ActionContainer from "@/components/containers/ActionContainer";
import FormItem from "@/components/forms/FormItem";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import Textarea from "@/components/elements/Textarea";
import { getCompany } from "@/features/company/api/getCompany";
import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `企業詳細 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const CompanyDetailPage = async ({ params } : { params : Promise<{ companyId: number }> }) => {
    await verifyAuth();

    const companyId = (await params).companyId;
    const company = await getCompany(companyId);

    return (
        <>
            <BackLink />
            <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto rounded-lg">
                <h2 className="text-lg font-semibold text-nowrap mb-5">企業詳細</h2>
                <div className="flex items-center justify-between overflow-x-auto mb-5">
                    <div />
                    <div className="flex items-center text-nowrap space-x-1">
                        <Link href={`/company/${companyId}/edit`}>
                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                            </ActionContainer>
                        </Link>
                        <CompanyDeleteButton companyId={companyId}>
                            <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                            </ActionContainer>
                        </CompanyDeleteButton>
                    </div>
                </div>

                <FormItem>
                    <Label>企業名</Label>
                    <Input
                        type="text"
                        name="name"
                        value={ company.name }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>企業URL</Label>
                    <Input
                        type="text"
                        name="url"
                        value={ company.url ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>社長名</Label>
                    <Input
                        type="text"
                        name="president"
                        value={ company.president ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>住所</Label>
                    <Input
                        type="text"
                        name="address"
                        value={ company.address ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>設立年月日</Label>
                    <Input
                        type="date"
                        name="establish_date"
                        value={ company.establish_date ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>従業員数</Label>
                    <Input
                        type="text"
                        name="employee_number"
                        value={ company.employee_number ? company.employee_number.toLocaleString() : '' }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>上場区分</Label>
                    <Input
                        type="text"
                        name="listing_class"
                        value={ company.listing_class ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>事業内容</Label>
                    <Textarea
                        name="business_description"
                        value={ company.business_description ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>福利厚生</Label>
                    <Textarea
                        name="benefit"
                        value={ company.benefit ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label>メモ</Label>
                    <Textarea
                        name="memo"
                        value={ company.memo ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
            </div>
        </>
    );
}

export default CompanyDetailPage;
