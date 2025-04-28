import LoadingOverlay from "@/components/LoadingOverlay";
import store from "@/store";
import { dispLoading, removeLoading } from "@/store/modules/loading";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";

describe('LoadingOverlay動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('ローディング中の場合、Loadingが描画されているか', () => {
            store.dispatch( dispLoading() );

            render(
                <Provider store={store}>
                    <LoadingOverlay />
                </Provider>
            );

            const loadingEl = screen.getByRole('status');
            expect(loadingEl).toBeInTheDocument();
        });

        test('ローディング中でない場合、Loadingが描画されていないか', () => {
            store.dispatch( removeLoading() );

            render(
                <Provider store={store}>
                    <LoadingOverlay />
                </Provider>
            );

            const loadingEl = screen.queryByRole('status');
            expect(loadingEl).toBeNull();
        });
    });
});
