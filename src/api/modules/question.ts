import request from '@/utils/request'
import type {
  CreateQuestionRequest,
  AnswerQuestionRequest,
  FollowQuestionRequest,
  UnfollowQuestionRequest,
  LikeAnswerRequest,
  UnlikeAnswerRequest,
  DeleteQuestionRequest,
  UpdateQuestionRequest,
  QuestionListResponse,
  QuestionDetailResponse,
  QuestionDetailApiResponse,
  ApiResponse,
} from '../types/question'

// 问题相关类型定义
export interface QuestionUser {
  id: number
  name: string
  researchArea: string
  title: string
  imgUrl: string
  institution: string
  createdAt: string
}

export interface QuestionAnswer {
  id: string
  user: QuestionUser
  content: string
  parentId?: string
  createdAt: string
  likeNum: string
  childAnswers?: QuestionChildAnswer[]
}

export interface QuestionChildAnswer {
  id: string
  user: QuestionUser
  content: string
  parentUserId: string
  parentUserName: string
  createdAt: string
  likeNum: string
}

export interface Question {
  id: string
  user: QuestionUser
  title: string
  content: string
  createAt: string
  researchArea: string
  answerNum: number
  likeNum: number
  followNum: number
  bestAnswer?: QuestionAnswer
  answers?: QuestionAnswer[]
}

// 发布问题
export function createQuestion(data: CreateQuestionRequest): Promise<ApiResponse> {
  return request.post('/question/create', data)
}

// 回答问题
export function answerQuestion(data: AnswerQuestionRequest): Promise<ApiResponse> {
  return request.post('/question/answer', data)
}

// 关注问题
export function followQuestion(data: FollowQuestionRequest): Promise<ApiResponse> {
  return request.post('/question/follow', data)
}

// 取消关注问题
export function unfollowQuestion(data: UnfollowQuestionRequest): Promise<ApiResponse> {
  return request.post('/question/unfollow', data)
}

// 点赞回答
export function likeAnswer(data: LikeAnswerRequest): Promise<ApiResponse> {
  return request.post('/question/like', data)
}

// 取消点赞回答
export function unlikeAnswer(data: UnlikeAnswerRequest): Promise<ApiResponse> {
  return request.post('/question/unlike', data)
}

// 删除问题
export function deleteQuestion(data: DeleteQuestionRequest): Promise<ApiResponse> {
  return request.post('/question/delete', data)
}

// 修改问题
export function updateQuestion(data: UpdateQuestionRequest): Promise<ApiResponse> {
  return request.post('/question/update', data)
}

// 获取问题详情
export function getQuestionDetail(questionId: string): Promise<ApiResponse<QuestionDetailApiResponse>> {
  return request.get(`/question/${questionId}`)
}

// 获取问题列表
export function getQuestionList(): Promise<ApiResponse<QuestionListResponse>> {
  return request.get('/question/getQuestionList')
}

// 获取我关注的问题
export function getMyFollowedQuestions(): Promise<ApiResponse<QuestionListResponse>> {
  return request.get('/question/my/followed')
}

// 获取我提问的问题
export function getMyAskedQuestions(): Promise<ApiResponse<QuestionListResponse>> {
  return request.get('/question/my/asked')
}

// 获取我回答过的问题
export function getMyAnsweredQuestions(): Promise<ApiResponse<QuestionListResponse>> {
  return request.get('/question/my/answered')
}

// 获取活跃用户
export function getTopAnswerUsers(): Promise<ApiResponse<any[]>> {
  return request.get('/question/top-answer-users')
}

// 获取科研问答热门标签统计
export function getResearchAreaStats(): Promise<ApiResponse<any>> {
  return request.get('/question/research-area-stats')
}

// 设置问题是否解决
export function setSolvedStatus(data: { questionId: string; solved: boolean }): Promise<ApiResponse> {
  return request.post('/question/setSolvedStatus', data)
} 