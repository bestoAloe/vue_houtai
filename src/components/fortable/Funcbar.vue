<template>
  <div :class="propList.adjust">
    <div class="funcleft">
      <el-button type="primary" plain @click = "dialogFormVisible = true">添加用户</el-button>
      <el-button type="danger" plain>批量删除</el-button>
    </div>
    <div class="funcright">
      <el-input
      v-model="input2"
      class="w-50 m-2"
      placeholder="搜索"
      :suffix-icon="Search"
    />
    </div>
  </div>
  
  <!-- 对话框架：添加用户 -->
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
        <el-button type="primary" @click="goFatherAdd">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Search } from '@element-plus/icons-vue';

const propList= defineProps({
  adjust: String,
  fatherSign: String
})

const input2 = ref('')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

//添加用户对话框数据
const form = reactive({
  account: '',
  password: '',
  role: propList.fatherSign,
  state: '',
  other: '暂定'
})

//清空form为初始值
function formnull(){
  //dialogFormVisible.value = false
  form.account = '';
  form.password = '';
  form.state = '';
}

//传输给父组件
const emit = defineEmits(["addtheuser","addtheadmin"])

//添加用户
function goFatherAdd(){
  emit(propList.fatherSign == 'normaluser' ? "addtheuser" : "addtheadmin",form);
  dialogFormVisible.value = false;
  formnull();
}

</script>

<style scoped>
.adjust{
  height: 30px;
  width: 100%;
  align-items: center;
}

.funcleft{
  position: relative;
  float: left;
  margin: 20px;
}

.funcright{
  position: relative;
  float: right;
  margin: 20px;
}

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 350px;
}
.el-input {
  width: 350px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>