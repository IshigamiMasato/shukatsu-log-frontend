import { DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER, UNREGISTERED_SELECTION_PROCESS } from "@/constants/const";
import UnregisteredSelectionProcessStatusBadge from "./components/UnregisteredSelectionProcessStatusBadge";
import DocumentSelectionStatusBadge from "./components/DocumentSelectionStatusBadge";
import ExamSelectionStatusBadge from "./components/ExamSelectionStatusBadge";
import InterviewSelectionStatusBadge from "./components/InterviewSelectionStatusBadge";
import OfferStatusBadge from "./components/OfferStatusBadge";
import FinalResultStatusBadge from "./components/FinalResultStatusBadge";
import { JSX } from "react";

const getBadge = (status: number): JSX.Element|null => {
    switch (status) {
        case UNREGISTERED_SELECTION_PROCESS:
            return <UnregisteredSelectionProcessStatusBadge />;
        case DOCUMENT_SELECTION:
            return <DocumentSelectionStatusBadge />;
        case EXAM_SELECTION:
            return <ExamSelectionStatusBadge />;
        case INTERVIEW_SELECTION:
            return <InterviewSelectionStatusBadge />;
        case OFFER:
            return <OfferStatusBadge />;
        case FINAL_RESULT:
            return <FinalResultStatusBadge />;
        default:
            return null;
    }
}

export default getBadge;
