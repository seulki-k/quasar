import { api } from '../boot/axios';
import {CreateUserDto, FetchUserDto} from '../dto/user.dto'
import swal from 'sweetalert'

export const getAllUsers = async ()=> {
  try {
    const response = await api.get('/users');
    // response.data.message가 없으면 기본 메시지를 설정
    const message = response.data.message || '사용자 목록을 성공적으로 조회했습니다.';
    swal(message, '', 'success');
    return response.data; // 데이터를 반환합니다.
  } catch (err) {
   console.error('eer',err)
  }
};

export const createUser = async (data: CreateUserDto) => {
  return (await api.post('/users', data)).data;
};

export const updateUser = async (id: number, data: FetchUserDto) => {
  return (await api.put(`/users/${id}`, data)).data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};
