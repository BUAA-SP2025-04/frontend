// 批注类型
export interface Annotation {
    id: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    comment: string;
    markerX: number;
    markerY: number;
    paperId: number;    // 论文信息
}

// API传出存储的批注
export interface AnnotationUpload {
    // id: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    comment: string;
    markerX: number;
    markerY: number;
    // paperId: number;    // 论文信息
}

// 高亮类型
export interface HighlightPreview {
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
}

// 位置类型
export interface PopupPosition {
    x: number;
    y: number;
}

export type GetAnnotationListResponse = { data: Annotation[] }
export type UploadAnnotationResponse = { data: number };