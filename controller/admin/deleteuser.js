const USER = require('../../model/users');

// @ROUTE   GET /admin/delete
// @DEC     Route for creating new user
// @ACCESS  Private

exports.deleteuser = async (req, res, next) => {
    try {
        const { id } = req.body;
        
        const user = await USER.findOne({id});
        user.remove();

        res.status(200).json({ success: true })

    } catch (error) {
        return res.status(404).send('NOT FOUND');
    }
}