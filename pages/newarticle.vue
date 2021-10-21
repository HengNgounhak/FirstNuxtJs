<template>
  <div
    id="components-form-demo-vuex"
    class="
      mx-auto
      w-4/5
      mt-5
      border-2
      rounded-md
      border-black
      bd-white
      px-16
      py-8
    "
  >
    <a-form :form="form" @submit="handleSubmit">
      <div class="flex">
        <a-form-item class="w-full" label="Article Title">
          <a-input
            v-decorator="[
              'Article Title',
              {
                rules: [
                  { required: true, message: 'Article Title is required!' },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item class="w-full" label="Author Name">
          <a-input
            v-decorator="[
              'Author Name',
              {
                rules: [
                  { required: true, message: 'Author Name is required!' },
                ],
              },
            ]"
          />
        </a-form-item>
      </div>

      <a-form-item label="Description">
        <a-input
          v-decorator="[
            'Description',
            {
              rules: [{ required: true, message: 'Description is required!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Author Bio">
        <a-input
          v-decorator="[
            'Author Bio',
            {
              rules: [{ required: true, message: 'Author Bio is required!' }],
            },
          ]"
        />
      </a-form-item>
      <div class="flex">
        <a-upload class="mr-5"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div>
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload Article Image</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div>
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload Author Image</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>

      <a-textarea
        placeholder="Controlled autosize"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
      <a-button type="primary" html-type="submit"> Submit </a-button>
    </a-form>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
};
</script>
<style>
#components-form-demo-vuex .language-bash {
  max-width: 400px;
  border-radius: 6px;
  margin-top: 24px;
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>