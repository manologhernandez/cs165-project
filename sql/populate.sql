# MANOLO HERNANDEZ 2017-00181 CS 165 #

# DBMS used: MySQL

DROP DATABASE IF EXISTS Hernandez;
CREATE DATABASE Hernandez;
USE Hernandez;

CREATE TABLE PlanLockUp(
	plan varchar(50),
	lockUpPeriod INT,
	PRIMARY KEY(plan)
);
CREATE TABLE DeviceInfo(
	imeiNo INT,
	deviceModel varchar(50),
	handsetBasePrice INT,
	deviceReleaseDate DATE,
	PRIMARY KEY(imeiNo)
);
CREATE TABLE DeviceCashout(
	plan varchar(50),
	imeiNo INT,
	handsetCashOut INT,
	PRIMARY KEY(plan, imeiNo),
	FOREIGN KEY(plan) REFERENCES PlanLockUp(plan),
	FOREIGN KEY(imeiNo) REFERENCES DeviceInfo(imeiNo)
);
CREATE TABLE Remarks(
	remarksID INT auto_increment,
	planRemarks varchar(255),
	deviceRemarks varchar(255),
	PRIMARY KEY(remarksID)
);
CREATE TABLE Promotions(
	promoID INT,
	promo varchar(50),
	PRIMARY KEY(promoID)
);
CREATE TABLE UserAccount(
	mobileNo BIGINT,
	accountNo INT auto_increment,
	firstName varchar(50),
	middleName varchar(50),
	lastName varchar(50),
	birthday DATE,
	deliveryAddress varchar(255),
	simSerialNo INT,
	PRIMARY KEY(accountNo)
);
CREATE TABLE UpdateForm(
	orderNo INT auto_increment,
	accountNo INT NOT NULL,
	plan varchar(50) NOT NULL ,
	monthlyServiceFee INT NOT NULL,
	imeiNo INT NULL,
	modeOfPayment varchar(50) NOT NULL,
	remarksID INT,
	promoID INT,
	PRIMARY KEY(orderNo),
	FOREIGN KEY(plan) REFERENCES PlanLockUp(plan),
	FOREIGN KEY(remarksID) REFERENCES Remarks(remarksID),
	FOREIGN KEY(promoID) REFERENCES Promotions(promoID),
	FOREIGN KEY(imeiNo) REFERENCES DeviceInfo(imeiNo),
	FOREIGN KEY(accountNo) REFERENCES UserAccount(accountNo)
); 
CREATE TABLE CallnTextPacksPerOrderNo(
	orderNo INT,
	CallnTextPack varchar(50),
	PRIMARY KEY(orderNo, CallnTextPack),
	FOREIGN KEY(orderNo) REFERENCES UpdateForm(orderNo) ON DELETE CASCADE
);
CREATE TABLE LifestylePacksPerOrderNo(
	orderNo INT,
	LifestylePack varchar(50),
	PRIMARY KEY(orderNo, LifestylePack),
	FOREIGN KEY(orderNo) REFERENCES UpdateForm(orderNo) ON DELETE CASCADE
);
CREATE TABLE SurfPacksPerOrderNo(
	orderNo INT,
	SurfPack varchar(50),
	PRIMARY KEY(orderNo, SurfPack),
	FOREIGN KEY(orderNo) REFERENCES UpdateForm(orderNo) ON DELETE CASCADE
);

INSERT INTO PlanLockUp VALUES 
	('ThePlan 199', 24), 
	('ThePlan 499', 24),
	('ThePlan 799', 18),
	('ThePlan 999', 24), 
	('ThePlan 1299', 24);

INSERT INTO DeviceInfo VALUES
	(10001, 'Apple iPhone11 - 128GB', 50000, '2019-09-20'),
	(10002, 'Apple iPhone11 - 256GB', 60000, '2019-09-20'),
	(10003, 'Apple iPhone11 - 512GB', 70000, '2019-09-20'),
	(10004, 'Apple iPhone11 Pro - 128GB', 70000, '2019-09-20'),
	(10005, 'Apple iPhone11 Pro - 256GB', 80000, '2019-09-20'),
	(10006, 'Apple iPhone11 Pro - 512GB', 90000, '2019-09-20'),
	(10007, 'Apple iPhone11 Pro Max - 128GB', 90000, '2019-09-20'),
	(10008, 'Apple iPhone11 Pro Max - 256GB', 100000, '2019-09-20'),
	(10009, 'Apple iPhone11 Pro Max - 512GB', 110000, '2019-09-20'),
	(10010, 'Google Pixel 4 - 128GB', 40000, '2019-10-04'),
	(10011, 'Google Pixel 4 - 256GB', 50000, '2019-10-04'),
	(10012, 'Google Pixel 4 - 512GB', 60000, '2019-10-04'),
	(10013, 'Samsung Galaxy Note 10 - 128GB', 80000, '2019-08-07'),
	(10014, 'Samsung Galaxy Note 10 - 256GB', 90000, '2019-08-07'),
	(10015, 'Samsung Galaxy Note 10 - 512GB', 100000, '2019-08-07');

