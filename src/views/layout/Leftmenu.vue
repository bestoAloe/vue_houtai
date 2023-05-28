<template>
	<div>
		<el-row class="tac">
			<el-col :span="12">
				<el-menu default-active="2" 
				class="el-menu-vertical-demo" 
				:class = "{active: isfold.value}"
				:collapse="isfold.value"
				:unique-opened = "true"
				router
        background-color="#545c64"
				active-text-color="#ffd04b"
				text-color="#fff">
					<el-menu-item :index="menulist.shouye.url">
						<el-icon :size="15"><Discount /></el-icon>
						<span> {{ menulist.shouye.listname }} </span>
					</el-menu-item>
					<el-sub-menu index="2">
						<template #title>
							<el-icon :size="15"><User /></el-icon>
							<span>用户管理</span>
						</template>
						<el-menu-item-group title="常规操作">
							<el-menu-item :index="menulist.user.url"> {{ menulist.user.listname }} </el-menu-item>
							<el-menu-item :index="menulist.admin.url"> {{ menulist.admin.listname }} </el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="谨慎操作">
							<el-menu-item index="2-3">暂定1</el-menu-item>
						</el-menu-item-group>
						<el-sub-menu index="2-4">
							<template #title>暂定2</template>
							<el-menu-item :index="menulist.oneitem.url"> {{ menulist.oneitem.listname }} </el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
					<el-sub-menu index="4">
						<template #title>
							<el-icon :size="15"><Lock /></el-icon>
							<span>权限管理</span>
						</template>
						<el-menu-item-group title="操作1">
							<el-menu-item :index="menulist.rbaclook.url"> {{ menulist.rbaclook.listname }} </el-menu-item>
							<el-menu-item :index="menulist.rbacrevise.url"> {{ menulist.rbacrevise.listname }} </el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import router from '../../router';

const isfold = defineProps({
	value: Boolean
});

const menulist = reactive({
	shouye : {
		listname: '首页',
		url:'/shouye'
	},
	user:{
		listname:'用户列表',
		url:'/user'
	},
	admin:{
		listname:'管理员列表',
		url:'/admin'
	},
	oneitem:{
		listname:'暂定子菜单',
		url:'/'
	},
	rbaclook:{
		listname:'权限列表',
		url:'/premissionshow'
	},
	rbacrevise:{
		listname:'角色列表',
		url:'/relolist'
	}
});


</script>

<style scoped>
.mb-2{
	margin-left: 20px;
}
.el-menu-vertical-demo{
	width:150px;
	min-width: 150px;
}

.active{
	width: 78px;
	min-width: 78px;
	animation:thewidth 0.2s;
	-webkit-animation: thewidth 0.2s;
}

@keyframes thewidth{
	0% {width: 150px; min-width: 150px;}
	100% {width: 78px; min-width: 78px;}
}

@-webkit-keyframes thewidth{
	0% {width: 150px; min-width: 150px;}
	100% {width: 78px; min-width: 78px;}
}

</style>