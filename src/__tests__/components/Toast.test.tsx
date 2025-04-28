import Toast from "@/components/Toast";
import store from "@/store";
import { dispToast } from "@/store/modules/toast";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, test, vi } from "vitest";

vi.useFakeTimers();

describe('Toast動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('初期状態はトーストが描画されていないか', () => {
            const { container } = render(
                <Provider store={store}>
                    <Toast />
                </Provider>
            );

            const toastEl = container.querySelector('.toast-wrapper') as HTMLElement;
            expect(toastEl).toBeNull();
        });

        test('成功のトーストが描画されているか', () => {
            store.dispatch( dispToast({ status: 'success', message: '成功テストメッセージ' }) );

            render(
                <Provider store={store}>
                    <Toast />
                </Provider>
            );

            const toastEl = screen.getByText('成功テストメッセージ');

            expect(toastEl).toBeInTheDocument();
            expect(toastEl).toHaveClass('bg-green-600 text-white');
        });

        test('失敗のトーストが描画されているか', () => {
            store.dispatch( dispToast({ status: 'error', message: '失敗テストメッセージ' }) );

            render(
                <Provider store={store}>
                    <Toast />
                </Provider>
            );

            const toastEl = screen.getByText('失敗テストメッセージ');

            expect(toastEl).toBeInTheDocument();
            expect(toastEl).toHaveClass('bg-red-600 text-white');
        });

        test('5秒後にトーストが削除される', () => {
            store.dispatch( dispToast({ status: 'success', message: '成功テストメッセージ' }) );

            const { container } = render(
                <Provider store={store}>
                    <Toast />
                </Provider>
            );

            // タイマーを5秒進める
            act(() => {
                vi.advanceTimersByTime(5000);
            });

            const toastEl = container.querySelector('.toast-wrapper') as HTMLElement;
            expect(toastEl).toBeNull();
          });
    });
});
