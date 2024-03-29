<template>
    <ALayout>
        <ALayoutHeader>
            <UserPathHeader path=" 立即投稿" />
        </ALayoutHeader>
        <ALayoutContent>
            <ARow>
                <ACol flex="25px" />
                <ACol flex="auto">
                    <ACard style="width: 70vw;" class="card">
                        <template #title>
                            新增投稿
                        </template>
                        <AForm :model="form" style="width: 50vw;" @submit="handleSubmit" ref="postForm">
                            <AFormItem field="title" label="标题" required>
                                <AInput v-model="form.title" placeholder="请输入申请审核内容的标题" />
                                <template #extra>
                                    <div>例：行知学院-xx组-xx活动宣传</div>
                                </template>
                            </AFormItem>
                            <AFormItem field="dateRange" label="申请投放日期" required :rules="rules">
                                <ARangePicker v-model="form.dateRange" :disabled-date="disabledDate" @select="onSelect"
                                    @clear="onClear" />
                                <template #extra>
                                    <div>选择海报投放日期（不超过7天）</div>
                                </template>
                            </AFormItem>
                            <AFormItem field="note" label="备注" required>
                                <ATextarea placeholder="请在此输入" allow-clear v-model="form.note" />
                                <template #extra>
                                    <div>
                                        描述投放内容的原因及活动目的。
                                        <br>
                                        如投放数大于两张，或投放时间大于5天，请适当说明。
                                    </div>
                                </template>
                            </AFormItem>
                            <AFormItem field="files" label="上传文件" required>
                                <AUpload draggable @before-remove="beforeRemove" image-preview
                                    tip="Only pdf, png, jpg can be uploaded, and the size should not exceed 50MB."
                                    @before-upload="beforeUpload" :custom-request="pictureUpload" />
                                <!--TODO:根据后端API doc添加上传路径-->
                            </AFormItem>
                            <AFormItem>
                                <APopconfirm content="Are you sure?" ok-text="Yes" cancel-text="No" position="right"
                                    @ok="handleSubmit()">
                                    <AButton>确认提交</AButton>
                                </APopconfirm>
                            </AFormItem>
                        </AForm>
                    </ACard>
                </ACol>
            </ARow>
        </ALayoutContent>
    </ALayout>
</template>

<script setup>
import { reactive } from "vue";
import "@arco-design/web-vue";
import UserPathHeader from "../components/UserPathHeaderComponent.vue";
import { Message } from "@arco-design/web-vue";
import dayjs from "dayjs";
import API from "../api/axios.js";
import { store } from "../store/index.js";
import router from "../router/index.js";
import { ref } from "vue";
const postForm = ref(null);
const form = reactive({
    title: "",
    dateRange: ["", ""],
    note: "",
});
const picTokens = [];
const picUid = []; //Local uid
const beforeUpload = (file) => {
    return new Promise((resolve, reject) => {
        const fileName = file.name;
        const suffix = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        if (suffix !== ".jpg" && suffix !== ".jpeg" && suffix !== ".jpe" && suffix !== ".png" && suffix !== ".pdf") {
            Message.error("Incorrect file type!");
            reject("wrong file type");
        } else if (file.size > 50 * 1024 * 1024) {
            Message.error("File size limit exceeded!");
            reject("file size too big");
        } else {
            resolve(true);
        }
    });
};
const handleSubmit = () => {
    var shouldReturn = false;
    postForm.value.validate().then((res) => {
        if (res != void 0) shouldReturn = true;
    });
    if (shouldReturn) return;
    API.post('/api/post/create', {
        title: form.title,
        description: form.note,
        time_range: form.dateRange,
        images: picTokens,
    }, {
        headers: {
            'Token': store.getters.token,
            'AccountId': store.getters.accountId,
        }
    })
        .then(function (response) {
            let json = JSON.parse(response);
            if (json.status == 'success') {
                Message.success("提交成功");
                router.push('/upload/main');
            } else {
                Message.error(json.error);
            }
        });
};
const disabledDate = (current) => {
    const dateRange = form.dateRange;
    const now = dayjs(new Date());
    if (dayjs(current).isBefore(now, "day")) { return true; }
    if (dateRange[0] !== "") {
        if (dayjs(current).isBefore(dayjs(dateRange[0]).subtract(6, "day"), "day") || dayjs(current).isAfter(dayjs(dateRange[0]).add(6, "day"), "day")) {
            return true;
        }
    }
    return false;
};
const onSelect = (dateString) => {
    form.dateRange = [dateString[dateString.length === 1 ? 0 : 1], ""];
};
const onClear = () => { form.dateRange = ["", ""]; };
const pictureUpload = (option) => {
    API.post('/api/post/upload-image', option.fileItem.file, {
        headers: {
            'Token': store.getters.token,
            'AccountId': store.getters.accountId,
        },
        onUploadProgress: function (event) {
            let percent;
            if (event.total > 0) {
                percent = event.loaded / event.total;
            }
            option.onProgress(percent, event.event);
        },
    })
        .then(function (response) {
            let json = JSON.parse(response);
            if (json.status === 'success') {
                picUid.push(option.fileItem.uid);
                picTokens.push(json.hash);
                option.onSuccess(response);
            } else {
                option.onError(response);
                Message.error(json.error);
            }
        })
        .catch(function (e) {
            option.onError(e.response);
        });
};
const beforeRemove = (fileItem) => {
    return new Promise((resolve) => {
        delete (picTokens[picUid.indexOf(fileItem.uid)]);
        delete (picUid.indexOf(fileItem.uid));
        resolve(true);
    });
};
const rules = [{
    validator: (value, cb) => {
        return new Promise(resolve => {
            if (form.dateRange[0] == "" || form.dateRange[1] == "") {
                cb('dateRange is required');
            }
            resolve();
        });
    }
}];
</script>

<style scoped>
.card :deep(.arco-card-header) {
    border: 0;
}
</style>