import { api } from '../boot/axios';
import {CreateUserDto, FetchUserDto} from '../dto/user.dto'

export const getAllUsers = async ()=> {
  return (await api.get('/users')).data;
};

export const createUser = async (data: CreateUserDto) => {
  return (await api.post('/users', data)).data;
};

export const updateUser = async (data: FetchUserDto) => {
  return (await api.put(`/users`, data)).data;
};

export const deleteUser = async (id: number) => {
  return (await api.delete(`/users/${id}`)).data
};

