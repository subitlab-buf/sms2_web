<template>
    <APageHeader :show-back="false">
        <template #title>
            <ABreadcrumb>
                <template #separator>
                    <IconRight />
                </template>
                <ABreadcrumbItem>
                    <IconHome />
                    主页
                </ABreadcrumbItem>
                <ABreadcrumbItem>
                    {{ props.path }}
                </ABreadcrumbItem>
            </ABreadcrumb>
        </template>
        <template #extra>
            <div style="text-align: right;">
                <AAvatar />
                12345
                <IconDown />
            </div>
        </template>
    </APageHeader>
</template>

<script setup>
import {
    IconHome,
    IconRight,
    IconDown
} from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue";
const props = defineProps({ path: String });
</script>