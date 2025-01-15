const Menu = require('../Schemas/MenuMasterSchema');

const SaveMenu = async (req,res) =>{
    try {

        console.log(req.body);

        const menuItems = req.body.menuItems; 
        const {menuName,navigateUrl,parentmenuid,icon, description, order} = req.body;

        for (const item of menuItems) {
            const { menuName, navigateUrl, icon, description, order } = item;
            
            const newMenu = new Menu({
                menuName,
                navigateUrl,
                icon,
                description,
                order
            });

            await newMenu.save();   
        }
        
        return res.status(200).json({success:true , message :'menu added'});
        

    } catch (error) {
        return res.status(500).json({success:true , message :error});
        
    }
}


const GetParentMenu = (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}


module.exports = {SaveMenu ,GetParentMenu}