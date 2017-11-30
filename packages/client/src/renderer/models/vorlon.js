import request from '../utils/request';


export default {
  namespace: 'vorlon',
  state: {
    ip: '',
    clients: []
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *requestClientList({ payload, onSuccess }, { call, put }) {
      const { ip } = payload;
      const serviceUrl = `https://${ip}:5680/api/getclients/default`;
      const params = {};
      const { data: clients} = yield call(request, serviceUrl, params);

      if ( clients.length > 0 ) {
 
        yield put({
          type: 'save', 
          payload: {
            ip, 
            clients 
          }
        });
      }

      onSuccess && onSuccess();
    },
   
  },
};
