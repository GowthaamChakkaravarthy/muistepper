import { genericValidations, isEmpty } from '../../utils/utils';
import axios from 'axios';
import key from '../../utils/config';
import {
	GET_COLLECTION,
	GET_COLLECTION_ERROR,
	GET_CONTRACT_ABI,
	GET_CONTRACT_ABI_ERROR,
	GET_TEMPLATE_CONTRACT_SETTING,
	SET_ACTION_TYPE,
	SET_PROPOSAL_ACTION,
	SET_PROPOSAL_ACTION_ERROR,
	SET_WALLET_DETAILS,
	SET_TOKEN_HOLDERS,
	SAVE_PROPOSAL,
	SAVE_PROPOSAL_ERROR,
	GET_TOKEN_HOLDER,
	CATCH_ERROR,
	SET_SNACK_DATA,
	LOADING,
	SAVE_DEPOSIT,
	GET_FINANCE_DATA,
	GET_CONVERTION,
	GET_PROPOSAL,
	CASTING_VOTE,
	GET_PERCENTAGES,
	EXECUTE_PROPOSAL
} from '../../utils/constant';

const accessToken = localStorage.getItem('accessToken');
const signerResult = localStorage.getItem('signerResult');
const lsaddress = localStorage.getItem('address');

export const getContractAbiAction = (payload) => async dispatch => {
	try {
		const formData = new FormData();
		formData.append('contractAddress', payload.contractAddress);
		formData.append('networkId', '80001');
		formData.append('currentAddress', lsaddress);
		dispatch({
			type : LOADING,
			payload : true
		})
		await axios({
			method: 'post',
			url: `${key.apiUrl}/settings/getContractAbi`,
			data: formData,
			headers: {
				'content-type': 'multipart/form-data',
				authorization: `Bearer ${accessToken}`
			}
		}).then(response => {
			dispatch({
				type : LOADING,
				payload : false
			})
			dispatch({
				type: GET_CONTRACT_ABI,
				payload: response.data
			})
		}).catch(error => {
			dispatch({
				type: GET_CONTRACT_ABI_ERROR,
				payload: error
			})
			dispatch({
				type : LOADING,
				payload : false
			})
		})
	} catch (error) {
		dispatch({
			type: GET_CONTRACT_ABI_ERROR,
			payload: error
		})
	}
}

export const getCollectionAction = (payload) => async dispatch => {
	try {
		var formData = new FormData();
		if (payload.contractAddress) formData.append('contractAddress', payload.contractAddress);
		if (payload.creator) formData.append('creator', payload.creator);
		if (payload.networkVersion) formData.append('networkId', payload.networkVersion);
		if (payload.contractType) formData.append('contractType', payload.contractType);
		formData.append('currentAddress', lsaddress);

		dispatch({
			type : LOADING,
			payload : true
		})
		await axios({
			method: 'post',
			url: `${key.apiUrl}/settings/getCollection`,
			data: formData,
			headers: {
				'content-type': 'multipart/form-data',
				authorization: `Bearer ${accessToken}`
			}
		}).then(response => {
			dispatch({
				type: GET_COLLECTION,
				payload: response?.data
			})
			dispatch({
				type : LOADING,
				payload : false
			})
		}).catch(error => {
			dispatch({
				type: GET_COLLECTION_ERROR,
				error: error
			})
			dispatch({
				type : LOADING,
				payload : false
			})
		})
	} catch (error) {
		dispatch({
			type: GET_COLLECTION_ERROR,
			error: error
		})
	}
}

export const setActionType = (payload) => async dispatch => {
	try {
		console.log('called action')
		dispatch({
			type: SET_ACTION_TYPE,
			payload: payload
		})
	} catch (error) {
		console.log(error)
	}
}

export const setProposalAction = (payload) => async dispatch => {
	try {
		dispatch({
			type: SET_PROPOSAL_ACTION,
			payload: payload
		})
	} catch (error) {
		dispatch({
			type: SET_PROPOSAL_ACTION_ERROR,
			error: error
		})
	}
}

export const setInputFieldsAction = (payload) => async dispatch => {
	try {
		dispatch({
			type: SET_TOKEN_HOLDERS,
			payload: payload
		})
	} catch (error) {
		console.log(error);
	}
}

export const setWalletProviderDetailsAction = (payload) => async dispatch => {
	try {
		dispatch({
			type: SET_WALLET_DETAILS,
			payload: payload
		})
	} catch (error) {

	}
}
export const createProposalAction = (payload) => async dispatch => {
	try {
		const {proposalId , startDate, endDate , winningPercentage, concept, tokenAddress, tokenHolders, status, proposer, name , description, amount} = payload;
		const validationPayload = {proposalId , startDate, endDate , winningPercentage, concept, tokenAddress, status, proposer, name , description}
		if (payload.concept !== 3) {
			validationPayload.tokenHolders = tokenHolders;
		}

		if (payload.concept === 3) {
			validationPayload.amount = amount;
		}
		const { success, formData, message } = genericValidations(validationPayload);
		console.log('createproposal',message,validationPayload)
		// return
		if (success == true) {
			await axios({
				method: 'post',
				url: `${key.apiUrl}/proposal/createProposal`,
				data: formData,
				headers: {
					'content-type': 'multipart/form-data',
				}
			}).then(res => {
				console.log(res);
				dispatch({
					type: SAVE_PROPOSAL,
					payload: res.data,
				})
			}).catch(error => {
				dispatch({
					type: SAVE_PROPOSAL_ERROR,
					error: error,
				})
			})
		} else {
			dispatch({
				type: SAVE_PROPOSAL_ERROR,
				error: message,
			})
		}
	} catch (error) {
		dispatch({
			type: SAVE_PROPOSAL_ERROR,
			error: error,
		})
	}
}

