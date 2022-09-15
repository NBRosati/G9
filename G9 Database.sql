create database G9;
use G9;
create table Registro(
ID_Reg int not null auto_increment primary key, 
Usuario varchar(50) not null,
Pass varchar(50) not null);
 select * from Registro;
 truncate table Registro;
 select * from Registro;