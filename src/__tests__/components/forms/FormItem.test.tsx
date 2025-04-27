import FormItem from '@/components/forms/FormItem';
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('FormItem動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('childrenが描画されているか', () => {
            render(
                <FormItem>
                    <div>テストコンテンツ</div>
                </FormItem>
            );
            const childEl = screen.getByText('テストコンテンツ');
            expect(childEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(
                <FormItem className="bg-white">
                    <div>テストコンテンツ</div>
                </FormItem>
            );
            const containerEl = screen.getByText('テストコンテンツ').parentElement;
            expect(containerEl).toHaveClass('bg-white');
        });
    });
});
