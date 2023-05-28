<template>
	<div>
		<div class="headerinfo">
			<div class="foldicon" @click="changefold">
				<el-icon v-if="foldicon.value"><Expand /></el-icon>
			  <el-icon v-else="foldicon.value"><Fold /></el-icon>
		  </div>
			<div class="userinfo">
				<div>
					<el-avatar :size="20" 
					src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
					/>
					<el-dropdown>
						<span class="el-dropdown-link">
							{{ getuser.userInf.account }}
							<el-icon class="el-icon--right">
								<arrow-down />
							</el-icon>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>修改密码</el-dropdown-item>
								<el-dropdown-item>更换头像</el-dropdown-item>
								<el-dropdown-item divided>退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
		</div>
		<div class="showinfo">
			<div class="breadcrumbs">
				<el-breadcrumb :separator-icon="ArrowRight">
					<el-breadcrumb-item :to="{ path: '/shouye' }">homepage</el-breadcrumb-item>
					<el-breadcrumb-item>promotion management</el-breadcrumb-item>
					<el-breadcrumb-item>promotion list</el-breadcrumb-item>
					<el-breadcrumb-item>promotion detail</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="menupageinfo">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '../../store/userinfo';

const foldicon = defineProps({
	value:Boolean
});

const chfos = defineEmits(["chfo"]);

function changefold(){
	chfos('chfo',!foldicon.value);
}

//获取用户信息
const getuser = useUserStore()

</script>

<style scoped>
.headerinfo {
	height: 40px;
	background-color: #afbbc7;
}

.foldicon{
	margin-top: 10px;
	position: relative;
	float: left;
	cursor: pointer;
}

.userinfo{
	margin-top: 10px;
	position: relative;
	float: right;
	margin-right: 15px;
}

.breadcrumbs{
	margin-top: 5px;
}

.showinfo{
	margin: 0 10px;
}

.menupageinfo{
	margin: 10px 0;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary-text);
  display: flex;
  align-items: center;
}
</style>