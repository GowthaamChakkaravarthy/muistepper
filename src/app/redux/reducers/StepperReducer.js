import { SET_STEPPER_FORM } from "../actions/StepperAction"

const inialState = {
	stepperFormData : {}
}

const StepperReducer = function (state = inialState, action) {
	switch(action.type) {
		case SET_STEPPER_FORM : {
				return {
					...state,
					stepperFormData : {...action.payload}
				}				
		}
		default: {
			return {
				...state
			}
		}
	}
} 

export default StepperReducer