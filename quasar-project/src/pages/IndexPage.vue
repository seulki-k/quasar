<script lang="ts" setup>
import { ref } from 'vue'

import Qtable from 'src/components/QCustomTable.vue'
import type { UserData, addUserData } from 'src/composables/useUserState'
 // data, newUser 등은 useUserState랑 연동되어 있다.
 // import 받지 않고 import한 UserData 등의 값을 사용하여 const data = ref<UserData[]>() 선언하면 동작하지 않는다.
import { data, newUser, fetchUsers, addUser, deleteUser } from 'src/composables/useUserState'
import swal from 'sweetalert'

// useUserState에서 생성한 UserData 을 제네릭을 사용하여 타입 정의
// eslint-disable-next-line
const abc = ref<UserData[]>([])
// eslint-disable-next-line
const def = ref<addUserData[]>([])

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
// res : value[] 속성 존재해야 한다. , id : number - 숫자 타입 지정
// 들어온 값 ex) {id: 74, name: 'Lee Hyunwoo', email: 'hyunwoo.lee@example.com'}
// 끊어서 해석 vlaue : {id : number} =>  value는 id:number 타입의 값을 갖는다.
// value[] 배열이다. => res.value는 id는 number 타입을 갖는 배열이다.
const handleDelete = (res: { value: { id: number }[] }) => {
  // idsToDelete는 배열이다.
  // res.value에서 id 값을 추출하여 배열로 생성.
  const idsToDelete = res.value.map((item) => item.id)
  if(idsToDelete.length < 1){
    swal("선택된 유저가 없습니다.",'','error')
  }else{
    deleteUser(idsToDelete)
  }

}
// 처음 페이지 리디렉션될 때 유저 정보 갱신
fetchUsers()
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
            <input v-model="newUser.email" placeholder="email" />
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
        <!-- data 값은 처음 45번째 줄에서 fetchUsers() 호출되며 값을 갖고 온다.-->
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
              <!-- v-for 문 사용하여 data배열의 객체들을 user에 저장하여 출력 구분자 key는 id-->
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
