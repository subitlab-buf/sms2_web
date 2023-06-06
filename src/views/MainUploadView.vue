<template>
    <ALayout style="background-color: #f6f6fa;">
        <ALayoutHeader>
            <UserPathHeader path=" 立即投稿" />
        </ALayoutHeader>
        <ALayoutContent>
            <ARow>
                <ACol flex="25px" />
                <ACol flex="auto">
                    <ACard style="width: 70vw;" class="card">
                        <template #title>
                            7天内没有投稿
                        </template>
                        <ASpace direction='vertical' style="width: 100%;" size='large'>
                            <ASpace>
                                博雅学院xx活动宣传
                                <ASteps type='dot' :current="2" class="step">
                                    <AStep>上传</AStep>
                                    <AStep>审核中</AStep>
                                    <AStep>审核结果</AStep>
                                </ASteps>
                            </ASpace>
                            <ACard style="width: 40%;">
                                <ASpace direction='vertical'>
                                    你可以选择：新增一条投稿
                                    <AButton type="primary" @click="$router.push('/upload/new')">
                                        <template #icon>
                                            <IconPlus />
                                        </template>
                                        <template #default>立即投稿</template>
                                    </AButton>
                                    <div style="font-size: smaller;">
                                        投稿即遵循
                                        <APopover>
                                        <ATypographyText>《SubIT大屏使用协议》</ATypographyText>
                                        <template #content>
                                            Permission isn't hereby granted.
                                        </template>
                                        </APopover>
                                    </div>
                                </ASpace>
                            </ACard>
                            <AButton type='text' size='small' @click="$router.push('/history')">
                                <div style="font-weight: bold;">查看历史</div>
                                <IconRightCircle />
                            </AButton>
                        </ASpace>
                    </ACard>
                </ACol>
            </ARow>
        </ALayoutContent>
    </ALayout>
</template>

<script setup>
import UserPathHeader from '../components/UserPathHeaderComponent.vue';
import {
    IconPlus,
    IconRightCircle
} from "@arco-design/web-vue/es/icon";
</script>

<style scoped>
.card :deep(.arco-card-header) {
    border: 0;
}
.step :deep(.arco-steps-item-title) {
    font-size: small;
}
.step {
    line-height: 0.5;
}
</style>