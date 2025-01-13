<script lang="ts" setup>
import { ref } from 'vue'

import type { FetchUserDto, CreateUserDto } from 'src/dto/user.dto'

import { addUser, fetchUsers, updateUsers, deleteUsers } from 'src/service/userService'

const userFormData  = ref<CreateUserDto>({name :'', email : ''})
const userData = ref<FetchUserDto[]>([])

const slide = ref(1)

const selectedUser = ref<FetchUserDto | null>(null);
const change = ref(true)

const fetchUser = async () =>{
  userData.value =  await fetchUsers()
}

const updateUser = () =>{
  updateUsers({
    id : selectedUser?.value.id,
    name : userFormData.value.name,
    email : userFormData.value.email
  })
    updateBtn()
}

const deleteUser = () =>{
  deleteUsers(selectedUser?.value.id)
  closeModal()
}

const updateBtn = () => {
  change.value = !change.value;
}

const showModal = ref(false);

const openModal = (user: FetchUserDto) => {
  selectedUser.value = user;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedUser.value = null;
  change.value=true
};

</script>

<template>
  <div>
    <div style="height: 90vh">
      <q-carousel animated v-model="slide" arrows navigation infinite style="height: 100%">
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
          @click.left.shift="slide = 2"
        >
          <div align="center">
            <br />
            <input v-model="userFormData.name" type="name" placeholder="강슬기" /><br />
            <input v-model="userFormData.email" type="email" placeholder="skbb11@naruint.com" required/>
            <br /><br />
            <hr />
            <q-btn color="primary" label="유저 등록" @click="addUser(userFormData)" />
          </div>
        </q-carousel-slide>


        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
          @click.left.shift="slide = 1"
        >
        <div>
          <div align="center">
            <q-btn color="primary" label="유저 정보 갱신" @click="fetchUser" style="margin-right: 10px;"/>

          </div>
          <hr/>
          <table border="1px" align="center" style="background-color: white; width: 90%">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userData" :key="user.id" >
                <td><a href="#" @click.prevent="openModal(user)">{{ user.id }}</a></td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
          <br />

        <div v-if="showModal" class="modal-overlay">
          <div class="modal">
            <h2>유저 정보</h2>
            <p><strong>ID:</strong> {{ selectedUser?.id }}</p>
            <p><strong>Name:</strong>
              <input v-if="!change" v-model="userFormData.name" type="name" :placeholder="selectedUser?.name" />
              <strong v-if="change">{{ selectedUser?.name }}</strong></p>
            <p><strong>Email:</strong>
              <input v-if="!change" v-model="userFormData.email" type="name" :placeholder="selectedUser?.email" />
              <strong v-if="change">{{ selectedUser?.email }}</strong></p>
            <q-btn v-if="change" color="primary" label="변경 모드" @click="updateBtn" style="margin-right: 10px;"/>
            <q-btn v-if="!change" color="primary" label="유저 변경" @click="updateUser" style="margin-right: 10px;"/>
            <q-btn color="primary" label="유저 삭제" @click="deleteUser" style="margin-right: 10px;"/>
            <q-btn @click="closeModal" >닫기</q-btn>
          </div>
        </div>
        </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    출
  </div>
</template>
<style scoped>
/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); /* 배경을 어두운 반투명으로 */
  z-index: 999;
}

/* 모달 콘텐츠 스타일 */
.modal {
  background-color: #fff; /* 불투명한 흰색 배경 */
  padding: 20px; /* 적당한 패딩 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  width: 350px; /* 너비를 350px로 설정 */
  max-width: 90%; /* 최대 너비를 화면의 90%로 설정 */
  min-width: 250px; /* 최소 너비를 250px로 설정 */
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 추가 */
}

/* 모달 내부 텍스트 스타일 */
.modal h2 {
  margin-bottom: 20px; /* 제목과 본문 간의 여백 */
}

.modal p {
  margin: 10px 0; /* 각 항목 사이의 여백 */
}

.modal button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #45a049;
}
</style>
