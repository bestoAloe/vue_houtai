<template>
  <Funcbar :adjust="adjust"/>
  <div>
    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
     style="width: 100%" max-height="447px">
      <el-table-column type="selection" width="60" />
      <el-table-column fixed prop="id" label="id" width="80" />
      <el-table-column prop="rolename" label="角色名称" width="120" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="other" label="其他" width="120" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleClick">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @current-change = "handleCurrentChange"
      @size-change = "handleSizeChange"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script setup lang="ts">
import Funcbar from '../../components/fortable/Funcbar.vue';
import { onBeforeMount, ref, reactive} from 'vue';
import axios from 'axios';
import getAllApi from '../../request/api/api'
import { useUserStore } from '../../store/userinfo';
import { ElTable } from 'element-plus'

//添加和批量删除class的布局调整
const adjust = ref('adjust')

//点击
const handleClick = () => {
  console.log('click')
}

//数据展示
interface User {
  id: string,
  rolename: string,
  state: string,
  other :string
}

const tableData = ref([])

//分页
const currentPage = ref(1)    //默认是1
const totalPage = ref(0);       //总页数，默认0
const pageSize = ref(10)      //每页默认10条数据
const small = ref(false)       //是否缩小，默认否

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  const pageNum = totalPage.value / pageSize.value
  if (val > pageNum) {
    currentPage.value = pageNum
  }else{
    currentPage.value = val
  }
}

onBeforeMount(async ()=>{
  //axios获取后端数据
  const getlocaltoken = useUserStore();
  await axios({
    method:'post',
    url:getAllApi.getRoleList.url,  //如果因网络原因获取失败可以将最后的url替换成url2
    data:{
      token: getlocaltoken.token
    }
  }).then(res=>{
    tableData.value = res.data.rolelist;
    totalPage.value = tableData.value.length
    //console.log(tableData.value.length)
  })
})


//多选
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])

const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row,true)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
</script>