// 问题相关类型定义

// 用户信息
export interface QuestionUser {
  id: number
  name: string
  email: string
  gender: string
  bio: string
  researchArea: string
  institution: string
  title: string
  imgUrl: string
  createdAt: string
  followerNum: number
  subjectNum: number
  publishNum: number
  likeNum: number
  readerNum: number
}

// 回答信息
export interface QuestionAnswer {
  id: string
  user: QuestionUser
  content: string
  createdAt: string
  likeNum: number
  liked?: boolean // 添加点赞状态
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
  likeNum: number
  liked?: boolean // 添加点赞状态
}

// 带回复的回答信息
export interface AnswerWithReplies {
  answer: {
    id: number
    questionId: number
    answerId: number
    userId: number
    user: QuestionUser
    content: string
    createdAt: string
    likeNum: number
    isSelected: number
  }
  replies: {
    id: number
    questionId: number
    answerId: number
    userId: number
    user: QuestionUser
    content: string
    createdAt: string
    likeNum: number
    isSelected: number
  }[]
  liked: boolean
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
  likeNum: number
  followNum: number
  readNum?: number // 新增浏览量字段
  bestAnswer?: QuestionAnswer
  answers?: QuestionAnswer[]
  followed?: boolean // 添加关注状态字段
}

// 问题列表项 - 新的API返回格式
export interface QuestionListItem {
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
    readNum?: number // 新增浏览量字段
    bestAnswerId: number
    bestAnswer: {
      id: number
      questionId: number
      answerId: number
      userId: number
      user: QuestionUser | null
      content: string
      createdAt: string
      likeNum: number
      isSelected: number
    } | null
  }
  answerWithReplies: AnswerWithReplies[] | null
  followed: boolean
}

// 问题列表响应
export interface QuestionListResponse {
  questions: Question[]
}

// 问题列表API响应 - 新的格式
export interface QuestionListApiResponse {
  code: string
  message: string
  data: QuestionListItem[]
}

// 相关问题类型
export interface RelatedQuestion {
  id: number
  userId: number
  user: QuestionUser
  title: string
  content: string
  researchArea: string
  createdAt: string
  answerNum: number
  likeNum: number
  followNum: number
  readNum?: number // 新增浏览量字段
  bestAnswerId: number
  bestAnswer: {
    id: number
    questionId: number
    answerId: number
    userId: number
    user: QuestionUser
    content: string
    createdAt: string
    likeNum: number
    isSelected: number
  } | null
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
    readNum?: number // 新增浏览量字段
    bestAnswerId: number
    bestAnswer: {
      id: number
      questionId: number
      answerId: number
      userId: number
      user: QuestionUser
      content: string
      createdAt: string
      likeNum: number
      isSelected: number
    } | null
  }
  answerWithReplies: AnswerWithReplies[]
  relatedQuestions: RelatedQuestion[]
  followed: boolean
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
  likeNum: number
  followNum: number
  readNum?: number // 新增浏览量字段
  bestAnswer?: QuestionAnswer
  answers: QuestionAnswer[]
  followed?: boolean
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
  questionId: string // 修正为questionId，与关注问题接口保持一致
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

// 活跃用户类型
// API返回的活跃用户数据格式
export interface ActiveUserApiItem {
  answerCount: number
  user: QuestionUser
}

export interface ActiveUser {
  id: number
  name: string
  email: string
  gender: string
  bio: string
  researchArea: string
  institution: string
  title: string
  imgUrl: string
  createdAt: string
  followerNum: number
  subjectNum: number
  publishNum: number
  likeNum: number
  readerNum: number
  answerCount: number // 添加回答数
} 