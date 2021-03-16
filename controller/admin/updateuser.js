const USER = require('../../model/users');
const bcrypt = require('bcrypt');

// @ROUTE   GET /admin/update
// @DEC     Route for updating user
// @ACCESS  Private

exports.updateuser = async (req, res, next) => {
    try {
        const { _id, email, name, password} = req.body;

        if(password === ''){
            const user = await USER.findByIdAndUpdate(_id, { email, name}, {
                new: true,
                runValidators: true
            })

            res.status(200).json({success: true, msg: 'User Data Updated!'})
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await USER.findByIdAndUpdate(_id, { email, name, password: hashedPassword}, {
                new: true,
                runValidators: true
            })

            res.json({success: true, msg: 'User Data Updated!'})
        }
 
    } catch (error) {
        res.status(400).json({success: false, msg: `error.message`})
    }
} 