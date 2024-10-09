import axios from 'axios';
import {config ,Token } from '../../config';


export class UserDetailsClass {
    
    constructor() {
        if (UserDetailsClass.instance) {
            return UserDetailsClass.instance;
        }
        
        this.UserDetails = {
            _id: 0,
            name: '',
            email: '',
            role: '',
            profileImage: '',
            recordstatus: '',
            disabled: '',
            createAt: '',
            statusdate: '',
            __v: 0,
        };
        
        UserDetailsClass.instance = this; // Store the instance
    }


    setUserDetails(userDetails) {
        this.UserDetails = {
            _id: userDetails._id !== undefined ? userDetails._id : this.UserDetails._id,
            name: userDetails.name !== undefined ? userDetails.name : this.UserDetails.name,
            email: userDetails.email !== undefined ? userDetails.email : this.UserDetails.email,
            role: userDetails.role !== undefined ? userDetails.role : this.UserDetails.role,
            profileImage: userDetails.profileImage !== undefined ? userDetails.profileImage : this.UserDetails.profileImage,
            recordstatus: userDetails.recordstatus !== undefined ? userDetails.recordstatus : this.UserDetails.recordstatus,
            disabled: userDetails.disabled !== undefined ? userDetails.disabled : this.UserDetails.disabled,
            createAt: userDetails.createAt !== undefined ? userDetails.createAt : this.UserDetails.createAt,
            statusdate: userDetails.statusdate !== undefined ? userDetails.statusdate : this.UserDetails.statusdate,
            __v: userDetails.__v !== undefined ? userDetails.__v : this.UserDetails.__v,
        };
    }

    clearUserDetails() { 
        this.UserDetails = {
            _id: 0,
            name: '',
            email: '',
            role: '',
            profileImage: '',
            recordstatus: '',
            disabled: '',
            createAt: '',
            statusdate: '',
            __v: 0,
        };
    }

    getUserLoginData() {
        console.log(`userdate   : ${JSON.stringify(this.UserDetails, null, 2)}`);
        return this.UserDetails;
    }

}
