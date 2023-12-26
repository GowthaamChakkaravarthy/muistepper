import { Box, Divider, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const StepOne = (props) => {
	const {setStepData,stepData, step, setStep} = props
	const handleChange = (event) => {
		setStepData({ ...stepData, [event.target.name]: event.target.value });
	}
	useEffect(() => {
		if (!stepData?.firstName)
		setStepData({...stepData, ...{firstName : '', lastName : '', phone : ''}})
	},[])
	return (
		<Box>
			<Typography variant='subtitle1' mb={1}>First Name</Typography>
			<TextField
				sx={{ mb: 3 }}
				name='firstName'
				label='First Name'
				variant='outlined'
				value={stepData.firstName}
				onChange={(e)=> handleChange(e)}
				fullWidth
				required
			/>
			<Divider sx={{ my: 3 }} />
			<Typography variant='subtitle1' mb={1}>Last Name</Typography>
			<TextField
				sx={{ mb: 3 }}
				name='lastName'
				label='Last Name'
				variant='outlined'
				value={stepData.lastName}
				onChange={(e)=> handleChange(e)}
				fullWidth
				required
			/>
			<Divider sx={{ my: 3 }} />
			<Typography variant='subtitle1' mb={1}>Phone</Typography>
			<TextField
				sx={{ mb: 3 }}
				name='phone'
				label='Phone'
				variant='outlined'
				value={stepData.phone}
				onChange={(e)=> handleChange(e)}
				fullWidth
				required
			/>
		</Box>
	)
}

export default StepOne
