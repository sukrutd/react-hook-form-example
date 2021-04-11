import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@material-ui/core/Typography';
import { useData } from '../context/DataContext';
import MainContainer from './MainContainer';
import Form from './Form';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';

// Yup validation schema
const schema = Yup.object().shape({
	firstName: Yup.string()
		.matches(/^([^0-9]*)$/, 'First Name cannot contain numbers')
		.required('Required'),
	lastName: Yup.string()
		.matches(/^([^0-9]*)$/, 'Last Name cannot contain numbers')
		.required('Required')
});

const Step1 = () => {
	const { data, setValues } = useData();
	const history = useHistory();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: { firstName: data.firstName, lastName: data.lastName },
		resolver: yupResolver(schema),
		mode: 'onBlur'
	});

	const onSubmit = (values) => {
		history.push('/step2');
		setValues(values);
	};

	return (
		<MainContainer>
			<Typography component='h2' variant='h5'>
				Step 1
			</Typography>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					type='text'
					label='First Name'
					error={!!errors.firstName}
					helperText={errors?.firstName?.message}
					{...register('firstName')}
				/>
				<FormInput
					type='text'
					label='Last Name'
					error={!!errors.lastName}
					helperText={errors?.lastName?.message}
					{...register('lastName')}
				/>
				<PrimaryButton type='submit'>Next</PrimaryButton>
			</Form>
		</MainContainer>
	);
};

export default Step1;
