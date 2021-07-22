<template>
  <div>
    <span>Upload to Cloudinary</span>
    <input
      type="file"
      accept=".jpeg,.jpg,.png,image/jpeg,image/png"
      aria-label="upload image button"
      @change="saveFile"
    />
    <button @click.prevent="selectFile">AKI</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      select: {},
    }
  },
  methods: {
    saveFile(e) {
      this.select = e.target.files[0]
      console.log(this.select, "HOLA")
    },

    async selectFile(e) {
      const file = this.select
      console.log(file)
      /* Make sure file exists */
      if (!file) return

      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      /* Read data */
      const data = await readData(file)

      /* upload the converted data */
      const instance = await this.$cloudinary.upload(data, {
        folder: 'upload-examples',
        uploadPreset: 'present_pubs',
      })
      console.log(instance)
    },
  },
}
</script>