import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access-token");

    if (accessToken) {
      config.headers["Authorization"] = accessToken;
      config.headers["access-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // refresh token이 존재하는 경우
    if (error.response.status == 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem('refresh-token');
      // const loginMember = sessionStoreage.getItem('vuex').memberStore.state.loginMember.id
      const storedData = sessionStorage.getItem('vuex');
      const parsedData = JSON.parse(storedData);
      const memberId = parsedData.memberStore.loginMember.id;
      console.log(memberId);
      if (refreshToken) {
        try {
          // console.log(loginMember);
          const response = await axios.post("http://localhost/member/refresh", null, {
            params: {
              memberId: memberId
            }, 
            headers: {
              'refresh-token': refreshToken,
            },
          });
          console.log("response  : " + response);
          const newAccessToken = response.data["access-token"];
          sessionStorage.setItem("access-token", newAccessToken);
          originalRequest.headers['Authorization'] = newAccessToken;
          originalRequest.headers['access-token'] = newAccessToken;
          console.log("발급 성공" + newAccessToken);

          return instance(originalRequest);

        } catch (refreshError) {
          console.log("리프레시도 죽음")
          console.log(refreshError);
          // refresh-token을 사용하여 access-token을 갱신하는 데 실패한 경우
          // 로그아웃 처리 또는 다른 조치 수행
          // 예: sessionStorage의 토큰 제거, 로그인 페이지로 이동 등
        }
      }
    }
  }

)

export default instance;

// 이거 axios export 대문에 에러나는거니까 오후에 와서해 인혁아
