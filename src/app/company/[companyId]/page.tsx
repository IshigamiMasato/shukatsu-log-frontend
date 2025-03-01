import FormItem from "@/components/containers/FormItem";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import Textarea from "@/components/elements/Textarea";
import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import { getJWT } from "@/helper";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const CompanyDetailPage = async ({ params } : { params : Promise<{ companyId: number }> }) => {
    const companyId = (await params).companyId;

    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/company/${companyId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch company. (status=${res.status})`);
    }

    const company = await res.json();

    return (
        <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold">企業詳細</h2>
                <div className="flex text-nowrap space-x-1">
                    <Link href={`/company/${companyId}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                        <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                    </Link>
                    <CompanyDeleteButton companyId={companyId}>
                        <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                    </CompanyDeleteButton>
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
                    value={ company.establishDate ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="従業員数" />
                <Input
                    type="number"
                    name="employee_number"
                    value={ company.employeeNumber ?? "" }
                    disabled={true}
                    className="text-gray-500 bg-gray-100"
                />
            </FormItem>
            <FormItem>
                <Label label="上場区分" />
                <Input
                    type="text"
                    name="listing_class"
                    value={ company.listingClass ?? "" }
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
