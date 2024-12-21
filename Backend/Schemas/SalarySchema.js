const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    basicSalary: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    houseRentAllowance: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    transportAllowance: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    medicalAllowance: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    otherDeductions: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    totalPay: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    payDate: { 
        type: Date, 
        required: true 
    },
    isDisabled: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

const SalaryTable = mongoose.model('Salary', salarySchema);
 
const SaveSalary = async (req, res) => {
    try {
        const { employeeId, payDate, salaryDetails ,basicSalary, houseRentAllowance, transportAllowance, medicalAllowance, otherDeductions } = req.body;

console.log(req.body);
     
        const totalAllowance = parseFloat(houseRentAllowance || 0) + parseFloat(transportAllowance || 0) + parseFloat(medicalAllowance || 0);
        const totalDeductions = parseFloat(otherDeductions || 0);
        const totalPay = parseFloat(basicSalary) + totalAllowance - totalDeductions;

        const lastSalary = await SalaryTable.findOne({ employeeId }).sort({ payDate: -1 });

        if (lastSalary) {
            lastSalary.isDisabled = true;   
            await lastSalary.save();  
        }
 
        const newSalary = new SalaryTable({
            employeeId,
            basicSalary,
            houseRentAllowance,
            transportAllowance,
            medicalAllowance,
            otherDeductions,
            totalPay,
            payDate,
            isDisabled: false,   
        });
 
        await newSalary.save();

        console.log(totalPay);
        res.status(200).json({ message: 'Salary saved successfully!', totalPay });

    } catch (error) {
        // Catch any errors and respond with a failure message
        console.error('Error saving salary:', error);
        res.status(500).json({ message: 'Error saving salary', error });
    }
};


module.exports = { SalaryTable,SaveSalary };
