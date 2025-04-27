import FormContainer from "@/components/forms/FormContainer";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('FormContainer動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('childrenが描画されているか', () => {
            render(
                <FormContainer>
                    <div>テストコンテンツ</div>
                </FormContainer>
            );
            const childEl = screen.getByText('テストコンテンツ');
            expect(childEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(
                <FormContainer className="bg-blue-500">
                    <div>テストコンテンツ</div>
                </FormContainer>
            );
            const containerEl = screen.getByText('テストコンテンツ').parentElement;
            expect(containerEl).toHaveClass('bg-blue-500');
        });
    });
});
