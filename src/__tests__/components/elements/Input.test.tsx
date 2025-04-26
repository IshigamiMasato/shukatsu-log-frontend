import Input from "@/components/elements/Input";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

describe('Input動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('Inputが描画されているか', () => {
            render(<Input />);
            const inputEl = screen.getByRole('textbox');
            expect(inputEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(<Input className="bg-white" />);
            const inputEl = screen.getByRole('textbox');
            expect(inputEl).toHaveClass('bg-white');
        });

        test('エラー時にエラー用のclassNameが適用されているか', () => {
            render(<Input errors={ ['エラー'] } />);
            const inputEl = screen.getByRole('textbox');
            expect(inputEl).toHaveClass('border-2', 'border-red-500');
        });
    });

    describe('入力制御の確認', () => {
        test('値を入力できるか', async () => {
            const user = userEvent.setup();
            render(<Input />);

            const inputEl = screen.getByRole('textbox') as HTMLInputElement;;
            expect(inputEl.value).toBe('');

            await user.type(inputEl, 'テスト入力');
            expect(inputEl.value).toBe('テスト入力');
        });
    });
});
