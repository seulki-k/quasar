<template>
  <div>
  <div>
    <q-carousel animated v-model="slide" arrows navigation infinite style="height: 600px">
      <q-carousel-slide :name="1" style="background-color: skyblue">
        <table border="1px" align="center" style="background-color: white; width: 90%">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in data" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.title }}</td>
              <td>{{ user.body }}</td>
            </tr>
          </tbody>
        </table>
        <br />
      </q-carousel-slide>

      <q-carousel-slide :name="2" style="background-color: skyblue" align="center">
        <!-- 단일속성 값이 아닌 객체에는 약어 사용 불가능 -->
        <Qtable v-bind="propsData" @deleteData="deleteUser" />
      </q-carousel-slide>
      <q-carousel-slide :name="3" style="background-color: skyblue">
        <div align="center">
          <br />
          <input v-model="newUser.name" placeholder="name" /><br />
          <input v-mode="newUser.title" placeholder="title" /> <br />
          <input v-mode="newUser.body" placeholder="body" />
          <br /><br />
          <hr />
          <q-btn color="primary" label="유저 등록" @click="axiosApiAdd" />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
  <div align="center">
    <q-btn color="primary" label="유저 정보 출력" @click="axiosApi" />
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import Qtable from 'src/components/QCustomTable.vue'

const deleteData = ref([])

const deleteUser = (res) => {
  console.log('자식한테 받은 data==>', res.id)
  deleteData.value = res.id
  console.log(deleteData.value)
  api
    .delete('/posts/1')
    .then((response) => {
      console.log('제거?=>', response.data)
    })
    .catch((err) => {
      console.error(err)
    })
}
const newUser = ref([])

const data = ref([])
const slide = ref(1)

const axiosApiAdd = () => {
  api
    .post('/posts', {
      name: newUser.value.name,
      username: newUser.value.username,
      email: newUser.value.email,
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.error(err)
    })
}
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
})

const propsData = ref({
  data,
  pagination,
})

const axiosApi = () => {
  api
    .get('/posts')
    .then((response) => {
      data.value = response.data
      console.log("res.data", response.data)
      console.log(data.value)
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>