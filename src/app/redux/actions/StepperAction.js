export const SET_STEPPER_FORM = 'SET_STEPPER_FORM'

export const setStepperFormAction = (payload) => async dispatch => {
	try {
		dispatch({
			type : SET_STEPPER_FORM,
			payload: payload
		})
	} catch(error) {

	}
} 