import TitleContainer from "@/components/containers/TitleContainer";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('TitleContainer動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('mainが描画されているか', () => {
            render(<TitleContainer main="メイン" />);
            const mainEl = screen.getByText('メイン');
            expect(mainEl).toBeInTheDocument();
        });

        test('subが描画されているか', () => {
            render(<TitleContainer main="メイン" sub="サブ" />);
            const subEl = screen.getByText('サブ');
            expect(subEl).toBeInTheDocument();
        });

        test('subを渡さない場合、subが描画されていないか', () => {
            const { container } = render(<TitleContainer main="メイン" />);
            const subEl = container.querySelector('p');
            expect(subEl).toBeNull();
        });
    });
});
