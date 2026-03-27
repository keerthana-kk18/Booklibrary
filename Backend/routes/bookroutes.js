import express from 'express'
import upload from '../config/multer.js'
import { addbook, deletebook, editbook, getbooks, singlebook } from '../controller/bookcontroller.js'

const router=express.Router();
router.get('/getall',getbooks);
router.post('/add',upload.single('image'),addbook);
router.get('/get/:id',singlebook);
router.put('/update/:id',upload.single('image'),editbook);
router.delete('/delete/:id',deletebook);




export default router;

