FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 123  
ENV MYSQL_DATABASE demo  
ENV MYSQL_USER samir
ENV MYSQL_PASSWORD root

ADD db_demo.sql /docker-entrypoint-initdb.d

