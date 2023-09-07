<template>
    <ALayout style="height: 100vh">
        <ALayoutSider v-if="shouldNotHidden">
            <MenuSider :default-key="path" />
        </ALayoutSider>
        <RouterView style="background-color: #f6f6fa;" />
    </ALayout>
</template>

<script setup>
import "@arco-design/web-vue";
import MenuSider from "./components/MenuSiderComponent.vue";
const path = window.location.pathname.split('/')[1];
console.log(path);
const shouldNotHidden = path!=="display";
</script>