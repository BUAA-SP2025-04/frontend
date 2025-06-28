import request from '@/utils/request'
import type { Comment, CreateCommentRequest } from '@/api/types/comment'


export function getPublicationComments(publicationId: number) {
  return request.get<Comment[]>(`/comment/publicationComment`, {
    params: {
      id: publicationId
    }
  })
}

export function createComment(comment: CreateCommentRequest) {
  return request.post('/comment/add', {
    content: comment.content,
    publicationId: comment.publicationId,
    parentId: comment.parentId,
    repliedUser: comment.repliedUser
  })
}

export function deleteComment(id: number) {
  return request.post(`/comment/delete`, {
    id: id
  })
}

export function likeComment(id: number) {
  return request.post(`/comment/like`, {
    id: id
  })
}

export function getReplyComments(id: number) {
  return request.get<Comment[]>(`/comment/replyComment`, {
    params: {
      id: id
    }
  })
}

export function getCommentById(id: number) {
  return request.get<Comment>(`/comment/getById`, {
    params: {
      id: id
    }
  })
}

export function disLikeComment(id: number) {
  return request.post(`/comment/dislike`, {
    id: id
  })
}
