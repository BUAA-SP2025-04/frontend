import request from '@/utils/request'
import type {
  AddProjectRequest,
  UpdateProjectRequest,
  DeleteProjectRequest,
  ApplyProjectRequest,
  CancelApplicationRequest,
  HandleApplicationRequest,
  ProjectsResponse,
  ProjectWithApplicationsResponse,
  ApplicationsResponse,
  EmptyResponse,
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

// 检索项目
export function searchProjects(title: string): Promise<ProjectsResponse> {
  return request.get(`/project/getByTitle/${title}`)
}
