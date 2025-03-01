"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const DocumentForm = ({ applyId } : { applyId : number }) => {
    const FILE_COUNT = 5;

    const [submissionDate, setSubmissionDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [files, setFiles] = useState<(File|undefined)[]>([]);
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ submission_date?: []; memo?: []; }>({});

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

        for (let i = 1; i <= FILE_COUNT; i++) {
            try {
                const file = files[i];

                if ( file ) {
                    const base64File = await fileToBase64(file);
                    formData.append(`files[]`, base64File);
                }

            } catch ( error ) {
                console.error(error);
                dispatch( dispToast({ status: "error", message: "ファイルのアップロードに失敗しました。" }) );
                return;
            }
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
                                errors={undefined} // TODO: ファイルサイズのバリデーション
                            />
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
            <Button>登録</Button>
        </form>
    )
}

export default DocumentForm;
