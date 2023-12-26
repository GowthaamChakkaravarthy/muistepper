import { Box, Divider, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const StepTwo = (props) => {
	const {setStepData,stepData} = props
	const handleChange = (event) => {
		setStepData({ ...stepData, [event.target.name]: event.target.value });
	}
	useEffect(() => {
		if (!stepData?.address)
			setStepData({...stepData, ...{ address: '', address2: '', street: '',city: '' }})
	}, [])
	return (
		<Box>
			<Typography variant='subtitle1' mb={1}>Address 1</Typography>
			<TextField
				sx={{ mb: 3 }}
				name='address'
				label='Address 1'
				variant='outlined'
				value={stepData.address}
				onChange={(e) => handleChange(e)}
				fullWidth
				required
			/>
			<Divider sx={{ my: 3 }} />
			<Typography variant='subtitle1' mb={1}>Address 2</Typography>
			<TextField
				sx={{ mb: 3 }}
				name='address2'
				label='Address 2'
				variant='outlined'
				value={stepData.address2}
				onChange={(e) => handleChange(e)}
				fullWidth
				required
			/>
			<Divider sx={{ my: 3 }} />
			<Typography variant='subtitle1' mb={1}>Street</Typography>
			<TextField
				sx={{ mb: 3 }}
				name='street'
				label='Street'
				variant='outlined'
				value={stepData.street}
				onChange={(e) => handleChange(e)}
				fullWidth
				required
			/>

			<Typography variant='subtitle1' mb={1}>City</Typography>
			<TextField
				sx={{ mb: 3 }}
				name='city'
				label='City'
				variant='outlined'
				value={stepData.city}
				onChange={(e) => handleChange(e)}
				fullWidth
				required
			/>
		</Box>
	)
}

export default StepTwo
