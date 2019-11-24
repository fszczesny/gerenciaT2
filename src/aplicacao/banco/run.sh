# # docker build -t aplicacao-banco-image .
# # docker run -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -it aplicacao-banco-image

docker build -t aaaa -f Dockerfile .
docker run --rm -e MYSQL_ROOT_PASSWORD=secret -p 3306:3306 aaaa
