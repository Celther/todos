// What the actions might look like
{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

{
  type: 'REMOVE_TODO',
  id: 0,
}

{
  type: 'TOGGLE_TODO',
  id: 0,
}

function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
    case: 'REMOVE_TODO':
      return state = state.filter((todo) => todo.id !== action.id)
    case: 'TOGGLE_TODO':
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default:
      return state
  }
}

function goals (state = [], action) {
  switch (action.type) {
    case: 'ADD_GOAL':
      return state.concat([action.goal])
    case: 'REMOVE_GOAL':
      return state.filter((goal) => goal.id !== action.id)
    default:
      return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

function createStore (reducer) {
  // The store should have four parts
  // 1. The state - Private/Not public facing
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

const store = createStore(app)

const listen = store.subscribe(() => {
  console.log('The new State is:', store.getState())
})