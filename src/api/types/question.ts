// 问题相关类型定义

// 用户信息
export interface QuestionUser {
  id: number
  name: string
  researchArea: string
  title: string
  imgUrl: string
  institution: string
  createdAt: string
}

// 回答信息
export interface QuestionAnswer {
  id: string
  user: QuestionUser
  content: string
  parentId?: string
  createdAt: string
  likeNum: string
  childAnswers?: QuestionChildAnswer[]
}

// 子回答信息
export interface QuestionChildAnswer {
  id: string
  user: QuestionUser
  content: string
  parentUserId: string
  parentUserName: string
  createdAt: string
  likeNum: string
}

// 问题信息
export interface Question {
  id: string
  user: QuestionUser
  title: string
  content: string
  createAt: string
  researchArea: string
  answerNum: number
  likeNum: string
  followNum: number
  bestAnswer?: QuestionAnswer
  answers?: QuestionAnswer[]
}

// 问题列表响应
export interface QuestionListResponse {
  questions: Question[]
}

// 问题详情响应 - 实际API返回的结构
export interface QuestionDetailApiResponse {
  question: {
    id: number
    userId: number
    user: QuestionUser
    title: string
    content: string
    researchArea: string | null
    createdAt: string
    answerNum: number
    likeNum: number
    followNum: number
    bestAnswerId: number
    bestAnswer: QuestionAnswer | null
  }
  answerWithReplies: QuestionAnswer[]
}

// 问题详情响应 - 前端使用的结构
export interface QuestionDetailResponse {
  id: string
  user: QuestionUser
  title: string
  content: string
  createAt: string
  researchArea: string
  answerNum: number
  likeNum: string
  followNum: number
  bestAnswer?: QuestionAnswer
  answers: QuestionAnswer[]
}

// 创建问题请求
export interface CreateQuestionRequest {
  title: string
  content: string
  researchArea: string
}

// 回答问题请求
export interface AnswerQuestionRequest {
  questionId: number
  content: string
  answerId?: number // 如果是-1表示对问题的回答，如果是其他数字表示对某个回答的回复
}

// 关注问题请求
export interface FollowQuestionRequest {
  questionId: string
}

// 取消关注问题请求
export interface UnfollowQuestionRequest {
  projectId: string // 注意：后端接口参数名是projectId
}

// 点赞回答请求
export interface LikeAnswerRequest {
  answerId: string
}

// 取消点赞回答请求
export interface UnlikeAnswerRequest {
  answerId: string
}

// 删除问题请求
export interface DeleteQuestionRequest {
  questionId: string
}

// 修改问题请求
export interface UpdateQuestionRequest {
  id: number
  title: string
  content: string
  researchArea: string
  bestAnswerId?: number
}

// 通用响应类型
export interface ApiResponse<T = any> {
  code: string
  data: T
  message: string
} 