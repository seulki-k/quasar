<template>
  <div>
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
  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios'
const data = ref([])
const axiosApi = async() => {
  await api
    .get('/users')
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
