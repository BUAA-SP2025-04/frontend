// 图谱节点类型
export interface GraphNode {
  id: string
  name: string
  category: number
  type?: string
}

// 图谱连接类型
export interface GraphLink {
  source: string
  target: string
  label: {
    show: boolean
    formatter: string
  }
}

// 图谱数据响应类型
export interface GraphDataResponse {
  code: string
  message: string
  nodes: GraphNode[]
  links: GraphLink[]
  categories: any[]
}

// 图谱类型枚举
export enum GraphType {
  FOLLOW = 'follow',
  INSTITUTION = 'institution',
  RESEARCH = 'research'
}

// 节点类型枚举
export enum NodeType {
  LANGUAGE = 'language',
  FIELD = 'field'
}

// 筛选选项类型
export interface FilterOption {
  id: string
  name: string
  count: number
} 