import swal from 'sweetalert';

import {getAllUsers, createUser, updateUser, deleteUser} from 'src/api/userApi'

import type { FetchUserDto, CreateUserDto } from 'src/dto/user.dto'

import { useCreateUserData } from 'src/hook/createUserData';
import { useUpdateUserData } from 'src/hook/updateUserData'

const { setCreateUserData, getCreateUserData } = useCreateUserData();
const { setUpdateUserData, getUpdateUserData } = useUpdateUserData();


export const addUser = async (userData: CreateUserDto) => {
  try {
    setCreateUserData(userData);
    const res = await createUser(getCreateUserData());
    swal(res.message, "", "success");
  } catch (err) {
    const errorMessage = err.response.data.paramErrors
      .map((data: { reason: string }) => data.reason)
      .join(", ");
    swal(errorMessage, "", "error");
  }
};

export const fetchUsers = async (): Promise<FetchUserDto[] | void> => {
  try {
    const res = await getAllUsers();
    console.log(res.data);
    swal(res.message, "", "success");
    return res.data; // 이 데이터를 반환
  } catch (err) {
    swal(err.response.data.paramErrors.reason);
    return; // 오류 발생 시 void 반환
  }
};

export const updateUsers = async(data : FetchUserDto) =>{
  try{
    setUpdateUserData(data)
    const res = await updateUser(getUpdateUserData())
    swal(res.message, "", "success");
  }catch (err){
    const errorMessage = err.response.data.paramErrors.map(data => data.reason).join(', ')
    swal(errorMessage, "", "error");
  }
}

export const deleteUsers = async(data : number) => {
  try{
    const res = await deleteUser(data)
    swal(res.message, "", "success");
  }catch(err){
    swal(err.reason, "", "error");
  }
}
