import request from '@/utils/request'
import type {
  AddProjectRequest,
  ApplicationsResponse,
  ApplyProjectRequest,
  CancelApplicationRequest,
  DeleteProjectRequest,
  EmptyResponse,
  HandleApplicationRequest,
  ProjectsResponse,
  ProjectWithApplicationsResponse,
  UpdateProjectRequest,
  InviteLinkResponse,
  AcceptInviteRequest,
} from '../types/project'

// 添加项目
export function addProject(data: AddProjectRequest): Promise<EmptyResponse> {
  return request.post('/project/add', data)
}

// 获取所有项目
export function getAllProjects(): Promise<ProjectsResponse> {
  return request.get('/project/getAll')
}

// 删除项目
export function deleteProject(data: DeleteProjectRequest): Promise<EmptyResponse> {
  return request.post('/project/delete', data)
}

// 获取某科研人员的项目
export function getUserProjects(userId: string): Promise<ProjectsResponse> {
  return request.get(`/project/${userId}`)
}

// 申请加入项目
export function applyProject(data: ApplyProjectRequest): Promise<EmptyResponse> {
  return request.post('/project/application', data)
}

// 取消申请加入项目
export function cancelApplication(data: CancelApplicationRequest): Promise<EmptyResponse> {
  return request.post('/project/cancelApplication', data)
}

// 处理加入申请
export function handleApplication(data: HandleApplicationRequest): Promise<EmptyResponse> {
  return request.post('/application/handle', data)
}

// 获取我创建的项目及其申请
export function getMyProjectsWithApplications(): Promise<ProjectWithApplicationsResponse> {
  return request.get(`/project/myProject`)
}

// 更新项目
export function updateProject(data: UpdateProjectRequest): Promise<EmptyResponse> {
  return request.post('/project/update', data)
}

// 获取我的申请
export function getMyApplications(): Promise<ApplicationsResponse> {
  return request.get('/application/getAll')
}

// 退出项目
export function cancelJoinProject(data: { projectId: number }): Promise<EmptyResponse> {
  return request.post('/project/cancelJoin', data)
}

// 获取我加入的项目
export function getMyJoinedProjects(): Promise<ProjectsResponse> {
  return request.get('/project/getMyJoined')
}

// 获取我的项目（包含申请信息）
export function getMyProjects(): Promise<ProjectWithApplicationsResponse> {
  return request.get('/project/myProject')
}

// 获取项目邀请链接
export function getInviteLink(params: { projectId: number }): Promise<InviteLinkResponse> {
  return request.get('/project/inviteOthers', { params })
}

//接受项目邀请
export function acceptInvite(data: AcceptInviteRequest): Promise<EmptyResponse> {
  return request.get('/project/join', { params: data })
}
