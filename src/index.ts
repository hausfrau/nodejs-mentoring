import express, {json} from 'express';
import { router } from './api/users-api';

export const app = express();
const {PORT = 3000} = process.env;

app.use(json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});


/*Add server-side validation for create/update operations of User entity:
• all fields are required;
• login validation is required;
• password must contain letters and numbers;
• user’s age must be between 4 and 130.
In case of any property does not meet the validation requirements or the field is absent, return 400
(Bad Request) and detailed error message.*/