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

// 项目类型
export interface Project {
  id: string
  title: string
  description: string
  owner: ProjectUser
  cooperators: ProjectUser[]
  collaborationCondition: string
  createAt: string
  researchArea: string
  startTime: string
  endTime: string
  recruitNum: number
  recruitedNum: number
  applyNum: string
  contact: string
}

// 申请类型
export interface Application {
  id: string
  applicant: ProjectUser
  createAt: string
  status: string
  reason: string
  experience: string
  contact: string
  time: string
}

// 带申请信息的项目类型
export interface ProjectWithApplications extends Project {
  applications: {
    application: Application
  }[]
}

// 申请详情类型
export interface ApplicationDetail {
  id: string
  createAt: string
  project: {
    id: string
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
  id: string
  title: string
  description: string
  collaborationCondition: string
  researchArea: string
  startTime: string
  endTime: string
  recruitNum: number
  urgent: boolean
  status: string
  contact: string
}

// 删除项目请求体
export interface DeleteProjectRequest {
  projectId: string
}

// 申请加入项目请求体
export interface ApplyProjectRequest {
  projectId: string
  reason: string
  experience: string
  contact: string
  workTime: string
}

// 取消申请请求体
export interface CancelApplicationRequest {
  applicationId: string
}

// 处理申请请求体
export interface HandleApplicationRequest {
  applicationId: string
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
