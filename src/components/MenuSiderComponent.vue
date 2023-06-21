<template>
    <ASpace style="height: 15%;" fill>
        <div></div>
        <div></div>
        <img src="@/assets/SubIT.svg" style="height: 17px;">
        <ATypographyText bold style="font-size: 17px;">大屏管理系统</ATypographyText>
    </ASpace>
    <AMenu :default-selected-keys="[props.defaultKey]" class="menu">
        <AMenuItem key="workbench" @click="$router.push('/workbench')">
            <template #icon>
                <IconDashboard />
            </template>
            工作台
        </AMenuItem>
        <AMenuItem key="upload" @click="$router.push('/upload/main')">
            <template #icon>
                <IconShareExternal />
            </template>
            立即投稿
        </AMenuItem>
        <AMenuItem key="history" @click="$router.push('/history')">
            <template #icon>
                <IconHistory />
            </template>
            历史投稿
        </AMenuItem>
        <AMenuItem key="userinfo" @click="$router.push('/userinfo')">
            <template #icon>
                <IconUser />
            </template>
            用户信息
        </AMenuItem>
    </AMenu>
    <img src="@/assets/BDFZ.svg" style="width: 15%; position: absolute; left: 15%; bottom: 5%;">
</template>

<script setup>
import "@arco-design/web-vue";
import {
    IconDashboard,
    IconShareExternal,
    IconHistory,
    IconUser
} from "@arco-design/web-vue/es/icon";
const props = defineProps({ defaultKey: String });
</script>

<style scoped>
.menu :deep(.arco-menu-item.arco-menu-selected) {
    background-color: rgb(255, 0, 0);
    color: #ffffff;
}

.menu :deep(.arco-menu-item.arco-menu-selected .arco-icon) {
    color: #ffffff;
}
</style>