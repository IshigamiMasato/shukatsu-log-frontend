import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Textarea from '@/components/elements/Textarea';
import userEvent from '@testing-library/user-event';

describe('Textareaコンポーネント動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('Textareaが表示されるか', () => {
            render(<Textarea />);
            const textareaEl = screen.getByRole('textbox');
            expect(textareaEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(<Textarea className="bg-white" />);
            const textareaEl = screen.getByRole('textbox');
            expect(textareaEl).toHaveClass('bg-white');
        });

        test('エラー時にエラー用のclassNameが適用されているか', () => {
            render(<Textarea errors={ ['エラー'] } />);
            const textareaEl = screen.getByRole('textbox');
            expect(textareaEl).toHaveClass('border-2 border-red-500');
        });
    });

    describe('入力制御の確認', () => {
        test('値を入力できるか', async () => {
            const user = userEvent.setup();
            render(<Textarea />);

            const textareaEl = screen.getByRole('textbox') as HTMLTextAreaElement;
            expect(textareaEl.value).toBe('');

            await user.type(textareaEl, 'テスト入力');
            expect(textareaEl.value).toBe('テスト入力');
        });
    });
});
