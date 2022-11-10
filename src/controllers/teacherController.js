const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentModel");

const createAdmin = async (req, res) => {
  let requestBody = req.body;
  let { name, email, password } = requestBody;

  let createdAdmin = await adminModel.create(requestBody);

  return res.status(201).send({ status: true, data: createdAdmin });
};

const login = async (req, res) => {
  let requestBody = req.body;
  let { email, password } = requestBody;

  let findAdmin = await adminModel.findOne({email});
  if (!findAdmin)
    return res
      .status(404)
      .send({ status: false, msg: "Admin not found with this email" });

  if (findAdmin.password != password)
    return res
      .status(400)
      .send({ status: false, msg: "Password is incorrect" });

  let token = jwt.sign(
    {
      userId: findAdmin._id,
    },
    "Assignment1",
    { expiresIn: "1d" }
  );

  const allStudents = await studentModel.find();
  res.setHeader("auth-key", token);

  return res
    .status(200)
    .send({ status: true, msg: "success", data: allStudents });
};

const createStudent = async (req, res) => {
  const adminId = req.params.id;
  const isAdmin = await adminModel.findById(adminId);
  if (!isAdmin)
    return res
      .status(404)
      .send({ status: false, msg: "No Admin Present with this Id " });
  const requestBody = req.body;
  const { name, subject, marks } = requestBody;

  let existStudent = await studentModel.findOne({name});

  if (!existStudent) {
    data = {
      name: name,
      subjects: [{ subject: subject, marks: marks }],
    };
    const newStudent = await studentModel.create(data);

    return res.status(201).send({ status: true, msg: "success", data: newStudent });
  } else {
    let existSubjects = existStudent.subjects;
    let flag = false;

    for (let i = 0; i < existSubjects.length; i++) {
      if (existSubjects[i].subject === subject) {
        flag = true;
        existSubjects[i].marks += marks;
      }
    }
    if (!flag) {
      subjectMarks = {
        subject: subject,
        marks: marks,
      };
      existStudent.subjects.push(subjectMarks);
    }
    existStudent.save();
    return res
      .status(200)
      .send({ status: true, msg: "success", data: existStudent });
  }
};


const filterStudents = async (req,res) => {
    let filter = req.query
     if(Object.keys(filter).length<1) return res.status(400).send({status:false, msg:"Please Apply filters"})
    

    const filteredStudents = await studentModel.find(filter)

    if(!filteredStudents) return res.status(404).send({status:false, msg:"no Student found"})

}

const deleteStudents = async (req,res) => {
    const studentId = req.params.id

    const deletedStudent = await studentModel.findById(studentId)

    if(!deletedStudent) return res.status(404).send({status:false, msg:"No student present with this Id "})

    if(deleteStudents.isDeleted === true) return res.status(400).send({status:false, msg:"Already Deleted"})
      deletedStudent.isDeleted = true;
      deleteStudents.save();

      return res.status(200).send({status:true, msg:"Deleted"})
}
module.exports = { createAdmin, login, createStudent ,filterStudents,deleteStudents};