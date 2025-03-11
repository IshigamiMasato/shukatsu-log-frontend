export const EVENT_TYPES = [
    { id: 1, name: "説明会" },
    { id: 2, name: "リクルータ面談" },
    { id: 3, name: "書類提出" },
    { id: 4, name: "適性検査" },
    { id: 5, name: "面談" },
    { id: 6, name: "内定関連" },
];

export const APPLY_STATUS = [
    { id: 1, name: "書類選考中" },
    { id: 2, name: "筆記試験選考中" },
    { id: 3, name: "面接選考中" },
    { id: 4, name: "内定" },
    { id: 5, name: "選考終了" },
];

export const FINAL_RESULT_STATUS = [
    { id: 1, name: "合格" },
    { id: 2, name: "不採用" },
    { id: 3, name: "辞退" },
];

export const INIT = 0;
export const DOCUMENT_SELECTION  = 1;
export const EXAM_SELECTION = 2;
export const INTERVIEW_SELECTION = 3;
export const OFFER = 4;
export const FINAL_RESULT = 5;

export const FILE_COUNT = 5;
export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
