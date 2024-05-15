import { store } from './app/store';
import { checkAuthorization } from './features/auth/auth-slice';

export default function Boot() {
  return new Promise(() => {
    store.dispatch(checkAuthorization());
  });
}
