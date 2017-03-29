import AppNavigator from '../components/AppNavigator'

export function navReducer (state, action) {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
}