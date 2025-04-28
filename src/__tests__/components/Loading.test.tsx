import Loading from "@/components/Loading";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Loading動作確認", () => {
    describe('初期表示の正常確認', () => {
        test("スピナー用のSVGが描画されているか", () => {
            render(<Loading />);
            const spinnerSvg = screen.getByRole("status").querySelector("svg");
            expect(spinnerSvg).toBeInTheDocument();
        });
    });
});
