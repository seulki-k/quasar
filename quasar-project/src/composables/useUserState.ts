import { ref } from 'vue'
import { api } from 'src/boot/axios'
import swal from 'sweetalert'

export type UserData = {
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
export const updateUserData = ref<UserData>({id: null , name: '', email: '' })

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
  try {
    await api.post('/users', {
      name: newUser.value.name,
      email: newUser.value.email,
    })
    newUser.value.name = ''
    newUser.value.email = ''
    swal('유저 등록 성공!', '', 'success')
  } catch (err) {
    console.error('Error adding user:', err)
    swal('유저 등록 실패!', '', 'warning')
  }
}
// 사용자 변경
export const updateUser = async() =>{
  console.log('변경할 유저 =>', updateUserData.value)
  try {

    await api.put('/users',{
      id : updateUserData.value.id,
      name: updateUserData.value.name,
      email: updateUserData.value.email,
    })
    newUser.value.name = ''
    newUser.value.email = ''
    swal('유저 변경 성공!', '', 'success')
  }catch (err) {
    console.error('Error adding user:', err)
    swal('유저 변경 실패!', '', 'warning')
  }
}
// 사용자 삭제
export const deleteUser = async (idsToDelete: number[]) => {
  try {
    for (const id of idsToDelete) {
      await api.delete(`/users/${id}`)
    }
    await fetchUsers()
  } catch (err) {
    console.error('Error deleting users:', err)
  }
}
