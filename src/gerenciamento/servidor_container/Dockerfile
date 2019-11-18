# FROM networkstatic/iperf3
FROM ubuntu:18.10

#install iperf
RUN apt-get update
RUN apt-get install iperf3 -y
# Instala o python
RUN apt-get update
RUN apt-get install python3.6 -y

# Instala o pip - gerenciador de pacotes e outros
RUN apt-get install python3-pip -y

# RUN apt-get install python-setuptools -y
# RUN apt-get install python-wheel -y

# Instala lib do iperf3
RUN pip3 install iperf3

COPY server.py . 
ENTRYPOINT ["python3.6", "server.py"]
# ENTRYPOINT ["bash"]
