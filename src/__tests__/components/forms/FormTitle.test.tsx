import FormTitle from "@/components/forms/FormTitle";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('FormTitle動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('childrenが描画されているか', () => {
            render(<FormTitle>フォームタイトル</FormTitle>);
            const childEl = screen.getByText('フォームタイトル');
            expect(childEl).toBeInTheDocument();
        });
    });
});
