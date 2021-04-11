import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useData } from '../context/DataContext';
import MainContainer from './MainContainer';
import Form from './Form';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';

const normalizePhoneNumber = (value) => {
	const phoneNumber = parsePhoneNumberFromString(value);
	if (!phoneNumber) return value;
	return phoneNumber.formatInternational();
};

// Yup validation schema
const schema = Yup.object().shape({
	email: Yup.string().email('Invalid email format').required('Required')
});

const Step2 = () => {
	const { data, setValues } = useData();
	const history = useHistory();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: { email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber },
		resolver: yupResolver(schema),
		mode: 'onBlur'
	});

	const onSubmit = (values) => {
		history.push('/step3');
		setValues(values);
	};

	const { ref: checkboxRef, ...checkboxProps } = register('hasPhone');

	const hasPhone = watch('hasPhone');

	return (
		<MainContainer>
			<Typography component='h2' variant='h5'>
				Step 2
			</Typography>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					type='email'
					label='Email'
					error={!!errors.email}
					helperText={errors?.email?.message}
					{...register('email')}
				/>
				<FormControlLabel
					control={
						<Checkbox
							inputRef={checkboxRef}
							defaultValue={data.hasPhone}
							defaultChecked={data.hasPhone}
							color='primary'
							{...checkboxProps}
						/>
					}
					label='Do you have a phone'
				/>
				{hasPhone && (
					<FormInput
						type='tel'
						label='Phone Number'
						handleChange={(event) => {
							event.target.value = normalizePhoneNumber(event.target.value);
						}}
						{...register('phoneNumber')}
					/>
				)}
				<PrimaryButton type='submit'>Next</PrimaryButton>
			</Form>
		</MainContainer>
	);
};

export default Step2;
