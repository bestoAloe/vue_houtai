<template>
  <Funcbar @addtheadmin="addToTable" :adjust="adjust" :fatherSign="fatherSign"/>
  <div>
    <el-table :data="tableData2.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
     style="width: 100%" max-height="447px">
      <el-table-column type="selection" width="60" />
      <el-table-column :prop="index" v-for="(item,index) in tableHeader" :key="index" :label="item.label" :width="item.kuandu" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope : any">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
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

      <!-- 对话框架：编辑用户 -->
      <el-dialog v-model="dialogFormVisible" title="添加用户">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.password" show-password />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-model="form.role" autocomplete="off" disabled="true"/>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.state" placeholder="请选择账号状态">
          <el-option label="正常" value="正常" />
          <el-option label="失效" value="失效" />
        </el-select>
      </el-form-item>
      <el-form-item label="其他" :label-width="formLabelWidth">
        <el-input v-model="form.other" autocomplete="off" disabled="true"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import Funcbar from '../../../components/fortable/Funcbar.vue';
import { onBeforeMount, ref, reactive} from 'vue';
import axios from 'axios';
import getAllApi from '../../../request/api/api'
import { useUserStore } from '../../../store/userinfo';
import { ElTable } from 'element-plus'

//添加和批量删除class的布局调整
const adjust = ref('adjust');
const fatherSign = ref("admin");

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
//点击
const handleClick = () => {
  console.log('click')
}

//数据展示
interface User {
  id: string,
  account: string,
  password: string,
  role: string,
  state: string,
  other:string
}

//表头
const tableHeader = {
  id: {
    label: "id",
    kuandu: "60px"
  },
  account: {
    label: "账号",
    kuandu: "120px"
  },
  password: {
    label: "密码",
    kuandu: "250px"
  },
  role: {
    label: "角色",
    kuandu: "120px"
  },
  state: {
    label: "状态",
    kuandu: "120px"
  },
  other: {
    label: "其他",
    kuandu: "120px"
  }

};

const tableData2 = ref<any>([])

//分页
const currentPage = ref(1)    //默认是1
const totalPage = ref(0);       //总页数，默认0
const pageSize = ref(10)      //每页默认10条数据
const small = ref(false)       //是否缩小，默认否

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  const pageNum = Math.ceil(totalPage.value / pageSize.value);
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
    url:getAllApi.getAdminList.url,    //如果因网络原因获取失败可以将最后的url替换成url2
    data:{
      token: getlocaltoken.token
    }
  }).then(res=>{
    tableData2.value = res.data.admin;
    totalPage.value = tableData2.value.length
    //console.log(res)
  })
})

//添加用户
function addToTable(val: { account: string; password: string; role: string; state: string; other: string; }) {
  const temp = reactive({
    id: tableData2.value.length + 1,
    account: val.account,
    password: val.password,
    role: val.role,
    state: val.state,
    other: val.other
  });
  tableData2.value.push(temp);
  totalPage.value = tableData2.value.length;
  //isUpdateTable();
  //console.log(tableData.value);
};

//暂时保存表中目标用户在数组中的位置，默认零
const tmp = ref<number>(0);

//编辑：用户对话框数据展示：
const form = reactive({
  account: '',
  password: '',
  role: 'admin',
  state: '',
  other: '暂定'
});

//编辑
const handleEdit = (row : User)=>{
  dialogFormVisible.value = true;
  form.account = row.account;
  form.password = row.password;
  form.state = row.state;
  tmp.value = tableData2.value.indexOf(row)
}

const editConfirm = ()=>{
  tableData2.value[tmp.value].account = form.account;
  tableData2.value[tmp.value].password = form.password;
  tableData2.value[tmp.value].state = form.state;
  dialogFormVisible.value = false;
}

//删除
const handleDelete = (row: User) => {
  tmp.value = tableData2.value.indexOf(row)
  //console.log("index" + index, "row" + row)
  //console.log(tmp)
  tableData2.value.splice(tmp.value, 1)
  totalPage.value = tableData2.value.length
};

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