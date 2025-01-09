import { ref } from 'vue'
import { api } from 'src/boot/axios'
import swal from 'sweetalert'

export interface UserData  {
  id: number
  name: string
  email: string
}
export type addUserData = {
  name: string
  email: string
}

// // 또 다른 타입 정하기 - 플러그인? 셋팅필요
// /**
//  * @param {number} a
//  * @param {number} b
//  */
// const sum = (a, b) => {
//   return a + b;
// };

// 사용자 상태 정의 - ref<UserData[]>([]) 제네릭 사용하여 타입을 UserData 배열로 정의
export const data = ref<UserData[]>([])

// 사용자 등록 정의 - id는  auto_increment 속성 부여하여 등록할 떄 필요X
export const newUser = ref<addUserData>({ name: '', email: '' })
export const updateUserData = ref<UserData>({id: 0 , name: '', email: '' })

// 사용자 데이터 조회
export const fetchUsers = async () => {
  try {
    const response = await api.get<UserData[]>('/users')
    data.value = response.data
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}
// 사용자 추가
export const addUser = async () => {
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
      swal(err.response.data.message, '', 'error')
    })
}
// 사용자 변경
export const updateUser = async() =>{

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
      swal(err.response.data.message, '', 'error')
    })
}
// 사용자 삭제
export const deleteUser = async (idsToDelete: number[]) => {

  console.log("삭제 시 받은 값",idsToDelete)
  for (const id of idsToDelete) {
    await api.delete(`/users/${id}`)
  }
  swal('해당 유저를 삭제하였습니다', '', 'success')
  await fetchUsers()

}
