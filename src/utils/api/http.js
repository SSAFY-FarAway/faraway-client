import axios from "axios";
import router from '@/router/index';
import store from "@/store/modules/memberStore"; // Vuex store를 import합니다.




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
          })
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
          await axios.get("http://localhost/member/logout/"+memberId).then((res) => {
            if (res.status === 200) {
              console.log("[로그아웃 성공]")
              console.log(res)
              // const state = store.state;
              store.state.isLogin = false;
              store.state.loginMember = null;
              sessionStorage.removeItem("vuex");
              sessionStorage.removeItem("access-token");
              sessionStorage.removeItem("refresh-token");
              // console.log(state);
              // setIsLogin(false); // -> 이게 무조건 문제임
              // this.setIsLogin(false);
              if (router.currentRoute.path !== "/index") {
                router.push("/"); // 로그아웃 후 메인 페이지로 이동
              }
              alert("세션이 만료되어 로그아웃되었습니다.")
            }
          }).catch((error) => {
            alert("로그아웃에 실패했습니다.","잠시 후 다시 시도하세요.")
            console.log("[로그아웃 실패]")
            console.log(error)
          });
          console.log("여기까지 왔니 ?? ?")
          return Promise.reject(refreshError);
          // refresh-token을 사용하여 access-token을 갱신하는 데 실패한 경우
          // 로그아웃 처리 또는 다른 조치 수행
          // 예: sessionStorage의 토큰 제거, 로그인 페이지로 이동 등

        }
      }
    }
  }

)

export default instance;

// 이거 axios export 대문에 에러나는거니까 오후에 와서해 인혁아\

/*Todo
  RT 만료시 -> 세션 지우기, 로그아웃 처리, DB RT 삭제는 정상 작동 
  그치만 이전에 실행했던 originalRequest가 에러처리가 안됨 -> 빨간 에러 화면이 뜸 ! 
*/
