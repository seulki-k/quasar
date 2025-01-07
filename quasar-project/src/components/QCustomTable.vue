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
      <span v-for="(x, index) in sortSelected" :key="index">[{{ x.id }}번]&nbsp; </span><br />
      <q-btn color="pink" @click="deleteUser">선택된 유저 삭제</q-btn>
    </div>
  </template>

  <script setup>
  import { defineProps, ref, defineEmits, computed } from 'vue'

  const selected = ref([])
  // computed 속성은 Vue.js에서 반응형 데이터를 계산된 값으로 제공하기 위한 기능
  const sortSelected = computed(() => {
    return [...selected.value].sort((a, b) => a.id - b.id)
  })

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

    console.log("보낼 값22 => " ,childData.selected.value[0].name)
    emit('deleteData', childData.selected)
  }

  const columns = [
    { name: 'id', label: 'ID', align: 'left', field: 'id', style: { width: '100px' } },
    { name: 'name', label: 'Name', align: 'left', field: 'name' },
    { name: 'email', label: 'Email', align: 'left', field: 'email' },
  ]
  </script>

  <style></style>
