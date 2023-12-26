import { combineReducers } from 'redux';
import StepperReducer from './StepperReducer';

const RootReducer = combineReducers({
	form: StepperReducer,
})

export default RootReducer;