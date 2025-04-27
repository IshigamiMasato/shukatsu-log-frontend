import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('ValidationErrorMsg動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('バリデーションエラーメッセージがカンマ区切りで描画されているか', () => {
            const errors = ['入力値の形式が不正です', '入力値は文字で指定してください'];
            render(<ValidationErrorMsg errors={errors} />);
            const validationErrorMsgEl = screen.getByText('入力値の形式が不正です,入力値は文字で指定してください');
            expect(validationErrorMsgEl).toBeInTheDocument();
        });
    });
});
