const {Menu, MenuRight} = require('../Schemas/MenuMasterSchema');

const SaveMenu = async (req,res) =>{
    try {

        console.log(req.body);

        const menuItems = req.body.menuItems;  
        for (const item of menuItems) {
            const { menuName, navigateUrl, icon, description, order } = item;
            console.log(item);
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
        console.log(error)
        return res.status(500).json({success:false , message :error});
        
    }
}


const GetParentMenu = async (req,res) =>{
    try {
        const data = await Menu.find().select('menuName navigateUrl parentmenuid icon class order');

        res.status(200).json({success:true , message:'view menu list' , data:data});
        console.log(data);
    } catch (error) {
        
        res.status(500).json({success:false , message:'view menu list' , error:error});
    }
}

const GetRoleAccessmenu = async(req,res) =>{
    try {
        const data = await Menu.find({isActive:true, isDelete:false});

        const menuright = await MenuRight.find({usergroup:'user'}).exec();
        const allowedMenuIds = menuRights.map((menuRight) => menuRight.menuid.toString());

        const menusWithCheckboxStatus = menus.map((menu) => ({
            ...menu.toObject(),
            checked: allowedMenuIds.includes(menu._id.toString()),  // Add checked status
          }));

          res.json(menusWithCheckboxStatus);

    } catch (error) {
        
    }
}

module.exports = {SaveMenu ,GetParentMenu ,GetRoleAccessmenu}