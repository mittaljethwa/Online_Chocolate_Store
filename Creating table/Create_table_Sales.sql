use jadrn020;

drop table if exists SALES;

create table SALES(
    sku VARCHAR(20) NOT NULL
    ,quantity INT NOT NULL
    ,order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ); 

-- INSERT INTO runner VALUES (0,'Mittal',NULL,'Jethwa','12 Main Street',NULL,'San Diego','CA','92115','mittal@gmail.com','1234567890','1993-03-08','Female','Adult',NULL,'Experienced','uploaded_images/1.jpg');
-- INSERT INTO runner VALUES (0,'Madhuri',NULL,'Dhodi','123 M Street',NULL,'San Diego','CA','92115','mdhodi@gmail.com','1234353434','1996-02-07','Female','Adult',NULL,'Novice','uploaded_images/2.jpg');
-- INSERT INTO runner VALUES (0,'Robert',NULL,'Jones','1252 Abbott St','21','San Diego','CA','92121','abc@gmail.com','2323232323','2003-02-01','Male','Teen','Asthama','Novice','uploaded_images/3.jpg');
-- INSERT INTO runner(fname,mname,lname,address1,address2,city,state,zip,email,phone,dob,gender,category,med_conditions,exp_level,img_path) VALUES('Mittal','','Jethwa','My Street','123','San Diego','CA','92115','mittaljethwa9383@gmail.com','6196840258','19930803','female','Adult','','Experienced','uploaded_images/4.jpg');  
