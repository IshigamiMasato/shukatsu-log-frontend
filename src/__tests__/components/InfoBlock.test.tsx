import InfoBlock from "@/components/InfoBlock";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('InfoBlock動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('label, childrenが描画されているか', () => {
            render(<InfoBlock label="テストラベル">テスト本文</InfoBlock>);

            const labelEl = screen.getByRole('heading', { level: 3, name: 'テストラベル' });
            expect(labelEl).toBeInTheDocument();

            const childEl = screen.getByText('テスト本文');
            expect(childEl).toBeInTheDocument();
        });
    });
});
