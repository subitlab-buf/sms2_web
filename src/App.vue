<template>
    <ALayout style="height: 100vh">
        <ALayoutSider>
            <MenuSider :default-key="path" />
        </ALayoutSider>
        <RouterView style="background-color: #f6f6fa;" />
    </ALayout>
</template>

<script setup>
import "@arco-design/web-vue";
import MenuSider from "./components/MenuSiderComponent.vue";
const path = window.location.pathname.replace('/', '');
</script>