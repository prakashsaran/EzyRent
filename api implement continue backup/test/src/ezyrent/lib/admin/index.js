import { ADMIN_TYPE } from '../../types';

export default ezyrent => ({

  getProperties: (data) => ezyrent.requestPost('/v1/buildings',data,null, ADMIN_TYPE),

});
