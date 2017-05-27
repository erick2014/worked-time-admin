import usersWatchers from './users';
import weeksWatchers from './weeks';

function runWatchers(watchers) {
  return Object
    .values(watchers)
    .map(watcher => watcher())
}

export default function* rootSaga() {
  yield [
    ...runWatchers(usersWatchers),
    ...runWatchers(weeksWatchers)
    
  ]
}