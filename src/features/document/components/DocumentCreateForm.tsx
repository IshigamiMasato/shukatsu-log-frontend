"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/containers/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormTitle from "@/components/containers/FormTitle";
import { FILE_COUNT, MAX_FILE_SIZE } from "@/constants/const";

const DocumentCreateForm = ({ applyId } : { applyId : number }) => {
    const [submissionDate, setSubmissionDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [files, setFiles] = useState<(File|undefined)[]>([]);
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState< Record<string, string[]> >({}); // file_${index} のように動的に値にアクセスするため、Recordで型定義

    const dispatch = useDispatch();

    const fileToBase64 = async ( file : File ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('ファイル読み込み失敗'));

            reader.readAsDataURL(file);
        });
    }

    const onSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
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
                    formData.append(`files[]`, base64File);
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

        fetch(`/api/apply/${applyId}/document`, {
            method: "POST",
            body: formData
        }).then(res => {
            if( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                })
                dispatch( dispToast({ status: "error", message: `書類の登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `書類の登録が完了しました。` }) );
        })
    }

    return (
        <div className="border p-4">
            <FormTitle>応募書類登録</FormTitle>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <FormItem>
                    <Label label="書類提出日" /><RequiredBadge />
                    <Input
                        type="date"
                        name="submission_date"
                        value={ submissionDate }
                        onChange={ (e) => setSubmissionDate(e.target.value) }
                        errors={validationErrors.submission_date}
                    />
                    { validationErrors.submission_date && <ValidationErrorMsg errors={validationErrors.submission_date} /> }
                </FormItem>
                {
                    [...Array(FILE_COUNT)].map((v, i) => {
                        const index = i + 1; // indexを1スタートとする

                        return (
                            <FormItem key={`file_${index}`}>
                                <Label label="提出書類" />
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
                <FormItem>
                    <Label label="メモ" />
                    <Textarea
                        name="memo"
                        value={ memo }
                        onChange={ e => setMemo(e.target.value) }
                        errors={validationErrors.memo}
                    />
                    { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
                </FormItem>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">登録</Button>
            </form>
        </div>
    )
}

export default DocumentCreateForm;
