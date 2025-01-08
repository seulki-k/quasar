
<script setup lang="ts">
import {  ref } from 'vue'
import { updateUser,updateUserData } from 'src/composables/useUserState';

const selected = ref([])
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

const deleteUser = () => {
  const childData = {
    selected,
  }
  emit('deleteData', childData.selected)
}


const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', style: { width: '100px' } },
  { name: 'name', label: 'Name', align: 'left', field: 'name' },
  { name: 'email', label: 'Email', align: 'left', field: 'email' },
]
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="user"
      :rows="data"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
      flat
      bordered
      style="width: 90%"
      selection="multiple"
      v-model:selected="selected"
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

    <q-btn color="pink" @click="updateUser">선택된 유저 변경</q-btn>
    <hr>
    <q-btn color="pink" @click="deleteUser">선택된 유저 삭제</q-btn>
  </div>
</template>


<style></style>
