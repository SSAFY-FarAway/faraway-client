<template>
  <div class="container footer py-4">
    <div class="row align-items-center">
      <div class="col-lg-4 text-lg-start">Copyright &copy; FarAway 2022</div>
      <div class="col-lg-4 my-3 my-lg-0 d-flex justify-content-center">
        <a class="btn btn-dark mx-2" href="#!" aria-label="facebook">
          <b-icon icon="facebook"></b-icon>
        </a>
        <a class="btn btn-dark mx-2" href="#!" aria-label="instagram">
          <b-icon icon="instagram"></b-icon>
        </a>
        <a class="btn btn-dark mx-2" href="#!" aria-label="twitter">
          <b-icon icon="twitter"></b-icon>
        </a>
      </div>
      <div class="col-lg-4 text-lg-end">
        <a class="link-dark text-decoration-none me-3" v-b-modal.modal-1
          >Privacy Policy</a
        >
        <b-modal id="modal-1" title="Privacy Policy">
          <p class="my-4">Privacy Policy</p>
        </b-modal>

        <a class="link-dark text-decoration-none" v-b-modal.modal-2
          >Terms of Use</a
        >
        <b-modal id="modal-2" title="이용약관">
          <p class="my-4">이용약관</p>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";

export default {
  name: "TheFooter",
  components: { BIcon },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
