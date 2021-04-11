import React, { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';

const FormInput = (
	{ type = 'text', variant = 'outlined', margin = 'normal', label, handleChange, ...inputProperties },
	ref
) => (
	<TextField
		{...inputProperties}
		inputRef={ref}
		onChange={handleChange}
		variant={variant}
		margin={margin}
		label={label}
		type={type}
		fullWidth
	/>
);

export default forwardRef(FormInput);
