import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainContainer from './MainContainer';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/core/styles';
import { useData } from '../context/DataContext';
import PrimaryButton from './PrimaryButton';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';

const useStyles = makeStyles({
	spacing: {
		margin: '2rem 0'
	}
});

const Result = () => {
	const { data } = useData();
	const [success, setSuccess] = useState(false);
	const styles = useStyles();

	const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');
	const { files } = data;

	const onSubmit = async () => {
		const formData = new FormData();
		if (data.files) {
			data.files.forEach((file) => {
				formData.append('files', file, file.name);
			});
		}
		entries.forEach((entry) => {
			formData.append(entry[0], entry[1]);
		});

		try {
			const response = await fetch('http://localhost:4000/', {
				method: 'POST',
				body: formData
			});

			if (response.status === 200) {
				Swal.fire('Great job!', 'The form has been submitted successfully', 'success');
				setSuccess(true);
			}
		} catch (error) {
			console.log('Unknown error occurred while submitting form data');
		}
	};

	if (success) {
		return <Confetti />;
	}

	return (
		<MainContainer>
			<Typography component='h2' variant='h5'>
				Form Values
			</Typography>
			<TableContainer component={Paper} className={styles.spacing}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Field</TableCell>
							<TableCell>Value</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{entries.map((entry) => (
							<TableRow key={entry[0]}>
								<TableCell>{entry[0]}</TableCell>
								<TableCell>{entry[1].toString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{files && (
				<>
					<Typography component='h2' variant='h5'>
						Files
					</Typography>
					<List>
						{files.map((file, index) => (
							<ListItem key={index}>
								<ListItemIcon>
									<InsertDriveFile />
								</ListItemIcon>
								<ListItemText primary={file.name} secondary={file.size} />
							</ListItem>
						))}
					</List>
				</>
			)}
			<PrimaryButton type='button' onClick={onSubmit}>
				Submit
			</PrimaryButton>
			<Link to='/'>Start Over</Link>
		</MainContainer>
	);
};

export default Result;
