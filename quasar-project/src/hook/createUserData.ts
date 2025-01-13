import { ref } from 'vue';
import type { CreateUserDto } from 'src/dto/user.dto';

export const useCreateUserData = () => {
  const userFormData = ref<CreateUserDto>({ name: '', email: '' });

  const setCreateUserData = (data: CreateUserDto) => {
    userFormData.value = data;
  };

  const getCreateUserData = () => {
   return userFormData.value
  }
  return {
    setCreateUserData,
    getCreateUserData,
  };
};
