import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(4, 'auto'),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
}));

const MainContainer = ({ children, ...otherProperties }) => {
	const styles = useStyles();

	return (
		<Container component='main' maxWidth='xs' className={styles.root} {...otherProperties}>
			{children}
		</Container>
	);
};

export default MainContainer;
