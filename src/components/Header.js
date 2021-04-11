import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(3, 0),
		fontSize: '2rem',
		textAlign: 'center',
		color: 'darkcyan'
	}
}));

const Header = () => {
	const styles = useStyles();

	return (
		<Typography component='h1' className={styles.root}>
			React Hook Form Demo
		</Typography>
	);
};

export default Header;