INSERT INTO DeviceCashout VALUES
	('ThePlan 199', 10001, 20000), 
	('ThePlan 199', 10002, 22000), 
	('ThePlan 199', 10003, 24000),
	('ThePlan 199', 10004, 24000), 
	('ThePlan 199', 10005, 26000), 
	('ThePlan 199', 10006, 28000), 
	('ThePlan 199', 10007, 30000), 
	('ThePlan 199', 10008, 32000), 
	('ThePlan 199', 10009, 34000), 
	('ThePlan 199', 10010, 20000), 
	('ThePlan 199', 10011, 22000), 
	('ThePlan 199', 10012, 24000), 
	('ThePlan 199', 10013, 30000), 
	('ThePlan 199', 10014, 32000), 
	('ThePlan 199', 10015, 34000),  
	('ThePlan 499', 10001, 15000), 
	('ThePlan 499', 10002, 17000), 
	('ThePlan 499', 10003, 19000),
	('ThePlan 499', 10004, 19000), 
	('ThePlan 499', 10005, 21000), 
	('ThePlan 499', 10006, 23000), 
	('ThePlan 499', 10007, 23000), 
	('ThePlan 499', 10008, 25000), 
	('ThePlan 499', 10009, 27000), 
	('ThePlan 499', 10010, 20000), 
	('ThePlan 499', 10011, 22000), 
	('ThePlan 499', 10012, 24000), 
	('ThePlan 499', 10013, 25000), 
	('ThePlan 499', 10014, 27000), 
	('ThePlan 499', 10015, 29000),  
	('ThePlan 799', 10001, 10000), 
	('ThePlan 799', 10002, 11000), 
	('ThePlan 799', 10003, 12000),
	('ThePlan 799', 10004, 12000), 
	('ThePlan 799', 10005, 13000), 
	('ThePlan 799', 10006, 14000), 
	('ThePlan 799', 10007, 15000), 
	('ThePlan 799', 10008, 16000), 
	('ThePlan 799', 10009, 17000), 
	('ThePlan 799', 10010, 12000), 
	('ThePlan 799', 10011, 13000), 
	('ThePlan 799', 10012, 14000), 
	('ThePlan 799', 10013, 17000), 
	('ThePlan 799', 10014, 18000), 
	('ThePlan 799', 10015, 19000),  
	('ThePlan 999', 10001, 7000), 
	('ThePlan 999', 10002, 8000), 
	('ThePlan 999', 10003, 9000),
	('ThePlan 999', 10004, 9000), 
	('ThePlan 999', 10005, 10000), 
	('ThePlan 999', 10006, 11000), 
	('ThePlan 999', 10007, 12000), 
	('ThePlan 999', 10008, 13000), 
	('ThePlan 999', 10009, 14000), 
	('ThePlan 999', 10010, 8000), 
	('ThePlan 999', 10011, 9000), 
	('ThePlan 999', 10012, 10000), 
	('ThePlan 999', 10013, 12000), 
	('ThePlan 999', 10014, 13000), 
	('ThePlan 999', 10015, 14000),  
	('ThePlan 1299', 10001, 4000), 
	('ThePlan 1299', 10002, 5000), 
	('ThePlan 1299', 10003, 6000),
	('ThePlan 1299', 10004, 7000), 
	('ThePlan 1299', 10005, 8000), 
	('ThePlan 1299', 10006, 9000), 
	('ThePlan 1299', 10007, 10000), 
	('ThePlan 1299', 10008, 1100), 
	('ThePlan 1299', 10009, 1200), 
	('ThePlan 1299', 10010, 4000), 
	('ThePlan 1299', 10011, 5000), 
	('ThePlan 1299', 10012, 6000), 
	('ThePlan 1299', 10013, 10000), 
	('ThePlan 1299', 10014, 1100), 
	('ThePlan 1299', 10015, 1200);

INSERT INTO Remarks (planRemarks, deviceRemarks) VALUES
	('Upgrading to new plan', 'Brand New'),
	(NULL, 'Secondhand Device'),
	('Changing from ThePlan 199', 'Brand New');

INSERT INTO Promotions VALUES
	(1, NULL),
	(2, '1st Month Free'),
	(3, 'BPI 0% Interest');	

INSERT INTO UserAccount (mobileNo, firstName, middleName, lastName, birthday, deliveryAddress, simSerialNo) VALUES
	(09178303304, 'Manolo', NULL, 'Hernandez', '1999-12-16', '22 Malingap St. Quezon City', 101010),
	(09171238761, 'Bea', 'B.', 'Miranda', '1999-09-24', '123 Maayusin St. Quezon City', 232323),
	(09151010101, 'Nikolo', 'L.', 'Dela Cruz', '1999-11-29', '100 Kamagong St, Muntinlupa City', 555555);

INSERT INTO UpdateForm (accountNo, plan, monthlyServiceFee, imeiNo, modeOfPayment, remarksID, promoID) VALUES
	(1, 'ThePlan 499', 599, 10001, 'Cash', 1, 2),
	(2, 'ThePlan 199', 299, 10002, 'Cash', 2, 1),
	(3, 'ThePlan 999', 1299, 10003, 'Credit Card', 3, 3);

INSERT INTO CallnTextPacksPerOrderNo VALUES
	(1, 'Unli Call To Landline'),
	(1, 'Unli Call To Globe Subscribers'),
	(1, 'Unli Text To Globe Subscribers'),
	(2, 'Unli Text To Globe Subscribers'),
	(3, 'Unli Call To Globe Subscribers'),
	(3, 'Unli Text To Globe Subscribers');

INSERT INTO LifestylePacksPerOrderNo VALUES
	(1, 'Unli Viber'),
	(1, 'Unli Mobile Legends'),
	(1, '3 Hours Youtube'),
	(3, 'Unli Youtube');

INSERT INTO SurfPacksPerOrderNo VALUES
	(1, '2GB'),
	(1, '10GB'),
	(2, '1GB'),
	(3, '10GB');