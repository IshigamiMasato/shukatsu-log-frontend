import RequiredBadge from "@/components/forms/RequiredBadge";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('RequiredBadge動作確認', () => {
    describe('初期表示の正常確認', () => {
        test('アスタリスクが描画されているか', () => {
            render(<RequiredBadge />);
            const requiredBadgeEl = screen.getByText('*');
            expect(requiredBadgeEl).toBeInTheDocument();
        });
    });
});
