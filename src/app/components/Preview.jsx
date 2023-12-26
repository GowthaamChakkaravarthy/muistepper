import { Box, Button, Typography } from '@material-ui/core'
import React from 'react'

const Preview = (props) => {
	const { setStepData, stepData, submitAction } = props
	return (
		<Box>
			{
				<>
					<table style={{width:"100%"}}>
						<tr>
							<td>First Name</td>
							<td>Last Name</td>
							<td>Phone</td>
							<td>Address</td>
							<td>Address2</td>
							<td>Street</td>
							<td>Client</td>
						</tr>
						<tr>
							<td><Typography variant='h4'>{stepData.firstName}</Typography></td>
							<td><Typography variant='h4'>{stepData.lastName}</Typography></td>
							<td><Typography variant='h4'>{stepData.phone}</Typography></td>
							<td><Typography variant='h4'>{stepData.address}</Typography></td>
							<td><Typography variant='h4'>{stepData.address2}</Typography></td>
							<td><Typography variant='h4'>{stepData.street}</Typography></td>
							<td><Typography variant='h4'>{stepData.city}</Typography></td>
						</tr>
					</table>

					<Button variant='contained' color='info' onClick={submitAction}>Submit</Button>
				</>
			}
		</Box>
	)
}

export default Preview
