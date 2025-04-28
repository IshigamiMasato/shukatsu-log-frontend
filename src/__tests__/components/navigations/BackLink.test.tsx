
import BackLink from "@/components/navigations/BackLink";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedRouterBack = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter() {
        return {
            back: mockedRouterBack
        }
    }
}));

describe('BackLink動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('BackLinkが描画されているか', () => {
            render(<BackLink />);
            const backLinkEl = screen.getByText('前の画面に戻る');
            expect(backLinkEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(<BackLink className="bg-white" />);
            const buttonEl = screen.getByRole('button', { name: '前の画面に戻る' }).parentElement;
            expect(buttonEl).toHaveClass('bg-white');
        });
    });

    describe('入力制御の確認', () => {
        test('リンククリックでrouter.back()が呼ばれるか', () => {
            render(<BackLink />);

            const buttonEl = screen.getByRole('button', { name: '前の画面に戻る' });
            fireEvent.click(buttonEl);

            expect(mockedRouterBack).toHaveBeenCalledTimes(1);
        });
    });
});
