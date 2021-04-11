const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(fileUpload({ createParentPath: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/', (req, res) => {
	try {
		if (req.files && req.files.files) {
			[req.files.files].flat().forEach((file) => {
				file.mv('./uploads/' + file.name);
			});
		}

		fs.writeFile('./uploads/data.json', JSON.stringify(req.body), 'utf8', () => {
			res.json({ status: true, message: 'Data is uploaded' });
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
