import ErrorMsg from "@/components/forms/ErrorMsg";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('ErrorMsg動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('errorが描画されているか', () => {
            render(<ErrorMsg error="エラーメッセージ" />);
            const errorEl = screen.getByText('エラーメッセージ');
            expect(errorEl).toBeInTheDocument();
        });
    });
});
