import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import ActionContainer from '@/components/containers/ActionContainer';

describe('ActionContainer動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('childrenが描画されているか', () => {
            render(
                <ActionContainer>
                    <span>アクション</span>
                </ActionContainer>
            );
            const spanEl = screen.getByText('アクション');
            expect(spanEl).toBeInTheDocument();
        });

        test('classNameが適用されているか', () => {
            render(
                <ActionContainer className='bg-white'>
                    <span>クラスあり</span>
                </ActionContainer>
            );
            const containerEl = screen.getByText('クラスあり').parentElement;
            expect(containerEl).toHaveClass('bg-white');
        });
    });
});
