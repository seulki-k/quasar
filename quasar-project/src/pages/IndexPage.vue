<template>
  <div>
    <div style="height: 90vh">
      <q-carousel animated v-model="slide" arrows navigation infinite style="height: 100%">
        <!-- :name 은 q-carousel-slide에서 사용하는 속성으로 slide의 고유 이름 부여 여기서는 1로 부터 -->
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
          @click.left.shift="slide = 2"
        >
          <div align="center">
            <br />
            <input
              v-model="newUser.name"
              placeholder="name"
              @keydown.prevent="handleKeyDown"
            /><br />
            <input v-model="newUser.email" placeholder="email" />
            <br /><br />
            <hr />
            <q-btn color="primary" label="유저 등록" @click="axiosApiAdd" />
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          align="center"
          @click.left.shift="slide = 3"
        >
          <!-- 단일속성 값이 아닌 객체에는 약어 사용 불가능 -->
          <Qtable v-bind="propsData" @deleteData="deleteUser" />
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
      <q-btn color="primary" label="유저 정보 출력" @click="axiosApi" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import Qtable from 'src/components/QCustomTable.vue'

const deleteUser = (res) => {
  // 받은 데이터의 id 배열 설정
  const idsToDelete = res.value.map((item) => item.id)
  console.log('삭제할 데이터 ID 목록: ', idsToDelete)

  // 여러 개의 id에 대해 순차적으로 삭제 요청 보내기
  idsToDelete.forEach((id) => {
    api
      .delete(`/users/${id}`)
      .then((response) => {
        console.log(`ID ${id} 제거?=>`, response.data)
        axiosApi()
      })
      .catch((err) => {
        console.error(`ID ${id} 삭제 실패: `, err)
      })
  })
}

const newUser = ref([])

const data = ref([])

const axiosApi = async () => {
  await api
    .get('/users')
    .then((response) => {
      data.value = response.data
      console.log('res.data', response.data)
      console.log(data.value)
    })
    .catch((err) => {
      console.error(err)
    })
}

const slide = ref(1)

const axiosApiAdd = () => {
  api
    .post('/users', {
      name: newUser.value.name,
      email: newUser.value.email,
    })
    .then((response) => {
      console.log('등록완료 = ', response.data)
      console.log('name = ', newUser.value.name)
      console.log('email = ', newUser.value.email)
    })
    .catch((err) => {
      console.error(err)
    })

  newUser.value.name = ''
  newUser.value.email = ''
}
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
})

const propsData = ref({
  data,
  pagination,
})

const handleKeyDown = (e) => {
  if (e.key >= '0' && e.key <= '9') {
    alert('이름에 숫자는 입력 불가능합니다.')
    newUser.value.name = ''
  }
}
</script>
