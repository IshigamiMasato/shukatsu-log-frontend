import ModalPortal from "@/components/ModalPortal";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('MordalPortal動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('モーダルの内容が描画されているか', () => {
            const modalWrapper = document.createElement('div');
            modalWrapper.className = 'modal-wrapper';
            document.body.appendChild(modalWrapper);

            render(
                <ModalPortal>
                    <div>モーダル内容</div>
                </ModalPortal>
            );

            expect( document.querySelector('.modal-wrapper') ).toContainHTML('モーダル内容');
        });

        test('modal-wrapperが存在しない場合、モーダルの内容が描画されていないか', () => {
            const { container } = render(
                <ModalPortal>
                    <div>モーダル内容</div>
                </ModalPortal>
            );

            expect(container).not.toContainHTML('モーダル内容');
        });
    });
});
