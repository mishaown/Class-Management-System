const ARTICLES = require('../../model/articles');

// @ROUTE   GET /teacher/myarticles
// @DEC     Route for my articles
// @ACCESS  Private
exports.getmyarticles = async (req, res, next) => {
    try {
        const blogs = await ARTICLES.find();

        let articles = []

        if (blogs) {
            blogs.forEach((blog)=> {
                articles.push({
                    title: blog.title,
                    description: blog.description,
                    markdown: blog.markdown, 
                    createdAt: blog.createdAt
                })
            })
        }

        res.render('teacher/teacher_dash', {title: 'Your Articles', myarticles: true, articles, usr_name: req.user.name, usr_id: req.user.id})

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// @ROUTE   GET /teacher/newarticle
// @DEC     Route for my articles
// @ACCESS  Private
exports.newarticle = (req, res, next) => {

    res.render('teacher/teacher_dash', {title: 'Your Articles', newarticle: true, usr_name: req.user.name, usr_id: req.user.id})
}

// @ROUTE   POST /teacher/postarticle
// @DEC     Route for posting new articles
// @ACCESS  Private

exports.postarticle = async (req, res, next) => {

    try {
        const { title, description, markdown } = req.body;

        const article = new ARTICLES({ title, description, markdown, createdBy: req.user._id });
        await article.save()

    } catch (error) {
        res.send(error.message);
    }

    res.render('teacher/teacher_dash', {title: 'Articles', newarticle: true, usr_name: req.user.name, usr_id: req.user.id})
}
