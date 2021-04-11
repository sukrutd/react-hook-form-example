import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import MainContainer from './MainContainer';
import Typography from '@material-ui/core/Typography';
import { useData } from '../context/DataContext';
import Form from './Form';
import FileInput from './FileInput';
import PrimaryButton from './PrimaryButton';

const Step3 = () => {
	const { data, setValues } = useData();
	const history = useHistory();

	const { control, handleSubmit } = useForm({
		defaultValues: {
			files: data.files
		}
	});

	const onSubmit = (values) => {
		history.push('/result');
		setValues(values);
	};

	return (
		<MainContainer>
			<Typography component='h2' variant='h5'>
				Step 3
			</Typography>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FileInput control={control} name='files' />
				<PrimaryButton type='submit'>Next</PrimaryButton>
			</Form>
		</MainContainer>
	);
};

export default Step3;
