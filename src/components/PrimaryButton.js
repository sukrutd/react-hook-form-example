import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(3, 0)
	}
}));

const PrimaryButton = ({ children, ...buttonProperties }) => {
	const styles = useStyles();

	return (
		<Button fullWidth variant='contained' color='primary' className={styles.root} {...buttonProperties}>
			{children}
		</Button>
	);
};

export default PrimaryButton;
