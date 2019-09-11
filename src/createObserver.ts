
export default (store: Store) => (selector: (state: State) => {}, onChange: (state: State) => void): () => void => {
  let currentState: State;
  return store.subscribe(() => {
    const nextState: State | {} = selector(store.getState());
    if (JSON.stringify(currentState) !== JSON.stringify(nextState)) {
      currentState = nextState as State;
      onChange(currentState);
    }
  })
}
