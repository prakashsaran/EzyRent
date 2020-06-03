import { ADMIN_TYPE } from '../../types';

export default ezyrent => ({

  getBuildings: (data) => ezyrent.requestGet('/v1/buildings',data,null, ADMIN_TYPE),
  addNewBuilding: (data) => ezyrent.requestPost('/v1/buildings',data,null, ADMIN_TYPE),
  updateUserProfle: (userid,data) => ezyrent.requestMultipartPost(`/v1/users/${userid}/image`,data,null, ADMIN_TYPE,"PATCH"),
  getPropertiesForLandlord: (data) => ezyrent.requestGet('/v1/properties/landlord',data,null, ADMIN_TYPE),
  getPropertiesForTenant: (data) => ezyrent.requestGet('/v1/properties/tenant',data,null, ADMIN_TYPE),
  getBanks: (data) => ezyrent.requestGetSingleResponse('/v1/banks',data,null, ADMIN_TYPE),
  addPropertyWithImage: (data) => ezyrent.requestMultipartPost('/v1/properties',data,null, ADMIN_TYPE),
  addPropertyNoneImage: (data) => ezyrent.requestPost('/v1/properties',data,null, ADMIN_TYPE),
  addBank: (data) => ezyrent.requestPost('/v1/banks',data,null, ADMIN_TYPE),
  bankVerify: (userid,data) => ezyrent.requestPost(`/v1/banks/${userid}/otp-verification`,data,null, ADMIN_TYPE),
});
