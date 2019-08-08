import React from 'react';
import classes from './Contact.css';

//Contact page that users can find a link to email the Motivity team. Clicking the link will open the user's main email app on their device. 

const contact = ()=>{

    return (
        <div className ={classes.Contact}>
            <div className ={classes.InformationBox}>

                <h3>Contact Information</h3>
                <p>If you wish to contact the team at Motivity for any reason feel free to get in touch with us via this
                    <a href={"mailto:wearemotivity@gmail.com"}target={"_blank"}> email</a>.
                    We're always open to hearing new suggestions and tips from users on how we can improve the app!
                    If you have any concerns or questions about using the app and our helpful AI assistant can't help,
                    then send us an email and we'll be in touch!
                </p>
            </div>
        </div>
    );
};

export default contact;

