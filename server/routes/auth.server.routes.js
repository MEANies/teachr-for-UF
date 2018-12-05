/* Dependencies */
var express = require('express'),
    User = require('../models/users.server.model.js'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    router = express.Router();

function getUser(username) {
    return new Promise((resolve, reject) => {
        User.findOne({username}, function(err, doc){
            if(err){
                reject(err);
            }
            else{
                resolve(doc);
            }
        });
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email }, function(err, doc){
            if(err){
                reject(err);
            }
            else{
                resolve(doc);
            }
        });
    });
}

router.put("/change", async (req, res, next) => {

    try {
        const user = await getUser(req.body.username);
        if (!user) {
            return res.status(400).send("Error in PUT request: username entered does not exist!");
        }
        user.research = req.body.research;
        
        var putUser = new User(user);
    
        putUser.save(function(err){
            if(err){
                return res.status(500).send("Internal Server Error while trying to save document!");
            }
            return res.status(200).json(putUser);
        });

    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }
});

router.put("/changeSocial", async (req, res, next) => {

    try {
        const user = await getUser(req.body.username);
        if (!user) {
            return res.status(400).send("Error in PUT request: username entered does not exist!");
        }
        user.social = req.body.social;
        
        var putUser = new User(user);
    
        putUser.save(function(err){
            if(err){
                return res.status(500).send("Internal Server Error while trying to save document!");
            }
            return res.status(200).json(putUser);
        });

    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }
});

router.post("/researchInfo", async function(req, res, next) {
    try {
        const user = await getUser(req.body.username);
        if (!user) {
            return res.status(400).send("Error in PUT request: username entered does not exist!");
        }
        console.log(user.research)
        res.status(200).json(user.research);

    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }

});

router.post("/socialInfo", async function(req, res, next) {
    try {
        const user = await getUser(req.body.username);
        if (!user) {
            return res.status(400).send("Error in post request: username entered does not exist!");
        }
        console.log(user.social)
        res.status(200).json(user.social);

    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }

});

router.delete("/delete", async (req, res, next) => {

    try {
        const user = await getUser(req.body.username);
        if (!user) {
            return res.status(400).send(`The username (${req.body.username}) you tried to delete does not exist in the system!`);
        }

        User.findOneAndRemove({username: req.body.username}, function(err, data){
            if(err){
                return res.status(500).send("Internal Server Error occured while attempting to delete user object with username " + req.body.username);
            }
            return res.status(200).json(data);
        });

    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }
});

router.post("/create", async (req, res, next) => {

    try {
        const user = await getUser(req.body.username);
        if (user) {
            return res.status(400).send("Invalid request! Username already exists in the system!");
        }

        const userByEmail = await getUserByEmail(req.body.email);

        if (userByEmail) {
            return res.status(400).send("Invalid request! Email already exists in the system!");
        }

        var userObject = {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
            courses: req.body.courses
        };
        userObject.tempToken = jwt.sign({username: userObject.username, email: userObject.email}, 'Hello', {expiresIn: '1 days'});
        
    
        var newUser = new User(userObject);
        newUser.save(function(err){
    
            if(err){
                console.log(err.message);
                return res.status(500).send("Internal Server Error while trying to write new user object into DB!");
            }
            return res.status(200).json(userObject);
    
        });

    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }
});

router.post("/authorize", async (req, res, next) => {

    try {
        const user = await getUser(req.body.username);
        if (!user) {
            return res.status(400).send("The following username entered does not exist in the DB: " + req.body.username);
        }

        // if(user.password === req.body.password){
        //     return res.redirect('../../home.html');
        // }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result === true) {
                var token = jwt.sign({
                    username: req.body.username,
                    email: req.body.email
                }, 'Hello', {
                    expiresIn: '1 days'
                });
                console.log('role: ', user.role)
                console.log('token: ', token)
                res.json({
                    token: token,
                    role: user.role,
                    username: user.username
                });
            } else {
                console.log('UNAUTHORIZED User: Incorrect password for username ' + req.body.username)
                res.status(401).send('unauthorized');
            }
        })
    
        //return res.status(401).send("UNAUTHORIZED ACCESS: Incorrect password for username " + req.body.username + "!!!");
    
    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }


});

router.get('/getuser/:username', async function(req, res, next) {
    try {
        const user = await getUser(req.params.username);
        if (!user) {
            return res.status(400).send("Error in post request: username entered does not exist!");
        }
        console.log(user)
        res.json(user);

    } catch (error) {
        return res.status(500).send("Internal Server Error occured while trying to query MongoDB!");
    }
})


module.exports = router;