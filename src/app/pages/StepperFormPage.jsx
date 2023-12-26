import { Box, Button, Card, Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import Preview from '../components/Preview'
import { ArrowBack, ArrowRight } from '@material-ui/icons'
import WithComponent from '../WithComponent'

const StepperFormPage = () => {

	useEffect(() => {
		// prepareComponents()
	}, [])


	// const prepareComponents = () => {
	// 	const componentstest = [];
	// 	componentstest.push(<StepOne />)
	// 	componentstest.push(<StepTwo />);
	// 	componentstest.push(<Preview />);
	// 	setComponets(componentstest);
	// }
	return (
		<div>
			<Container maxWidth='md' sx={{ mb: 5 }}>
				<WithComponent>
					{({ setStepData,stepData, step, setStep,submitAction }) =>  <Card elevatipon={3} sx={{ p: 4 }}>
							{step === 0 && <StepOne stepData = {stepData} setStepData={setStepData}/>}
							{step === 1 && <StepTwo stepData = {stepData} setStepData={setStepData}/>}
							{step === 2 && <Preview stepData = {stepData} setStepData={setStepData} submitAction={submitAction}/>}

							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
								<Button variant='contained' color='info' onClick={() => setStep(step - 1)}> Back <ArrowBack /></Button>
								<Button variant='contained' color='info' onClick={() => setStep(step + 1)}> Next <ArrowRight /></Button>
							</Box>
						</Card>
					}
				</WithComponent>

			</Container>
		</div>
	)
}

export default StepperFormPage
