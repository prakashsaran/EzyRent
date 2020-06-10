import { ADMIN_TYPE } from '../../types';

export default ezyrent => ({

  getBuildings: (data) => ezyrent.requestGetSingleResponse('/v1/buildings',data,null, ADMIN_TYPE),
  addNewBuilding: (data) => ezyrent.requestPost('/v1/buildings',data,null, ADMIN_TYPE),
  updateUserProfle: (userid,data) => ezyrent.requestMultipartPost(`/v1/users/${userid}/image`,data,null, ADMIN_TYPE,"PATCH"),
  getPropertiesForLandlord: (data) => ezyrent.requestGetSingleResponse('/v1/properties/landlord',data,null, ADMIN_TYPE),
  getPropertiesForTenant: (data) => ezyrent.requestGetSingleResponse('/v1/properties/tenant',data,null, ADMIN_TYPE),
  getBanks: (data) => ezyrent.requestGetSingleResponse('/v1/banks',data,null, ADMIN_TYPE),
  addPropertyWithImage: (data) => ezyrent.requestMultipartPost('/v1/properties',data,null, ADMIN_TYPE),
  addPropertyNoneImage: (data) => ezyrent.requestPost('/v1/properties',data,null, ADMIN_TYPE),
  //edit actions
  editPropertyWithImage: (propId,data) => ezyrent.requestMultipartPost(`/v1/properties/${propId}`,data,null, ADMIN_TYPE,"PUT"),
  editPropertyNoneImage: (propId,data) => ezyrent.requestPut(`/v1/properties/${propId}`,data,null, ADMIN_TYPE),
// edit actions
  addBank: (data) => ezyrent.requestPost('/v1/banks',data,null, ADMIN_TYPE),
  bankVerify: (userid,data) => ezyrent.requestPost(`/v1/banks/${userid}/otp-verification`,data,null, ADMIN_TYPE),
  getPropertyById: (propId) => ezyrent.requestGet(`/v1/properties/${propId}`,null,null, ADMIN_TYPE),
  tenantSubmissionOnProperty: (propId,data) => ezyrent.requestPatch(`/v1/properties/${propId}`,data,null, ADMIN_TYPE),
  deleteBank: (bankid) => ezyrent.requestDelete(`/v1/banks/${bankid}`,null,null, ADMIN_TYPE),
  editBank: (bankid,data) => ezyrent.requestPut(`/v1/banks/${bankid}`,data,null, ADMIN_TYPE),
  getRentsForLandlord: (userId,data) => ezyrent.requestGetSingleResponse(`/v1/users/${userId}/rent-landlord`,data,null, ADMIN_TYPE),
  getRentsForTenant: (userId,data) => ezyrent.requestGetSingleResponse(`/v1/users/${userId}/rent-tenant`,data,null, ADMIN_TYPE),
  getNotifications: () => ezyrent.requestGetSingleResponse(`/v1/notifications`,null,null, ADMIN_TYPE),
  getTenantProfileById: (userId,tenantId) => ezyrent.requestGetSingleResponse(`/v1/users/${userId}/tenant/${tenantId}`,null,null, ADMIN_TYPE),
  getLandlordProfileById: (userId,tenantId) => ezyrent.requestGetSingleResponse(`/v1/users/${userId}/landlord/${tenantId}`,null,null, ADMIN_TYPE),
  deleteProperty: (propId,data) => ezyrent.requestDelete(`/v1/properties/${propId}`,data,null, ADMIN_TYPE),
  getMyProfile: (uderId) => ezyrent.requestGetSingleResponse(`/v1/users/${uderId}`,null,null, ADMIN_TYPE),
  getMyLandlord: (uderId,data) => ezyrent.requestGetSingleResponse(`/v1/users/${uderId}/landlord`,data,null, ADMIN_TYPE),
  getMyTenant: (uderId,data) => ezyrent.requestGetSingleResponse(`/v1/users/${uderId}/tenant`,data,null, ADMIN_TYPE),
  changeProfileName: (uderId,data) => ezyrent.requestPatch(`/v1/users/${uderId}/name`,data,null, ADMIN_TYPE),
  changeEmailAddress: (uderId,data) => ezyrent.requestPatch(`/v1/users/${uderId}/email`,data,null, ADMIN_TYPE),
  changeMobileNumber: (uderId,data) => ezyrent.requestPatch(`/v1/users/${uderId}/mobile`,data,null, ADMIN_TYPE),
  changeMobilePin: (uderId,data) => ezyrent.requestPatch(`/v1/users/${uderId}/mpin`,data,null, ADMIN_TYPE),
  mpinChangeVerify: (uderId,data) => ezyrent.requestPost(`/v1/users/${uderId}/mpin/otp-verification`,data,null, ADMIN_TYPE),
  emailAdressChangeVerify: (uderId,data) => ezyrent.requestPatch(`/v1/users/${uderId}/email/verify`,data,null, ADMIN_TYPE),
  mobileNumberChangeVerify: (uderId,data) => ezyrent.requestPatch(`/v1/users/${uderId}/mobile/verify`,data,null, ADMIN_TYPE),
  deleteProfileImage: (uderId) => ezyrent.requestDelete(`/v1/users/${uderId}/profile-image`,null,null, ADMIN_TYPE),

});
