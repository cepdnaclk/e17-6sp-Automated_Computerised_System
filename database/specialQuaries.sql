USE victa;

CREATE USER 'user1FM'@'localhost' IDENTIFIED BY 'password1FM';

GRANT ALL PRIVILEGES ON victa.* TO 'user1FM'@'localhost';

DELETE FROM factory_manager
	WHERE UserName = "user2FM";