<script lang="ts" setup>
import { ref } from 'vue';
import { useUserState } from 'src/composables/useUserState';
import Qtable from 'src/components/QCustomTable.vue';

// 상태 및 API 호출 로직 가져오기
const { data, newUser, fetchUsers, addUser, deleteUser } = useUserState();

const slide = ref(1);
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key >= '0' && e.key <= '9') {
    alert('이름에 숫자는 입력 불가능합니다.');
    e.preventDefault();
  }
};

const handleDelete = (res: { value: { id: number }[] }) => {
  const idsToDelete = res.value.map((item) => item.id);
  deleteUser(idsToDelete);
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
            <input
              v-model="newUser.name"
              placeholder="name"
              @keydown="handleKeyDown"
            /><br />
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
      <q-btn color="primary" label="유저 정보 출력" @click="fetchUsers" />
    </div>
  </div>
</template>
