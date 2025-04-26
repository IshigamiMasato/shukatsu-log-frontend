import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Button from '@/components/elements/Button';

describe('Button動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('childrenが描画されているか', () => {
            render(<Button>ボタン</Button>);
            const buttonEl = screen.getByRole('button', { name: 'ボタン' });
            expect(buttonEl).toBeInTheDocument();
        });

        test('追加のclassNameが適用されているか', () => {
            render(<Button className='bg-white'>ボタン</Button>);
            const buttonEl = screen.getByRole('button', { name: 'ボタン' });
            expect(buttonEl).toHaveClass('bg-white');
        });
    });

    describe('ボタン制御の確認', () => {
        test('クリックイベントが発火するか', () => {
            const clickHandler = vi.fn();
            render(<Button onClick={clickHandler}>ボタン</Button>);

            const buttonEl = screen.getByRole('button', { name: 'ボタン' });
            fireEvent.click(buttonEl);

            expect(clickHandler).toHaveBeenCalledTimes(1);
        });
    });
});
