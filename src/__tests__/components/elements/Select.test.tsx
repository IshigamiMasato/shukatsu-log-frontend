import Select from "@/components/elements/Select";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('Select動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('childrenが描画されているか', () => {
            render(
                <Select>
                    <option value="option1">オプション１</option>
                </Select>
            );
            const optionEl = screen.getByRole('option', { name: 'オプション１' });
            expect(optionEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(
                <Select className="bg-white">
                    <option value="option1">オプション１</option>
                </Select>
            );
            const selectEl = screen.getByRole('combobox');
            expect(selectEl).toHaveClass('bg-white');
        });

        test('エラー時にエラー用のclassNameが適用されているか', () => {
            render(
                <Select className="bg-white" errors={ ['エラー'] }>
                    <option value="option1">オプション１</option>
                </Select>
            );
            const selectEl = screen.getByRole('combobox');
            expect(selectEl).toHaveClass('border-2', 'border-red-500');
        });
    });

    describe('入力制御の確認', () => {
        test('選択肢を選べるか', () => {
            render(
                <Select defaultValue="option1">
                    <option value="option1">オプション１</option>
                    <option value="option2">オプション２</option>
                </Select>
            );

            const selectEl = screen.getByRole('combobox') as HTMLSelectElement;
            expect(selectEl.value).toBe('option1');

            fireEvent.change(selectEl, { target: { value: 'option2' } });
            expect(selectEl.value).toBe('option2');
        });
    });
});
