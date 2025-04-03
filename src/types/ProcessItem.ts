import { Document } from "./document";
import { Exam } from "./exam";
import { FinalResult } from "./final_result";
import { Interview } from "./interview";
import { Offer } from "./offer";
import { DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER } from "@/constants/const";

export type ProcessItem =
    | ({ type: typeof DOCUMENT_SELECTION }  & Document)
    | ({ type: typeof EXAM_SELECTION }      & Exam)
    | ({ type: typeof INTERVIEW_SELECTION } & Interview)
    | ({ type: typeof OFFER }               & Offer)
    | ({ type: typeof FINAL_RESULT }        & FinalResult);
