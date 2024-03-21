build:
	docker build -t self-driving-car-js:v1 .

start:
	docker run -p 8080:80 --name self-driving-car-js self-driving-car-js:v1

stop:
	docker stop self-driving-car-js
	docker rm self-driving-car-js


dev:
	#make stop
	docker run -p 8080:80 -v ${PWD}/app:/usr/share/nginx/html --name self-driving-car-js self-driving-car-js:v1


restart:
	make stop
	make start