import { ADMIN_TYPE } from '../../types';

export default ezyrent => ({

  getProperties: (data) => ezyrent.requestGet('/v1/buildings',data,null, ADMIN_TYPE),
  addNewBuilding: (data) => ezyrent.requestPost('/v1/buildings',data,null, ADMIN_TYPE),

});
