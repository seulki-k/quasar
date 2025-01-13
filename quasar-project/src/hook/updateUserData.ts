import { ref } from 'vue';
import type { FetchUserDto } from 'src/dto/user.dto';

export const useUpdateUserData = () => {
    const userFormData = ref<FetchUserDto>({ id :0,name: '', email: '' });

    const setUpdateUserData = (data : FetchUserDto) => {
       userFormData.value =data
    }

  const getUpdateUserData = () => {
      return userFormData.value
  }

  return{
    setUpdateUserData,
    getUpdateUserData
  }
}
