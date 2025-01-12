<script lang="ts" setup>
import { ref } from 'vue'

import Qtable from 'src/components/QCustomTable.vue'
import type { AddUserData } from 'src/composables/useUserState'
import { data, newUser, fetchUsers, addUser, deleteUser } from 'src/composables/useUserState'
import swal from 'sweetalert'

import {getAllUsers} from 'src/api/userApi'

 
// eslint-disable-next-line
const def = ref<AddUserData[]>([])

const slide = ref(1)
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key >= '0' && e.key <= '9') {
    alert('이름에 숫자는 입력 불가능합니다.')
    e.preventDefault()
  }
}

const handleDelete = (res: { value: { id: number }[] }) => {

  const idsToDelete = res.value.map((item) => item.id)
  if(idsToDelete.length < 1){
    swal("선택된 유저가 없습니다.",'','error')
  }else{
    deleteUser(idsToDelete)
  }
}
 getAllUsers()
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
            <input v-model="newUser.name" placeholder="name" @keydown="handleKeyDown" /><br />
            <input v-model="newUser.email" type="email" placeholder="email" required/>
            <br /><br />
            <hr />
            <q-btn color="primary" label="유저 등록" @click="addUser" />
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          align="center"
          @click.left.shift="slide = 3"
        >
          <Qtable :data="data" :pagination="pagination" @deleteData="handleDelete" />
        </q-carousel-slide>

        <q-carousel-slide
          :name="3"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
          @click.left.shift="slide = 1"
        >
          <table border="1px" align="center" style="background-color: white; width: 90%">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in data" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div align="center">
      <q-btn color="primary" label="유저 정보 갱신" @click="fetchUsers" />
    </div>
    출
  </div>
</template>
