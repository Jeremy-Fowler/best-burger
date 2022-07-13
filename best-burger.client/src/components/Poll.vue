<template>
  <router-link :to="{ name: 'Poll', params: { id: poll.id } }">
    <div class="bg-light text-dark shadow rounded d-flex selectable mb-3">
      <img
        :src="poll.creator?.picture"
        alt=""
        class="img-fluid rounded-start"
      />
      <div class="p-3 d-flex flex-column justify-content-between">
        <p class="fw-bold">{{ poll.question }}</p>
        <p>Posted by: {{ poll.creator?.name }}</p>
      </div>
    </div>
  </router-link>
</template>


<script>
export default {
  props: {
    poll: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>