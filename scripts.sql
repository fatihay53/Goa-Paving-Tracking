docker run --name my-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=goa_paving -d mysql:5.7.22

CREATE DATABASE IF NOT EXISTS `goa_paving` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `goa_paving`;


CREATE TABLE IF NOT EXISTS `users` (
    `id` int(11) NOT NULL,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` varchar(100) NOT NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `username`, `password`,`role`) VALUES (1, 'oboyuk', '123','ROLE_SUPERVISOR');

ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

--INSERT INTO `users` ( `username`, `password`,`role`) VALUES ('oboyuk2', '123','ROLE_FOREMAN');

-----employee-----
CREATE TABLE IF NOT EXISTS `employee` (
    `id` int(11) NOT NULL,
    `name` varchar(100) NOT NULL,
    `surname` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `user_id` int(11) NOT NULL,
    `employee_type` varchar(50),
    `hourly_cost` double
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `employee` ADD PRIMARY KEY (`id`);
ALTER TABLE `employee` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE employee ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);

insert into employee(name,surname,email,user_id,employee_type) values ('Tyler', 'Pace','ozanboyukk@gmail.com',1,'SUPERVISOR');
--insert into employee(name,surname,email,user_id,employee_type) values ('Steven', 'Pace','gozdeacar13@gmail.com',2,'FOREMAN');

-----new_client_form-----
CREATE TABLE IF NOT EXISTS `new_client_form` (
    `id` int(11) NOT NULL,
    `clientName` varchar(255) NOT NULL,
    `firstName` varchar(255),
    `lastName` varchar(255),
    `streetAddress` varchar(255) NOT NULL,
    `streetAddress2` varchar(255),
    `city` varchar(255),
    `province` varchar(255),
    `postalCode` varchar(255),
    `phoneNumber` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `created_date` datetime
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `new_client_form` ADD PRIMARY KEY (`id`);
ALTER TABLE `new_client_form` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

--project category--
CREATE TABLE IF NOT EXISTS `project_category` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL
    );

ALTER TABLE `project_category` ADD PRIMARY KEY (`id`);
insert into project_category(id,name) values(1,'Milling');
insert into project_category(id,name) values(2,'Paving');
insert into project_category(id,name) values(3,'Site Work');

----estimate_template---
CREATE TABLE IF NOT EXISTS `estimate_template` (
    `id` int(11) NOT NULL,
    `date` date NOT NULL,
    `project_name` varchar(255) NOT NULL,
    `project_category_id` int(11) NOT NULL,
    `estimate_project_hour` double NOT NULL,
    `total_m2` double NOT NULL,
    `subcontractor_json` json,
    `external_rent_json` json,
    `internal_rent_json` json,
    `equipment_cost_json` json,
    `cold_milling_json` json,
    `traffic_control_json` json,
    `employee_json` json,
    `materials_json` json,
    `employee_foreman_json` json,
    `bid` double NOT NULL,
    `profit` double NULL,
    `status` varchar(50) DEFAULT 'Pending',
    `created_date` datetime
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `estimate_template` ADD PRIMARY KEY (`id`);
ALTER TABLE `estimate_template` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE estimate_template ADD CONSTRAINT fk_pj_category_id FOREIGN KEY (project_category_id) REFERENCES project_category(id);


----tail_gate_talk_form----
CREATE TABLE IF NOT EXISTS `tail_gate_talk_form` (
    `id` int(11) NOT NULL,
    `date` date NOT NULL,
    `foremanId` int(11) NOT NULL,
    `location` varchar(255) NOT NULL,
    `estimate_template_id` int(11) NOT NULL,
    `subject` varchar(255) NOT NULL,
    `employeeSuggestions` varchar(255),
    `signature` blob NOT NULL,
    `title` varchar(255) NOT NULL,
    `created_date` datetime
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `tail_gate_talk_form` ADD PRIMARY KEY (`id`);
ALTER TABLE `tail_gate_talk_form` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE tail_gate_talk_form ADD CONSTRAINT fk_estimate_template_id_tail_gate FOREIGN KEY (estimate_template_id) REFERENCES estimate_template(id);
ALTER TABLE tail_gate_talk_form ADD CONSTRAINT fk_foreman_id_tail_gate FOREIGN KEY (foremanId) REFERENCES users(id);

-----attendees----
CREATE TABLE IF NOT EXISTS `attendees` (
    `id` int(11) NOT NULL,
    `form_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `signature` blob,
    `is_approval` boolean,
    `form_type` varchar(100)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `attendees` ADD PRIMARY KEY (`id`);
ALTER TABLE `attendees` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE attendees ADD CONSTRAINT fk_attendees_user_id FOREIGN KEY (user_id) REFERENCES users(id);

----time card---
CREATE TABLE IF NOT EXISTS `time_card` (
    `id` int(11) NOT NULL,
    `date` date NOT NULL,
    `start_hour` varchar(50) NOT NULL,
    `end_hour` varchar(50) NOT NULL,
    `total_hour` varchar(50) NOT NULL,
    `user_id` int(11) NOT NULL,
    `signature` blob,
    `is_approved` boolean,
    `approved_user_id` int(11),
    `created_date` datetime,
    `board_allowance` boolean,
    `total_hour_double` double,
    `time_deserve` double default 0.0
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `time_card` ADD PRIMARY KEY (`id`);
ALTER TABLE `time_card` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE time_card ADD CONSTRAINT fk_timecard_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE time_card ADD CONSTRAINT fk_timecard_approved_user_id FOREIGN KEY (user_id) REFERENCES users(id);

----job_type---
CREATE TABLE IF NOT EXISTS `job_type` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL
    );

ALTER TABLE `job_type` ADD PRIMARY KEY (`id`);
insert into job_type(id,name) values(1,'Culvert Resurfacing');
insert into job_type(id,name) values(2,'Driveway Resurfacing');
insert into job_type(id,name) values(3,'Parking Lot Resurfacing');
insert into job_type(id,name) values(4,'Daily Patching');

----time_card_detail---
CREATE TABLE IF NOT EXISTS `time_card_detail` (
    `id` int(11) NOT NULL,
    `time_card_id` int(11) NOT NULL,
    `job_type_id` int(11) NOT NULL,
    `hour` varchar(100) NOT NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `time_card_detail` ADD PRIMARY KEY (`id`);
ALTER TABLE `time_card_detail` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE time_card_detail ADD CONSTRAINT fk_timecard_detail_time_card_id FOREIGN KEY (time_card_id) REFERENCES time_card(id);
ALTER TABLE time_card_detail ADD CONSTRAINT fk_timecard_detail_job_id FOREIGN KEY (job_type_id) REFERENCES job_type(id);

--materials--
CREATE TABLE IF NOT EXISTS `materials` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL
    );

ALTER TABLE `materials` ADD PRIMARY KEY (`id`);
insert into materials(id,name) values(1,'Hot Mix(FC1)-6434   $/Tonne');
insert into materials(id,name) values(2,'Hot Mix-5834   $/Tonne');
insert into materials(id,name) values(3,'Granulars    $/Tonne');
insert into materials(id,name) values(4,'Tack Coat   $/M2');
insert into materials(id,name) values(5,'Hotmix Other');

----pre_job_safety_from----
CREATE TABLE IF NOT EXISTS `pre_job_safety_form` (
    `id` int(11) NOT NULL,
    `date` date NOT NULL,
    `foremanId` int(11) NOT NULL,
    `location` varchar(255) NOT NULL,
    `signatureForeman` blob NOT NULL,
    `estimate_template_id` int(11) NOT NULL,
    `general_options` json,
    `environment_options` json,
    `hazardous_options` json,
    `others` varchar(255),
    `task_list` json,
    `possible_hazard_list` json,
    `hazard_control_list` json,
    `created_date` datetime
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `pre_job_safety_form` ADD PRIMARY KEY (`id`);
ALTER TABLE `pre_job_safety_form` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE pre_job_safety_form ADD CONSTRAINT fk_estimate_template_id FOREIGN KEY (estimate_template_id) REFERENCES estimate_template(id);
ALTER TABLE pre_job_safety_form ADD CONSTRAINT fk_foreman_id_pre_job FOREIGN KEY (foremanId) REFERENCES users(id);

-----attachment----
CREATE TABLE IF NOT EXISTS `attachment` (
    `id` int(11) NOT NULL,
    `name` varchar(255),
    `data` longblob,
    `type`  varchar(255),
    `estimate_template_id` int(11) NOT NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `attachment` ADD PRIMARY KEY (`id`);
ALTER TABLE `attachment` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE attachment ADD CONSTRAINT fk_estimate_template_id_at FOREIGN KEY (estimate_template_id) REFERENCES estimate_template(id);

---hospital---
CREATE TABLE IF NOT EXISTS `hospital` (
    `id` int(11) NOT NULL,
    `name` varchar(255),
    `phone` varchar(255),
    `street` varchar(255),
    `city` varchar(255),
    `zip` varchar(255)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `hospital` ADD PRIMARY KEY (`id`);
ALTER TABLE `hospital` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

----emergency_form----
CREATE TABLE IF NOT EXISTS `emergency_form` (
    `id` int(11) NOT NULL,
    `projectId` int(11) NOT NULL,
    `supervisorId` int(11) NOT NULL,
    `foremanId` int(11) NOT NULL,
    `employee1Id` int(11),
    `employee2Id` int(11),
    `employee3Id` int(11),
    `supervisor3Id` int(11),
    `employee4Id` int(11),
    `employee5Id` int(11),
    `employee6Id` int(11),
    `employee7Id` int(11),
    `employee8Id` int(11),
    `hospitalId` int(11) NOT NULL,
    `date` date NOT NULL,
    `site` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `methodOfCommunication` varchar(255) NOT NULL,
    `emergencyMeetingLocation` varchar(255) NOT NULL,
    `officeSiteContact` varchar(255) NOT NULL,
    `siteSupervisor` varchar(255) NOT NULL,
    `hour` varchar(255) NOT NULL,
    `amPm` varchar(255) NOT NULL,
    `location` varchar(255) NOT NULL,
    `responseCheckList` json,
    `provincialGoverment` json,
    `created_date` datetime
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `emergency_form` ADD PRIMARY KEY (`id`);
ALTER TABLE `emergency_form` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_supervisor_id FOREIGN KEY (supervisorId) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_foreman_id FOREIGN KEY (foremanId) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee1_id FOREIGN KEY (employee1Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee2_id FOREIGN KEY (employee2Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee3_id FOREIGN KEY (employee3Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_supervisor3_id FOREIGN KEY (supervisor3Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee4_id FOREIGN KEY (employee4Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee5_id FOREIGN KEY (employee5Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee6_id FOREIGN KEY (employee6Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee7_id FOREIGN KEY (employee7Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_employee8_id FOREIGN KEY (employee8Id) REFERENCES employee(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_hospital_id FOREIGN KEY (hospitalId) REFERENCES hospital(id);
ALTER TABLE emergency_form ADD CONSTRAINT fk_em_estimate_id FOREIGN KEY (projectId) REFERENCES estimate_template(id);


---comments---
CREATE TABLE IF NOT EXISTS `comments` (
    `id` int(11) NOT NULL,
    `comment` varchar(255),
    `estimate_template_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `created_date` datetime
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `comments` ADD PRIMARY KEY (`id`);
ALTER TABLE `comments` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE comments ADD CONSTRAINT fk_comments_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE comments ADD CONSTRAINT fk_comments_estimate_id FOREIGN KEY (estimate_template_id) REFERENCES estimate_template(id);


-----certificates----
CREATE TABLE IF NOT EXISTS `certificates` (
    `id` int(11) NOT NULL,
    `name` varchar(255),
    `data` longblob,
    `type`  varchar(255),
    `user_id` int(11) NOT NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `certificates` ADD PRIMARY KEY (`id`);
ALTER TABLE `certificates` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
ALTER TABLE certificates ADD CONSTRAINT fk_user_id_cert FOREIGN KEY (user_id) REFERENCES users(id);

---time zone
set time_zone = 'Europe/Istanbul'
select now()