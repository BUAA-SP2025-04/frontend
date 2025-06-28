// 批注类型
export interface Annotation {
    id: string;
    type: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    comment: string;
    markerX: number;
    markerY: number;
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