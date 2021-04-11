import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(1)
	}
}));

const Form = ({ children, ...formProperties }) => {
	const styles = useStyles();

	return (
		<form className={styles.root} noValidate {...formProperties}>
			{children}
		</form>
	);
};

export default Form;
