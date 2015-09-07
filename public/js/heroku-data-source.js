import HttpDataSource from 'falcor-http-datasource';

export default class HerokuDataSource extends HttpDataSource {
  constructor(path, { token }) {
    return super(path, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
