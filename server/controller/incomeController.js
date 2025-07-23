const Income = require("../models/IncomeModel");
const User = require("../models/UsersModel");

//add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    const { icone, source, amount, date } = req.body;       
    try {
        const income = new Income({
            user: userId,
            icone,
            source,
            amount,
            date
        });
        await income.save();
        res.status(201).json({ message: "Income added successfully", income });
    } catch (error) {
        res.status(500).json({ message: "Error adding income", error: error.message });
    }           
}


//get all income sources
exports.getAllIncome = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}       

//delete income source
exports.deleteIncomedowloadIncomeExcel = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
//download income as excel
exports.downloadIncomeExcel = async (req, res) => {};
