
<script setup lang="ts">
import {  ref } from 'vue'
import { updateUser,updateUserData } from 'src/composables/useUserState';
import swal from 'sweetalert'

const selectedData = ref([])
// computed 속성은 Vue.js에서 반응형 데이터를 계산된 값으로 제공하기 위한 기능

// 부모로부터 props 값 받아오기
const { data, pagination } = defineProps({
  data: {
    type: Array,
    required: true,
  },
  pagination: {
    type: Object, // 데이터 타입
    required: true, // 필수 값 여부
  },
})

const emit = defineEmits([])

const deleteUserData = () => {
  console.log("삭제 시 보낸 값", selectedData.value)
  emit('deleteData', selectedData)
  selectedData.value = []
}


const columnData = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', style: { width: '100px' } },
  { name: 'name', label: 'Name', align: 'left', field: 'name' },
  { name: 'email', label: 'Email', align: 'left', field: 'email' },
]


// 선택된 유저가 여러 명일 때 경고 창 띄우는 함수
const handleUpdateUser = () => {
  if (selectedData.value.length !== 1) {
    // 선택된 유저가 2명 이상이면 경고창 띄우기
    swal('한 명의 유저를 선택해야 합니다.','' ,'warning');
    updateUserData.value = {
      id: 0,
      name: '',
      email: ''
    };
    selectedData.value = []
    return; // 추가 작업을 하지 않음
  }
  updateUserData.value.id = selectedData.value[0].id
  // selected.length가 1일 때만 유저 업데이트 함수 호출
  updateUser()
  updateUserData.value = {
  id: 0,
  name: '',
  email: ''
};
}
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="user"
      :rows="data"
      :columns="columnData"
      :pagination="pagination"
      :rows-per-page-options="[3, 5, 7]"
      row-key="id"
      flat
      bordered
      style="width: 90%"
      selection="multiple"
      v-model:selected="selectedData"
    />
    <hr>
    <p>
      <label for="name" style="color:blue;"><b>이름 : </b></label>
      <input v-model="updateUserData.name" id="name" placeholder="홍길동" type="text">
    </p>
    <p>
    <label for="email" style="color: blue;"><strong>  이메일 : </strong></label>
    <input v-model="updateUserData.email" id="email" placeholder="홍길동@naver.com" type="text">
    </p>

    <q-btn color="pink" @click="handleUpdateUser">선택된 유저 변경</q-btn>
    <hr>
    <q-btn color="pink" @click="deleteUserData">선택된 유저 삭제</q-btn>
  </div>
</template>


<style></style>
