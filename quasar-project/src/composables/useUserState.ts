import { ref } from 'vue'
import { api } from 'src/boot/axios'
import swal from 'sweetalert'

export interface UserData  {
  id: number
  name: string  
  email: string
}
export type AddUserData = {
  name: string
  email: string
}

export const data = ref<UserData[]>([])

export const newUser = ref<AddUserData>({ name: '', email: '' })
export const updateUserData = ref<UserData>({id: 0 , name: '', email: '' })

export const fetchUsers = async () => {
  try {
    const response = await api.get<UserData[]>('/users')
    data.value = response.data
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}
export const addUser = async () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(newUser.value.email)) {
        swal('올바른 이메일 주소를 입력해주세요.','','warning');
        return;
      }
    await api.post('/users', {
      name: newUser.value.name,
      email: newUser.value.email,
    })
    .then((res)=>{
      newUser.value.name = ''
      newUser.value.email = ''
      swal(res.data.message,'','success')
      fetchUsers()
    })
    .catch(err => {
      swal(err.response.data.paramErrors[0].reason, '', 'error')
    })
}
// 사용자 변경
export const updateUser = async() =>{
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(updateUserData.value.email)) {
    swal('올바른 이메일 주소를 입력해주세요.','','warning');
    return;
  }
    await api.put('/users',{
      id : updateUserData.value.id,
      name: updateUserData.value.name,
      email: updateUserData.value.email,
    })
    .then((res)=>{
      newUser.value.name = ''
      newUser.value.email = ''
      swal(res.data.message, '', 'success')
      fetchUsers()
    })
    .catch(err=>{
      swal(err.response.data.paramErrors[0].reason, '', 'error')
    })
}
export const deleteUser = async (idsToDelete: number[]) => {

  console.log("삭제 시 받은 값",idsToDelete)
  for (const id of idsToDelete) {
    await api.delete(`/users/${id}`)
  }
  swal('해당 유저를 삭제하였습니다', '', 'success')
  await fetchUsers()

}
