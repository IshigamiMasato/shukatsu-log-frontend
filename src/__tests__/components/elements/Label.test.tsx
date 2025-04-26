import Label from "@/components/elements/Label";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('Label動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('childrenが描画されているか', () => {
            render(<Label>ラベル</Label>);
            const labelEl = screen.getByText('ラベル');
            expect(labelEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(<Label className="bg-white">ラベル</Label>);
            const labelEl = screen.getByText('ラベル');
            expect(labelEl).toHaveClass('bg-white');
        });
    });
});