export const getTokenHolderAction = (payload) => async dispatch => {
	try {
		dispatch({
			type : LOADING,
			payload : true
		})
		await axios({
			method: 'get',
			url: `${key.apiUrl}/settings/getTokenHolders`,
			params: !isEmpty(payload) ? payload : {daoId : 'default'}
		}).then(res => {
			console.log('GET_TOKEN_HOLDER>>>>', res,isEmpty(payload))
			if (res.status == 200)
				dispatch({
					type: GET_TOKEN_HOLDER,
					payload: { data : res.data, skiped : isEmpty(payload)},
				})

				dispatch({
					type : LOADING,
					payload : false
				})	
		}).catch(error => {
			dispatch({
				type: CATCH_ERROR,
				error: error,
			})
		});
	} catch (error) {
		dispatch({
			type: CATCH_ERROR,
			error: error,
		})
	}
}

export const setSnackOpen = (payload) => async dispatch => {
	try {
		console.log('payload',payload);
		dispatch({type : SET_SNACK_DATA,payload})
	} catch(error) {

	}
}

export const depositAction = (payload) => async dispatch => {
	try {
		const { success, formData, message } = genericValidations(payload);
		console.log(success,formData)
		if(success) {
			await axios({
				method: 'post',
				url: `${key.apiUrl}/finance/deposit`,
				data: formData
			}).then(res => {
				console.log('Deposit>>>>', res.data,res)
				if (res.status == 200)
					dispatch({
						type: SAVE_DEPOSIT,
						payload: res.data,
					})
			}).catch(error => {
				dispatch({
					type: CATCH_ERROR,
					error: error,
				})
			});
		}
		
	} catch ( error) {
		dispatch({
			type: CATCH_ERROR,
			error: error,
		})
	}
}

export const cryptoConvertionAction = (payload) => async dispatch => {
	try {
		dispatch({
			type : LOADING,
			payload : true
		})
		let respData = await axios({
			'method': 'get',
			'url': `https://min-api.cryptocompare.com/data/price?fsym=${payload}&tsyms=USD`,
		});
		console.log('respData.data', respData.data)
		dispatch({
			type: GET_CONVERTION,
			payload: respData.data
		})
		dispatch({
			type : LOADING,
			payload : false
		})
	}
	catch (err) {
		dispatch({
			type: CATCH_ERROR,
			error: err
		})
	}
}

export const getFinanceAction =  (payload) => async dispatch => {
	try {
		dispatch({
			type : LOADING,
			payload : true
		})
		await axios({
			method: 'get',
			url: `${key.apiUrl}/dynamicquery`,
			params: payload
		}).then(res => {
			console.log('financeAction>>>>', res.data,res)
			dispatch({
				type : GET_FINANCE_DATA,
				payload : res.data
			})
			dispatch({
				type : LOADING,
				payload : false
			})
		}).catch(error => {
			// dispatch({
			// 	type : 
			// })
		});
	} catch (error) {
		console.log(error)
	}
}

export const getProposal =  (payload) => async dispatch => {
	try{
		dispatch({
			type : LOADING,
			payload : true
		})
		await axios({
			method: 'get',
			url: `${key.apiUrl}/proposal/getProposal`,
			params: payload
		}).then(res => {
			console.log('getproposal>>>>', res.data,res)
			dispatch({
				type : GET_PROPOSAL,
				payload : res.data
			})
			dispatch({
				type : LOADING,
				payload : false
			})
		}).catch(error => {
			// dispatch({
			// 	type : 
			// })
		});
	} catch(error) {

	}
}

export const getVotePercentagesActions = (payload) => async dispatch => { 
	try{
		await axios({
			method: 'post',
			url: `${key.apiUrl}/proposal/getVotePercentages`,
			data: payload
		}).then(res => {
			console.log('GETVOTEPERCENTAGES>>>>', res.data,res)
			dispatch({
				type : GET_PERCENTAGES,
				payload : res.data
			})
		}).catch(error => {
			// dispatch({
			// 	type : 
			// })
		});
	} catch(error) {

	}
}

export const castVoteAction = (payload) => async dispatch => { 
	try{
		await axios({
			method: 'post',
			url: `${key.apiUrl}/proposal/castingVote`,
			data: payload
		}).then(res => {
			console.log('castingVote>>>>', res.data,res)
			dispatch({
				type : CASTING_VOTE,
				payload : res.data
			})
		}).catch(error => {
			// dispatch({
			// 	type : 
			// })
		});
	} catch(error) {

	}
}
 export const executeAction = (payload) => async dispatch => {
	try {
		await axios({
			method: 'post',
			url: `${key.apiUrl}/proposal/execute`,
			data: payload
		}).then(res => {
			console.log('castingVote>>>>', res.data,res)
			dispatch({
				type : EXECUTE_PROPOSAL,
				payload : res.data
			})
		}).catch(error => {
			// dispatch({
			// 	type : 
			// })
		});
	} catch (error) {

	}
 }