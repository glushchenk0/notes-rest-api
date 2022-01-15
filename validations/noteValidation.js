import * as yup from 'yup';

const noteSchema = yup.object({
    name: yup.string().required(),
    updated: yup.string().required(),
    category: yup.string().required(),
    content: yup.string().required(),
    dateslist: yup.string(),
    archived: yup.boolean().required(),
});

export default noteSchema;
