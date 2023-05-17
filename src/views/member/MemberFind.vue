<template>
    <!-- Login Section -->
<section id="login-section">
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black shadow" style="border-radius: 25px">
                    <div class="card-body p-md-5 sh">
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <!-- 아이디 찾기 -->
                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                    ID Find
                                </p>
                                <form class="mx-1 mx-md-4" id='id-find-form'>
                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-3 fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="example@example.com" id="find-id-email" name="findIdEmail" class="form-control"/>
                                            <label class="form-label" for="find-id-email">Your Email</label>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-2 fas fa-birthday-cake fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="ex)990101" id="find-id-birth" name="findIdBirth" class="form-control"/>
                                            <label class="form-label" for="find-id-birth">Birth</label>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" class="btn btn-primary btn-lg" id="find-id-button">
                                            아이디 찾기
                                        </button>
                                    </div>
                                </form>

                                <hr/>

                                <!-- 비밀번호 찾기 -->
                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                    Password Find
                                </p>
                                <form class="mx-1 mx-md-4" id='login-form'>
                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-3 fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="사용자 ID" id="find-pwd-login-id" name="findPwdId" class="form-control"/>
                                            <label class="form-label" for="find-pwd-login-id">Your ID</label>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-3 fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="example@example.com" id="find-pwd-email" name="findPwdEmail" class="form-control"/>
                                            <label class="form-label" for="find-pwd-email">Your Email</label>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-2 fas fa-birthday-cake fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="ex)990101" id="find-pwd-birth" name="findPwdBirth" class="form-control"/>
                                            <label class="form-label" for="find-pwd-birth">Birth</label>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" class="btn btn-primary btn-lg" id="find-pwd-button">
                                            비밀번호 초기화
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                <img src="@/assets/img/member/login-section.jpg"
                                 class="img-fluid" alt="Sample image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>

export default {
    name: "MemberFind",
    component:{},
}
</script>

<style scoped>
#login-section{
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