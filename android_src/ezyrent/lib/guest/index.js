import { GUEST_TYPE } from '../../types';

export default ezyrent => ({

  setupMobile: (data) => ezyrent.requestPost('/v1/users/signup/mobile',data,null, GUEST_TYPE),

  setupMobileOtp: (userId,data) => ezyrent.requestPost(`/v1/users/${userId}/signup/mobile/verify`,data,null, GUEST_TYPE),

  setupResendMobileOtp: (data) => ezyrent.requestPost('/v1/mobile/otp-resend',data,null, GUEST_TYPE),

  setupEmail: (data) => ezyrent.requestPost('/v1/users/signup/email',data,null, GUEST_TYPE),

  setupEmailVerify: (userId,data) => ezyrent.requestPost(`/v1/users/${userId}/signup/email/verify`,data,null, GUEST_TYPE),
  
  setupAccountComplete: (userId,data) => ezyrent.requestPost(`/v1/users/${userId}/signup/account`,data,null, GUEST_TYPE),

  setupResendMailOtp: (data) => ezyrent.requestPost('/v1/email/otp-resend',data,null, GUEST_TYPE),

  userSignIn: (data) => ezyrent.requestPost('/v1/user/login',data,null, GUEST_TYPE),
  
  userSignInVerify: (data) => ezyrent.requestPost('/v1/user/login/verify',data,null, GUEST_TYPE),

});
