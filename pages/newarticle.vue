<template>
  <div
    id="components-form-demo-vuex"
    class="mx-auto w-4/5 max-w-screen-md mt-5 py-8"
  >
    <p class="text-4xl font-light">Post New Blog</p>
    <div class="p-5 rounded-md bg-gray-100">
      <a-form class="text-center">
        <div class="flex justify-between">
          <a-form-item class="w-5/12 font-bold text-left" label="Article Title">
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
          <a-form-item class="w-5/12 font-bold text-left" label="Author Name">
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

        <a-form-item label="Description" class="font-bold text-left">
          <a-input
            v-decorator="[
              'Description',
              {
                rules: [
                  { required: true, message: 'Description is required!' },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Author Bio" class="font-bold text-left">
          <a-input
            v-decorator="[
              'Author Bio',
              {
                rules: [{ required: true, message: 'Author Bio is required!' }],
              },
            ]"
          />
        </a-form-item>
        <a-textarea
          placeholder="Controlled autosize"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
        <div class="flex mt-5 justify-center">
          <a-upload
            class="w-36"
            list-type="picture-card"
            :file-list="fileListImgArticle"
            @preview="handlePreviewImgArticle"
            @change="handleChangeImgArticle"
          >
            <div class="w-36" v-if="fileListImgArticle.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload Article Image</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisibleImgArticle"
            :footer="null"
            @cancel="handleCancelImgArticle"
          >
            <img
              alt="example"
              style="width: 100%"
              :src="previewImageImgArticle"
            />
          </a-modal>

          <a-upload
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
            class="ml-5 w-36"
          >
            <div class="w-36">
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

        <a-button type="primary" html-type="submit" class="w-1/2 mt-12">
          Submit
        </a-button>
      </a-form>
    </div>
    <!-- <img alt="example" style="width: 100%" :src="myimg" /> -->
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
      previewVisibleImgArticle: false,
      previewImageImgArticle: "",
      fileListImgArticle: [],
      previewVisible: false,
      previewImage: "",
      fileList: [],
      myimg: "",
    };
  },
  methods: {
    handleCancelImgArticle() {
      this.previewVisibleImgArticle = false;
    },
    async handlePreviewImgArticle(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImageImgArticle = file.url || file.preview;
      this.previewVisibleImgArticle = true;
    },
    handleChangeImgArticle({ fileList }) {
      this.fileListImgArticle = fileList;
      // if(fileList[0].thumbUrl){
      //   this.myimg = fileList[0].thumbUrl;
      // }
    },
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
      console.log(this.fileList.length);
      // this.myimg = fileList[0].thumbUrl;
    },
  },
};
</script>
<style>
.ant-upload-picture-card-wrapper {
  width: 9rem;
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