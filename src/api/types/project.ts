// 项目相关类型定义

// 用户信息类型
export interface ProjectUser {
  id: number
  name: string
  researchArea: string
  title: string
  imgUrl: string
  institution: string
  createdAt: string
}

// 申请者类型（实际后端返回）
export interface Applicant {
  id: number
  name: string
  gender: string
  bio: string | null
  researchArea: string | null
  institution: string
  title: string | null
  imgUrl: string
  email: string
  createdAt: number
  followerNum: number
  subjectNum: number
  publishNum: number
}

// 合作者类型
export interface Cooperator {
  id: number
  name: string
  imgUrl: string
  institution: string
  researchArea: string
  title: string
  createdAt: string
}

// 申请应用类型
export interface ApplicationApplication {
  id: string
  applicant: Applicant
  contact: string
  createAt: string
  experience: string
  reason: string
  status: string
  workTime: string
}

// 申请元素类型
export interface ApplicationElement {
  application: ApplicationApplication
}

// 项目类型（我的项目接口返回 - 实际数据结构）
export interface MyProject {
  id: number
  title: string
  description: string
  cooperators: Cooperator[]
  collaborationCondition: string
  createdAt: string
  researchArea: string
  startTime: string
  endTime: string
  recruitNum: number
  recruitedNum: number
  applyNum: string
  contact: string
  applications: Application[]
}

// 我的项目响应类型
export interface MyProjectsResponse {
  projects: MyProject[]
}

// 项目类型
export interface Project {
  id: number
  title: string
  description: string
  owner: ProjectUser
  cooperators: ProjectUser[]
  collaborationCondition: string
  researchArea: string
  startTime: string
  endTime: string
  recruitNum: number
  createdAt: string
  recruitedNum: number
  applyNum: string
  contact: string
  projBelongings: number
}

// 申请类型（实际后端返回）
export interface Application {
  id: number
  applicant: Applicant
  createdAt: string
  status: string
  reason: string
  experience: string
  contact: string
  workTime: string
}

// 带申请信息的项目类型
export interface ProjectWithApplications extends Project {
  applications: {
    application: Application
  }[]
}

// 申请详情类型
export interface ApplicationDetail {
  id: number
  createdAt: string
  project: {
    id: number
    title: string
    description: string
    collaborationCondition: string
    createAt: string
    researchArea: string
    startTime: string
    endTime: string
    recruitNum: number
    recruitedNum: number
    applyNum: string
    contact: string
    owner: ProjectUser
  }
  status: string
  reason: string
  experience: string
  contact: string
  time: string
}

// 添加项目请求体
export interface AddProjectRequest {
  title: string
  description: string
  collaborationCondition: string
  researchArea: string
  startTime: string
  endTime: string
  recruitNum: number
  contact: string
}

// 更新项目请求体
export interface UpdateProjectRequest {
  id: number
  title: string
  description: string
  collaborationCondition: string
  researchArea: string
  startTime: string
  endTime: string
  recruitNum: number
  status: string
  contact: string
}

// 删除项目请求体
export interface DeleteProjectRequest {
  projectId: number
}

// 申请加入项目请求体
export interface ApplyProjectRequest {
  projectId: number
  reason: string
  experience: string
  contact: string
  workTime: string
}

// 取消申请请求体
export interface CancelApplicationRequest {
  applicationId: number
}

// 处理申请请求体
export interface HandleApplicationRequest {
  applicationId: number
  accept: boolean
}

// API响应类型
export interface ProjectsResponse {
  code: string
  message: string
  data: Project[]
}

export interface ProjectWithApplicationsResponse {
  code: string
  message: string
  data: ProjectWithApplications[]
}

export interface ApplicationsResponse {
  code: string
  message: string
  data: ApplicationDetail[]
}

export interface EmptyResponse {
  code: string
  message: string
  data: unknown
}
