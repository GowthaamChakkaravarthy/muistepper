import React, { useEffect, useState } from 'react'

const WithComponent = (props) => {
	const [stepData, setStepData] = useState({})
	const [step, setStep] = useState(0);
	const submitAction = async (event) => {
		event.preventDefault();
		console.log('called')
		fetch('https://webhook.site/96546619-8cc2-483a-964b-221d26211c52', {
			mode: 'no-cors',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: {
				stepData
			}
		}, {
			mode: 'no-cors'
		  }).then(res => {return res.body})
		  .then(res => {console.log('res',res)}).catch(error => {
			console.log('error',error)
		});
	}

	// useEffect(()=> {
	// 		errorValidation()
	// },[step]) 
	
	const errorValidation = () => {
		for (let key in stepData) {
			if (stepData[key] === '') {
				alert(`${key} is empty or not valid`);
			}
		}
	}
	return props.children({
		stepData,
		setStepData,
		setStep,
		step,
		submitAction,errorValidation
	})
}

export default WithComponent
