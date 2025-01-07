import { ref } from 'vue';
import { api } from 'src/boot/axios';
import swal from 'sweetalert';

export type UserData = {
    id: number;
    name: string;
    email: string;
};

export function useUserState() {
    const data = ref<UserData[]>([]);
    const newUser = ref({ name: '', email: '' });

    const fetchUsers = async () => {
        try {
            const response = await api.get<UserData[]>('/users');
            data.value = response.data;

        } catch (err) {
            console.error('Error fetching users:', err);

        }
    };

    const addUser = async () => {
        try {
            await api.post('/users', {
                name: newUser.value.name,
                email: newUser.value.email,
            });
            newUser.value.name = '';
            newUser.value.email = '';
            swal('유저 등록 성공!', '', 'success')
        } catch (err) {
            console.error('Error adding user:', err);
            swal('유저 등록 실패!', '', 'warning')
        }
    };

    const deleteUser = async (idsToDelete: number[]) => {
        try {
            for (const id of idsToDelete) {
                await api.delete(`/users/${id}`);
            }
            await fetchUsers();
        } catch (err) {
            console.error('Error deleting users:', err);
        }
    };

    return {
        data,       // 사용자 데이터 상태
        newUser,    // 새 사용자 입력 필드
        fetchUsers, // 사용자 데이터 조회
        addUser,    // 사용자 추가
        deleteUser, // 사용자 삭제
    };
}
