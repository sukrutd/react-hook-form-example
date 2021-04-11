import React from 'react';
import { Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUpload from '@material-ui/icons/CloudUpload';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#eee',
		textAlign: 'center',
		cursor: 'pointer',
		color: '#222',
		padding: '1rem',
		marginTop: '1rem'
	},
	icon: {
		color: '#888',
		fontSize: '2rem',
		marginTop: '1rem'
	}
});

const FileInput = ({ control, name }) => {
	const styles = useStyles();

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={[]}
			render={({ field: { onChange, onBlur, value } }) => (
				<>
					<Dropzone onDrop={onChange}>
						{({ getRootProps, getInputProps }) => (
							<Paper className={styles.root} variant='outlined' {...getRootProps()}>
								<CloudUpload className={styles.icon} />
								<input {...getInputProps()} name={name} onBlur={onBlur} />
								<p>Drag 'n' drop files here, or click to select files</p>
							</Paper>
						)}
					</Dropzone>
					<List>
						{value.map((file, index) => (
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
		/>
	);
};

export default FileInput;
