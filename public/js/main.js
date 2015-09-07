import { Model } from 'falcor';
import HerokuDataSource from './heroku-data-source';

const form  = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const model = new Model({
    source: new HerokuDataSource('/model', {
      token: input.value
    })
  });

  model.get(['users', 'byId', ['~'], ['email', 'name', 'id']]).then((user) => {
    document.getElementById('data').innerHTML = JSON.stringify(user, null, 2);
  });
});
