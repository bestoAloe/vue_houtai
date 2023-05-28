<template>
  <div>
    <el-text class="mx-1">角色：</el-text>
    <el-select v-model="whichRole"  placeholder="选择角色">
      <el-option v-for="(item,index) in rolelist" :key="index" :label="item.label" :value="item.rolensign" @click="whichPer"/>
    </el-select>
  </div>
  <div>
    <el-tree
      ref="treeRef"
      :data="data"
      show-checkbox
      node-key="id"
      highlight-current
      :default-expanded-keys="[2, 3]"
      :props="defaultProps"
    />
  </div>
  <div>
    <el-button type="success" size="small">保存</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElTree } from 'element-plus'

// import axios from 'axios';
// import getAllApi from '../../request/api/api'
// import { useUserStore } from '../../store/userinfo';
// import { ElTable } from 'element-plus';

const whichRole = ref('');
const rolePer = ref([0]);

const treeRef = ref<InstanceType<typeof ElTree>>()

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

//各角色权限分配
const normalUserPro = [5,8];
const adminPro = [1,2,3];

function whichPer(){
  // if(rolePer.value.length != 0){
  //   rolePer.value = [];
  // }

  // if(whichRole.value == 'normaluser'){
  //   rolePer.value = normalUserPro;
  // }else if(whichRole.value == 'admin'){
  //   rolePer.value = adminPro
  // }else{
  //   rolePer.value = [];
  // }

  switch(whichRole.value){
    case 'admin':
      treeRef.value!.setCheckedKeys(adminPro, false)
      //rolePer.value = adminPro;
      //console.log(rolePer.value);
      break;
    case 'normaluser':
      treeRef.value!.setCheckedKeys(normalUserPro, false)
      //rolePer.value = normalUserPro;
      //console.log(rolePer.value);
      break;
  }
}

const defaultProps = {
  children: 'children',
  label: 'label',
};

//权限列表
const data : Tree[] = [
  {
    id: 1,
    label: '首页',
  },
  {
    id: 2,
    label: '用户管理',
    children: [
      {
        id: 5,
        label: '用户列表',
      },
      {
        id: 6,
        label: '管理员列表',
      },
    ],
  },
  {
    id: 3,
    label: '权限管理',
    children: [
      {
        id: 7,
        label: '权限列表',
      },
      {
        id: 8,
        label: '角色列表',
      },
    ],
  },
];

//角色列表
const rolelist = reactive([
  {
    rolensign: 'normaluser',
    label: '普通用户'
  },
  {
    rolensign: 'admin',
    label: '管理员'
  },
]);

</script>