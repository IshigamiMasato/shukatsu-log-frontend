"use client";

import ActionContainer from "@/components/containers/ActionContainer";
import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import FormTitle from "@/components/forms/FormTitle";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import { FILE_COUNT, MAX_FILE_SIZE } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { Document } from "@/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import FileDeleteButton from "../file/components/FileDeleteButton";
import { useRouter } from "next/navigation";

const fileToBase64 = async ( file : File ): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('ファイル読み込み失敗'));

        reader.readAsDataURL(file);
    });
}

const DocumentEditForm = ({ document } : { document: Document }) => {
    const [submissionDate, setSubmissionDate] = useState<string>(document.submission_date);
    const [memo, setMemo] = useState<string>(document.memo ?? "");
    const [files, setFiles] = useState<(File|undefined)[]>([]);
    const [validationErrors, setValidationErrors] = useState< Record<string, string[]> >({}); // file_${index} のように動的に値にアクセスするため、Recordで型定義
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        let isValidFileSize = true;
        for (let i = 1; i <= FILE_COUNT; i++) {
            try {
                const file = files[i];

                if ( file ) {
                    // ファイルサイズのみフロントでバリデーションチェック
                    if ( file.size > MAX_FILE_SIZE ) {
                        isValidFileSize = false;
                        setValidationErrors( prev => ({ ...prev, [`file_${i}`]: ["ファイルサイズは10MB以下としてください。"] }) );
                    }

                    const base64File = await fileToBase64(file);
                    const fileName = file.name;
                    const fileData = JSON.stringify({ name: fileName, base64: base64File });

                    formData.append(`files[]`, fileData);
                }

            } catch ( error ) {
                console.error(error);
                dispatch( dispToast({ status: "error", message: "ファイルのアップロードに失敗しました。" }) );
                return;
            }
        }

        // ファイルサイズのバリデーションに引っかかっている場合
        if ( ! isValidFileSize ) {
            return;
        }

        fetch(`/api/apply/${document.apply_id}/document/${document.document_id}`, {
            method: "PUT",
            body: formData
        }).then(res => {
            if( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                })
                dispatch( dispToast({ status: "error", message: `提出書類の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then( (newDocument:Document) => {
                setSubmissionDate(newDocument.submission_date);
                setMemo(newDocument.memo ?? "");

                dispatch( dispToast({ status: "success", message: `提出書類の更新が完了しました。` }) );
                router.push(`/apply/${document.apply_id}/process`);
            });
        })
    }

    return (
        <FormContainer>
            <FormTitle>応募書類編集フォーム</FormTitle>
            <form onSubmit={onSubmit}>
                <FormItem>
                    <Label>応募書類提出日</Label><RequiredBadge />
                    <Input
                        type="date"
                        name="submission_date"
                        value={ submissionDate }
                        onChange={ (e) => setSubmissionDate(e.target.value) }
                        errors={validationErrors.submission_date}
                    />
                    { validationErrors.submission_date && <ValidationErrorMsg errors={validationErrors.submission_date} /> }
                </FormItem>
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
                                            readOnly={true}
                                            className="text-gray-500 bg-gray-100"
                                        />
                                    </FormItem>
                                    <div className="flex flex-wrap text-nowrap space-x-1">
                                        <FileDeleteButton applyId={document.apply_id} documentId={document.document_id} fileId={file.file_id}>
                                            <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                                <FontAwesomeIcon icon={faTrash} /><span className="ml-1">ファイル削除</span>
                                            </ActionContainer>
                                        </FileDeleteButton>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                <FormItem>
                {
                    [...Array(FILE_COUNT - document.files.length)].map((v, i) => {
                        const index = i + 1; // indexを1スタートとする

                        return (
                            <FormItem key={`file_${index}`}>
                                <Label>応募書類</Label>
                                <Input
                                    type="file"
                                    name={`file_${index}`}
                                    onChange={ (e) => {
                                        const newFiles = [...files];
                                        newFiles[index] = e.target.files?.[0];
                                        setFiles(newFiles);
                                    }}
                                    errors={validationErrors[`file_${index}`]}
                                />
                                { validationErrors[`file_${index}`] && <ValidationErrorMsg errors={validationErrors[`file_${index}`]} /> }
                            </FormItem>
                        )
                    })
                }
                </FormItem>
                <FormItem>
                    <Label>メモ</Label>
                    <Textarea
                        name="memo"
                        value={ memo }
                        onChange={ e => setMemo(e.target.value) }
                        errors={validationErrors.memo}
                    />
                    { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
                </FormItem>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">更新</Button>
            </form>
        </FormContainer>
    )
}

export default DocumentEditForm;
