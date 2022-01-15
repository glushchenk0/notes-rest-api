const validation = (schema) => async (req, res, next) => {
    try {
        console.log(req.body);
        await schema.validate(req.body);
        return next();
    } catch (e) {
        res.status(400).json({ error: e.errors.join(', ') });
    }
};

export default validation;
