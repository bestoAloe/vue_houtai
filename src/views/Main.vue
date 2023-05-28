<template>
	<div class="mainlayout">
		<div class="leftmenu">
			<leftmenu :value="isfold"></leftmenu>
		</div>
		<div class="maincontent" :class="{active: isfold}">
			<content :value="isfold" @chfo="changefold"></content>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Leftmenu from './layout/Leftmenu.vue';
import Content from './layout/Content.vue';


let isfold = ref(false);

function changefold(){
	isfold.value = !isfold.value;
}

</script>

<style scoped>
.mainlayout {
	position: fixed;
	width: 100%;
	height: 100%;
}

.leftmenu {
	position: fixed;
	top:0;
	left:0;
	bottom: 0;
	background-color: #545c64;
}

.maincontent {
	padding: 0 0 0 150px;
}

.active{
	padding: 0 0 0 78px;
	animation: thewidth 0.5s;
	-webkit-animation: thewidth 0.5s;
}
@keyframes thewidth{
	0% {padding: 0 0 0 150px;}
	100% {padding: 0 0 0 78px;}
}

@-webkit-keyframes thewidth{
	0% {padding: 0 0 0 150px;}
	100% {padding: 0 0 0 78px;}
}

</style>