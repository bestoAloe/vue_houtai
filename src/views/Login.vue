<template>
    <div class="loginwarp">
        <div class="loginform">
                <div class="logintitle">后台管理系统</div>
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="90px"
                    class="demo-ruleForm xzform">
                    <el-form-item label="账号：" prop="account">
                        <el-input v-model="ruleForm.account" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码：" prop="pass">
                        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password/>
                    </el-form-item>
                    <el-form-item label="二次密码：" prop="checkPass">
                        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../store/userinfo';
import { usePermissStore } from '../store/permiss';
import getAllApi from '../request/api/api';


const ruleFormRef = ref<FormInstance>()

const checkAccount = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        //console.log(ruleForm.account);
        if (ruleForm.account !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('账号已输入', () => null)
        }
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    //console.log(value.length);
    if (value === '') {
        callback(new Error('请输入密码!'))
    } else if(value.length < 4 || value.length > 10){
        callback(new Error('密码长度为4-10!'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请重新输入密码!'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("账号和密码不匹配!"))
    } else {
        callback()
    }
}


const ruleForm = reactive({
    account: '',
    pass: '',
    checkPass: ''
})

const rules = reactive<FormRules>({
    account: [{ validator: checkAccount, trigger: 'blur' }],
    pass: [{validator: validatePass, trigger: 'blur' }],
    checkPass: [{validator: validatePass2, trigger: 'blur' }],
})

//保持状态，发送请求且通过，跳转路由
const permiss = usePermissStore();
const userinfo = useUserStore();
const router = useRouter();

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            //console.log(valid)
            axios({
                method: 'post',
                url: getAllApi.getToken.url,   //如果token获取失败可以将最后的url替换成url2
                data: {
                    account: ruleForm.account,
                    password: ruleForm.pass
                }
                }).then( res =>{
                    //把token保存到本地和pinia
                    userinfo.token = res.data.token ;
                    userinfo.userInf.account = ruleForm.account;
                    userinfo.userInf.password = ruleForm.pass;
                    //console.log(userinfo.token);
                    router.push('/main');
                });
        } else {
            console.log('error submit!');
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped>
.loginwarp {
    position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/loginbg.jpg);
    background-repeat: round;
	background-size: 100%;
}

.loginform{
    position: absolute;
    top:50%;
    left:50%;
    width: 390px;
    transform: translate(-50%, -50%);
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.5);
	overflow: hidden;
}

.xzform{
    width: 350px;
}

.logintitle{
    margin: 15px;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 20px;
}
</style>