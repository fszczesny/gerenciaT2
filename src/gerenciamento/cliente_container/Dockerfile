# FROM networkstatic/iperf3
FROM ubuntu:18.10


#install iperf
RUN apt-get update
RUN apt-get install iperf3 -y

# Instala o python
RUN apt-get install python3.6 -y

# Instala o pip - gerenciador de pacotes e outros
RUN apt-get install python3-pip -y

# Instala lib do iperf3
RUN pip3 install iperf3
# Instala libs para backend em python
RUN pip3 install -U Flask
RUN pip3 install flask-restful
RUN pip3 install -U flask-cors

COPY client.py . 
COPY client_stateless.py . 

EXPOSE 5005
ENTRYPOINT ["python3.6", "client_stateless.py"]