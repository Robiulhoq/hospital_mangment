
# Hospital management soloution(MERN STACK)

● Developed a financial module for real-time income and expense tracking, complete with interactive charts for data analysis.




## Dashboard

![App Screenshot](https://res.cloudinary.com/dv8sz8mml/image/upload/v1694668054/Hospital_managment/Screenshot_from_2023-09-10_17-37-35_calxzp.png)


● Implemented secure user authentication and role-based access, ensuring data privacy and efficient user
management.





## Login Page

![App Screenshot](https://res.cloudinary.com/dv8sz8mml/image/upload/v1694668054/Hospital_managment/Screenshot_from_2023-09-14_11-03-29_g01o4l.png)


● Implemented secure user authentication and role-based access, ensuring data privacy and efficient user
management.
## Invoice
![App Screenshot](https://res.cloudinary.com/dv8sz8mml/image/upload/v1694668054/Hospital_managment/invoice_vtlmjy.png)

● Integrated bed management, invoice generation, and HR solutions for enhanced operational efficiency
and patient care.
## Add Prescription
![App Screenshot](https://res.cloudinary.com/dv8sz8mml/image/upload/v1694668055/Hospital_managment/prescription_fuaglb.png)

● Designed a secure API with user authentication and authorization to safeguard data integrity and
confidentiality.
## Demo

This application is deployed on Vercel Please check it out 😄 here.

https://hospital-mangment.vercel.app
## Installation

Some basic Git commands are:

```bash
git clone https://github.com/Robiulhoq/hospital_mangment.git
npm install 
npm start

```
Start Server
```bash
cd Server
npm install 
nodemon index.js

```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
If you need CLOUDNAME, API_KEY, API_SECRET fast create accout cloudinary.com and get your environment variables.

or you get DB_PASS and DB_USER in mongodb

`CLOUDNAME`

`API_KEY`

`API_SECRET`

`DB_USER`

`DB_PASS`


## Examples

```javascript
cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key:process.env.apiKey ,
  api_secret: process.env.apiSecret
});

`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tx9ov.mongodb.net/HospitalManagment?retryWrites=true&w=majority`
```

