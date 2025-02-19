const express = require('express');
const fetchuser = require('../middleware/Fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Enroll = require('../models/Enroll');

router.post(
    "enroll",
    // calling middleware to validate the token
    fetchuser,
    [
        body("courseId", "Course name must be atleast 3 characters...").isLength({min: 5}),
        body("paymentId", "Enter a Valid Payment ID").isLength({min: 5}),
        body("Address", "Enter a Valid Address").isLength({min: 5})
    ],

    async(req, res)=>{
        try{
            const{ courseId, paymentId, Address} = req.body;

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({error: errors.array()[0].msg});
            }

            const data = new Enroll({
                courseId,
                paymentId,
                Address,
                user: req.user.id
            });

            let courseIds = await Enroll.findOne({ courseId: req.body.courseId});
            let user_ID = await Enroll.findOne({ email: req.body.email});

            try{
                if(courseIds && user_ID){
                    return res.status(400).json({error: "Course already enrolled."});
                }

                const saveData = await data.save();
                res.json(saveData);
            }catch(error){
                console.error(error.message);
                res.status(500).send({message: error.message});
            }
        }catch(error){
            console.error(error.message);
            res.status(500).send({message: error.message});
        }
    }
);