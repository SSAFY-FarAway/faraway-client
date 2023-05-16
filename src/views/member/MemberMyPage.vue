<template>
  <div>
    <div id="mypage-section" class="mt-9">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black shadow" style="border-radius: 25px">
                        <div class="card-body p-md-5 sh">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                        My Page
                                    </p>

                                    <div class="mx-1 mx-md-4" id="form-modify">
                                        <div class="d-flex flex-row mb-4">
                                            <b-icon 
                                            class="mt-2 fas fa-lg me-3 fa-fw"
                                            icon="file-earmark-person-fill"
                                            font-scale="1.5"
                                            ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="login-id" name="loginId" class="form-control"
                                                      readonly/>
                                                <label class="form-label" for="login-id">ID</label>
                                            </div>

                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                            <b-icon 
                                            class="mt-2 fas fa-lg me-3 fa-fw"
                                            icon="person-fill"
                                            font-scale="1.5"
                                            ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="last-name" name='lastName' class="form-control"
                                                      readonly/>
                                                <label class="form-label" for="last-name">Last Name</label>
                                                <input type="text" id="first-name" name='firstName' class="form-control"
                                                      readonly/>
                                                <label class="form-label" for="first-name">First Name</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                            <b-icon 
                                              class="mt-2 fas fa-lg me-3 fa-fw"
                                              icon="mastodon"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="mileage" name='mileage' class="form-control"
                                                      readonly/>
                                                <label class="form-label" for="mileage">Mileage</label>
                                                <input type="text" id="role" name='role' class="form-control" readonly/>
                                                <label class="form-label" for="role">Role</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                          <b-icon 
                                              class="mt-2 fas fa-lg me-3 fa-fw"
                                              icon="emoji-smile-fill"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="birth" name="birth" class="form-control" readonly/>
                                                <label class="form-label" for="birth">Your Birth (ex. 990101)</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                          <b-icon 
                                              class="mt-2 fas fa-lg me-3 fa-fw"
                                              icon="envelope-fill"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="email" id="email" name="email" class="form-control" readonly/>
                                                <label class="form-label" for="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                          <b-icon 
                                              class="mt-2 fas fa-lg me-3 fa-fw"
                                              icon="house-door-fill"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="zipcode" name="zipcode" class="form-control"
                                                      readonly/>
                                                <label class="form-label" for="zipcode">Your Zipcode (ex. 90000)</label>
                                                <input type="text" id="main-address" name="mainAddress"
                                                      class="form-control" readonly/>
                                                <label class="form-label" for="main-address">Your Main
                                                    Address</label>
                                                <input type="text" id="sub-address" name="subAddress" class="form-control"
                                                      readonly/>
                                                <label class="form-label" for="sub-address">Your Sub
                                                    Address</label>
                                            </div>
                                        </div>
                                        <div id="normal-mode-btns" class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button
                                                    class="btn btn-primary btn-lg shadow" id="modify-button">
                                                Modify
                                            </button>
                                        </div>
                                        <div id="modify-mode-btns" class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button
                                                    class="btn btn-primary btn-lg shadow me-3" id="modify-submit-button">
                                                Submit
                                            </button>
                                            <button
                                                    class="btn btn-secondary btn-lg shadow" id="modify-cancel-button">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img src="@/assets/img/member/login-section.jpg"
                                        class="img-fluid" alt="Sample image"/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
        </div>
  </div>
</template>


<script>
import { BIcon } from "bootstrap-vue";

export default {
  name: 'MemberMypage',
  components: {BIcon},
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
  
#mypage-section{
  padding : 9rem 0;
}

container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

</style>